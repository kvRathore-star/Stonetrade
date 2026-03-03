'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { useNavigation, type Page } from '@/lib/navigation';

interface TabItem {
    page: Page;
    label: string;
    paths: string[];
    icon: React.ReactNode;
    activeIcon: React.ReactNode;
}

const HomeIcon = ({ filled }: { filled?: boolean }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill={filled ? "currentColor" : "none"} viewBox="0 0 24 24" strokeWidth={filled ? 0 : 1.8} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955a1.126 1.126 0 011.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
    </svg>
);

const GridIcon = ({ filled }: { filled?: boolean }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill={filled ? "currentColor" : "none"} viewBox="0 0 24 24" strokeWidth={filled ? 0 : 1.8} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
    </svg>
);

const CompareIcon = ({ filled }: { filled?: boolean }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill={filled ? "currentColor" : "none"} viewBox="0 0 24 24" strokeWidth={filled ? 0 : 1.8} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
    </svg>
);

const DashboardIcon = ({ filled }: { filled?: boolean }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill={filled ? "currentColor" : "none"} viewBox="0 0 24 24" strokeWidth={filled ? 0 : 1.8} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
    </svg>
);

const UserIcon = ({ filled }: { filled?: boolean }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill={filled ? "currentColor" : "none"} viewBox="0 0 24 24" strokeWidth={filled ? 0 : 1.8} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
    </svg>
);

const tabs: TabItem[] = [
    {
        page: 'home',
        label: 'Home',
        paths: ['/'],
        icon: <HomeIcon />,
        activeIcon: <HomeIcon filled />,
    },
    {
        page: 'products',
        label: 'Browse',
        paths: ['/products'],
        icon: <GridIcon />,
        activeIcon: <GridIcon filled />,
    },
    {
        page: 'compare',
        label: 'Compare',
        paths: ['/compare'],
        icon: <CompareIcon />,
        activeIcon: <CompareIcon filled />,
    },
    {
        page: 'buyerDashboard',
        label: 'Dashboard',
        paths: ['/dashboard'],
        icon: <DashboardIcon />,
        activeIcon: <DashboardIcon filled />,
    },
    {
        page: 'register',
        label: 'Account',
        paths: ['/auth'],
        icon: <UserIcon />,
        activeIcon: <UserIcon filled />,
    },
];

export default function BottomNav() {
    const pathname = usePathname();
    const { navigateTo } = useNavigation();

    const isActive = (tab: TabItem) => {
        if (tab.paths[0] === '/' && pathname === '/') return true;
        if (tab.paths[0] !== '/') return tab.paths.some(p => pathname.startsWith(p));
        return false;
    };

    return (
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-t border-stone-accent/10 safe-area-bottom">
            <div className="flex items-center justify-around h-16 max-w-lg mx-auto">
                {tabs.map((tab) => {
                    const active = isActive(tab);
                    return (
                        <button
                            key={tab.page}
                            onClick={() => navigateTo(tab.page)}
                            className={`flex flex-col items-center justify-center w-full h-full gap-0.5 transition-all duration-200 relative ${active
                                    ? 'text-stone-primary'
                                    : 'text-stone-secondary/60'
                                }`}
                            aria-label={tab.label}
                            aria-current={active ? 'page' : undefined}
                        >
                            {/* Active indicator dot */}
                            {active && (
                                <span className="absolute top-1 w-1 h-1 rounded-full bg-stone-accent animate-fade-in" />
                            )}
                            <span className={`transition-transform duration-200 ${active ? 'scale-110' : ''}`}>
                                {active ? tab.activeIcon : tab.icon}
                            </span>
                            <span className={`text-[10px] font-bold tracking-wide ${active ? 'text-stone-primary' : 'text-stone-secondary/50'}`}>
                                {tab.label}
                            </span>
                        </button>
                    );
                })}
            </div>
        </nav>
    );
}
