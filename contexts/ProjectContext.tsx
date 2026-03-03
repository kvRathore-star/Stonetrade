'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product } from '@/types';

export interface Project {
    id: string;
    name: string;
    description: string;
    products: Product[];
    createdAt: Date;
    updatedAt: Date;
    shareLink?: string;
    clientName?: string;
}

interface ProjectContextType {
    projects: Project[];
    createProject: (name: string, description?: string) => Project;
    deleteProject: (projectId: string) => void;
    addToProject: (projectId: string, product: Product) => void;
    removeFromProject: (projectId: string, productId: number) => void;
    updateProject: (projectId: string, updates: Partial<Project>) => void;
    generateShareLink: (projectId: string) => string;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const ProjectProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [projects, setProjects] = useState<Project[]>([]);

    // Load from localStorage
    useEffect(() => {
        const saved = localStorage.getItem('stonetrade_projects');
        if (saved) {
            const parsed = JSON.parse(saved);
            setProjects(parsed.map((p: any) => ({
                ...p,
                createdAt: new Date(p.createdAt),
                updatedAt: new Date(p.updatedAt),
            })));
        }
    }, []);

    // Save to localStorage
    useEffect(() => {
        localStorage.setItem('stonetrade_projects', JSON.stringify(projects));
    }, [projects]);

    const createProject = (name: string, description?: string): Project => {
        const newProject: Project = {
            id: `proj-${Date.now()}`,
            name,
            description: description || '',
            products: [],
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        setProjects(prev => [newProject, ...prev]);
        return newProject;
    };

    const deleteProject = (projectId: string) => {
        setProjects(prev => prev.filter(p => p.id !== projectId));
    };

    const addToProject = (projectId: string, product: Product) => {
        setProjects(prev => prev.map(p => {
            if (p.id === projectId) {
                if (p.products.some(prod => prod.id === product.id)) return p;
                return {
                    ...p,
                    products: [...p.products, product],
                    updatedAt: new Date(),
                };
            }
            return p;
        }));
    };

    const removeFromProject = (projectId: string, productId: number) => {
        setProjects(prev => prev.map(p => {
            if (p.id === projectId) {
                return {
                    ...p,
                    products: p.products.filter(prod => prod.id !== productId),
                    updatedAt: new Date(),
                };
            }
            return p;
        }));
    };

    const updateProject = (projectId: string, updates: Partial<Project>) => {
        setProjects(prev => prev.map(p => {
            if (p.id === projectId) {
                return { ...p, ...updates, updatedAt: new Date() };
            }
            return p;
        }));
    };

    const generateShareLink = (projectId: string): string => {
        const link = `https://app.stonetrade.in/moodboard/${projectId}`;
        updateProject(projectId, { shareLink: link });
        return link;
    };

    return (
        <ProjectContext.Provider value={{
            projects,
            createProject,
            deleteProject,
            addToProject,
            removeFromProject,
            updateProject,
            generateShareLink,
        }}>
            {children}
        </ProjectContext.Provider>
    );
};

export const useProjects = (): ProjectContextType => {
    const context = useContext(ProjectContext);
    if (!context) {
        throw new Error('useProjects must be used within ProjectProvider');
    }
    return context;
};

export default ProjectContext;
