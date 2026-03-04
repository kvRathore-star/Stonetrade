'use client';

import React, { useState, useRef, useEffect } from 'react';
import { SparklesIcon, XIcon, SendIcon, SearchIcon } from '@/components/IconComponents';

interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
    sources?: string[];
}

interface AIConciergeProps {
    isOpen: boolean;
    onClose: () => void;
}

const AIConcierge: React.FC<AIConciergeProps> = ({ isOpen, onClose }) => {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            role: 'assistant',
            content: 'नमस्ते! I\'m your AI Heritage Concierge. Ask me about:\n\n• Current market prices for any stone\n• Stone sourcing regions in India\n• Quality grades and specifications\n• Import/export trends',
            timestamp: new Date(),
        }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: input,
            timestamp: new Date(),
        };

        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsTyping(true);

        // Simulate AI response with market data
        await new Promise(resolve => setTimeout(resolve, 1500));

        const responses: Record<string, { content: string; sources: string[] }> = {
            'price': {
                content: `📊 **Current Market Prices (Feb 2026)**\n\n**Italian Marble:**\n• Statuario: ₹800-1,200/sq ft\n• Carrara: ₹400-600/sq ft\n• Calacatta: ₹1,500-2,500/sq ft\n\n**Indian Marble:**\n• Makrana White: ₹150-300/sq ft\n• Rajnagar Pink: ₹80-150/sq ft\n• Ambaji White: ₹100-200/sq ft\n\n**Granite:**\n• Black Galaxy: ₹200-400/sq ft\n• Kashmir White: ₹250-450/sq ft\n\n*Prices vary by thickness, finish, and lot size.*`,
                sources: ['IndiaMART', 'Stone Federation India', 'KPMG Stone Report 2025']
            },
            'north india': {
                content: `🏭 **North India Stone Hub**\n\nThe Northern belt is Asia's largest marble hub:\n\n• 4,000+ marble processing units\n• Handles 90% of India's marble trade\n• Key stones: Makrana, Wonder White, Bruno\n\n**Current Trends:**\n• Bruno marble demand ↑ 25% this year\n• Italian imports dropped 15% due to shipping costs\n• New Turkish varieties gaining popularity\n\n**Best time to visit:** Oct-Feb (post monsoon)`,
                sources: ['Rajasthan Stone Development Corporation', 'Economic Times']
            },
            'quality': {
                content: `✅ **Stone Quality Grades**\n\n**A-Grade (Premium):**\n• Uniform color, minimal veining variation\n• No cracks, pits, or natural defects\n• Used for: Feature walls, luxury projects\n\n**B-Grade (Commercial):**\n• Some color variation acceptable\n• Minor natural marks allowed\n• Used for: Flooring, countertops\n\n**C-Grade (Economy):**\n• Visible variations and marks\n• Suitable for outdoor/industrial use\n\n**Thickness standards:**\n• Slabs: 18-20mm (standard), 30mm (heavy-duty)\n• Tiles: 10-12mm`,
                sources: ['BIS Standards', 'Stone Industry Association']
            },
        };

        let response = {
            content: `I found some information about "${input}":\n\nThis query requires live search. In production, this would use Google Search Grounding to fetch real-time market data, news, and trends.\n\n**Sample data for demo:**\n• Market is currently stable\n• Demand peaks during Oct-Mar\n• Prices updated daily on major exchanges`,
            sources: ['Google Search', 'Market Intelligence']
        };

        const lowerInput = input.toLowerCase();
        if (lowerInput.includes('price') || lowerInput.includes('rate') || lowerInput.includes('cost')) {
            response = responses['price'];
        } else if (lowerInput.includes('kishangarh') || lowerInput.includes('rajasthan') || lowerInput.includes('north india')) {
            response = responses['north india'];
        } else if (lowerInput.includes('quality') || lowerInput.includes('grade')) {
            response = responses['quality'];
        }

        const assistantMessage: Message = {
            id: (Date.now() + 1).toString(),
            role: 'assistant',
            content: response.content,
            timestamp: new Date(),
            sources: response.sources,
        };

        setMessages(prev => [...prev, assistantMessage]);
        setIsTyping(false);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed bottom-6 right-6 z-[60] w-[420px] h-[600px] bg-white rounded-[2rem] shadow-2xl flex flex-col overflow-hidden border-2 border-stone-accent/20">
            {/* Header */}
            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                        <SparklesIcon className="h-5 w-5" />
                    </div>
                    <div>
                        <h3 className="font-bold">AI Heritage Concierge</h3>
                        <p className="text-[10px] text-white/70">Live market data • Google Search</p>
                    </div>
                </div>
                <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full">
                    <XIcon className="h-5 w-5" />
                </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-stone-light/30">
                {messages.map(msg => (
                    <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[85%] p-4 rounded-2xl ${msg.role === 'user'
                            ? 'bg-stone-primary text-white rounded-br-md'
                            : 'bg-white text-stone-primary rounded-bl-md shadow-sm'
                            }`}>
                            <p className="text-sm whitespace-pre-line">{msg.content}</p>
                            {msg.sources && (
                                <div className="mt-3 pt-3 border-t border-current/10">
                                    <p className="text-[10px] opacity-60 font-bold mb-1">Sources:</p>
                                    <div className="flex flex-wrap gap-1">
                                        {msg.sources.map((src, i) => (
                                            <span key={i} className="text-[10px] bg-current/10 px-2 py-0.5 rounded">{src}</span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
                {isTyping && (
                    <div className="flex justify-start">
                        <div className="bg-white p-4 rounded-2xl rounded-bl-md shadow-sm">
                            <div className="flex gap-1">
                                <span className="w-2 h-2 bg-stone-secondary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                                <span className="w-2 h-2 bg-stone-secondary rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                                <span className="w-2 h-2 bg-stone-secondary rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                            </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions */}
            <div className="px-4 py-2 flex gap-2 overflow-x-auto bg-white border-t border-stone-accent/10">
                {['Market prices', 'North India trends', 'Quality grades'].map(q => (
                    <button
                        key={q}
                        onClick={() => setInput(q)}
                        className="whitespace-nowrap text-xs bg-stone-light px-3 py-1.5 rounded-full font-medium hover:bg-emerald-100 hover:text-emerald-700 transition-colors"
                    >
                        {q}
                    </button>
                ))}
            </div>

            {/* Input */}
            <div className="p-4 bg-white border-t border-stone-accent/10">
                <div className="flex gap-2">
                    <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Ask about prices, trends, quality..."
                        className="flex-1 bg-stone-light/50 px-4 py-3 rounded-xl text-sm outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                    <button
                        onClick={handleSend}
                        className="bg-emerald-600 text-white p-3 rounded-xl hover:bg-emerald-700 transition-colors"
                    >
                        <SendIcon className="h-5 w-5" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AIConcierge;
