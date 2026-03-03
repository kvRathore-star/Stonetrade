'use client';

import React, { useState } from 'react';
import { Product } from '@/types';
import { useProjects, Project } from '@/contexts/ProjectContext';
import { XIcon, HeartIcon, SendIcon } from '@/components/IconComponents';

interface MoodboardManagerProps {
    product?: Product;
    isOpen: boolean;
    onClose: () => void;
}

const MoodboardManager: React.FC<MoodboardManagerProps> = ({ product, isOpen, onClose }) => {
    const { projects, createProject, addToProject } = useProjects();
    const [newProjectName, setNewProjectName] = useState('');
    const [showCreate, setShowCreate] = useState(false);

    const handleAddToProject = (projectId: string) => {
        if (product) {
            addToProject(projectId, product);
            onClose();
        }
    };

    const handleCreateAndAdd = () => {
        if (newProjectName.trim() && product) {
            const newProject = createProject(newProjectName.trim());
            addToProject(newProject.id, product);
            setNewProjectName('');
            setShowCreate(false);
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-stone-primary/90 backdrop-blur-sm p-4">
            <div className="bg-white rounded-[2.5rem] w-full max-w-md overflow-hidden shadow-2xl">
                <div className="bg-gradient-to-r from-pink-500 to-rose-500 text-white p-6 flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-black">Add to Moodboard</h2>
                        <p className="text-white/70 text-sm">Save to a project</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full">
                        <XIcon className="h-5 w-5" />
                    </button>
                </div>

                <div className="p-6">
                    {product && (
                        <div className="flex gap-4 mb-6 p-4 bg-stone-light/50 rounded-2xl">
                            <img src={product.images[0]} alt={product.name} className="w-16 h-16 rounded-xl object-cover" />
                            <div>
                                <h3 className="font-bold text-stone-primary">{product.name}</h3>
                                <p className="text-sm text-stone-secondary">{product.stoneType}</p>
                            </div>
                        </div>
                    )}

                    {projects.length > 0 && (
                        <div className="space-y-3 mb-6">
                            <p className="text-[10px] font-black text-stone-secondary uppercase tracking-wider">Your Projects</p>
                            {projects.map(project => (
                                <button
                                    key={project.id}
                                    onClick={() => handleAddToProject(project.id)}
                                    className="w-full flex items-center justify-between p-4 bg-stone-light/50 rounded-xl hover:bg-pink-50 hover:border-pink-200 border-2 border-transparent transition-all"
                                >
                                    <div className="text-left">
                                        <p className="font-bold text-stone-primary">{project.name}</p>
                                        <p className="text-xs text-stone-secondary">{project.products.length} items</p>
                                    </div>
                                    <HeartIcon className="h-5 w-5 text-pink-500" />
                                </button>
                            ))}
                        </div>
                    )}

                    {showCreate ? (
                        <div className="space-y-4">
                            <input
                                type="text"
                                value={newProjectName}
                                onChange={(e) => setNewProjectName(e.target.value)}
                                placeholder="Project name (e.g., Luxury Villa Bangalore)"
                                className="w-full bg-stone-light/50 p-4 rounded-xl outline-none focus:ring-2 focus:ring-pink-500"
                                autoFocus
                            />
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setShowCreate(false)}
                                    className="flex-1 border-2 border-stone-primary text-stone-primary py-3 rounded-xl font-bold"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleCreateAndAdd}
                                    className="flex-1 bg-pink-500 text-white py-3 rounded-xl font-bold"
                                >
                                    Create & Add
                                </button>
                            </div>
                        </div>
                    ) : (
                        <button
                            onClick={() => setShowCreate(true)}
                            className="w-full bg-stone-primary text-white py-4 rounded-2xl font-black hover:bg-pink-500 transition-colors"
                        >
                            + Create New Project
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MoodboardManager;
