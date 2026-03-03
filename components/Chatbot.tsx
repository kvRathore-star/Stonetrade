'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChatBubbleIcon, XIcon, SendIcon, SparklesIcon } from '@/components/IconComponents';
import { GoogleGenAI, Chat } from '@google/genai';
import { ChatMessage } from '@/types';

const Chatbot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<(ChatMessage & { sources?: any[] })[]>([
        { sender: 'bot', text: 'Hello! I am your AI Heritage Concierge. I can now search real-time market prices and global stone trends. How can I assist you today?' }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage = { sender: 'user' as const, text: input };
        setMessages(prev => [...prev, userMessage, { sender: 'bot' as const, text: '', isLoading: true }]);
        setInput('');
        setIsLoading(true);

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const response = await ai.models.generateContent({
                model: 'gemini-3-flash-preview',
                contents: input,
                config: {
                    tools: [{ googleSearch: {} }],
                    systemInstruction: 'You are the StoneTrade AI Concierge. Use Google Search to provide accurate, up-to-date pricing for marble/granite and industry news. Always be professional and architectural in tone.',
                },
            });

            const text = response.text || "I's sorry, I couldn't find information on that specific query.";
            const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks;

            setMessages(prev => {
                const newMessages = [...prev];
                newMessages[newMessages.length - 1] = { 
                    sender: 'bot', 
                    text, 
                    isLoading: false,
                    sources: sources || []
                };
                return newMessages;
            });

        } catch (error) {
            console.error("Chat error:", error);
            setMessages(prev => {
                const newMessages = [...prev];
                newMessages[newMessages.length - 1] = { sender: 'bot', text: 'Connection lost. Please check your network.', isLoading: false };
                return newMessages;
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 bg-stone-primary text-white w-16 h-16 rounded-full shadow-2xl flex items-center justify-center transform hover:scale-110 active:scale-95 transition-all z-50 border border-white/10"
                aria-label="Toggle Chatbot"
            >
                {isOpen ? <XIcon className="h-8 w-8" /> : <ChatBubbleIcon className="h-8 w-8" />}
            </button>

            {isOpen && (
                <div className="fixed bottom-24 right-6 w-[calc(100vw-3rem)] max-w-sm h-[70vh] bg-stone-white/95 backdrop-blur-2xl rounded-[2.5rem] shadow-[0_20px_60px_rgba(0,0,0,0.2)] flex flex-col z-50 overflow-hidden border border-stone-accent/20">
                    <header className="bg-stone-primary text-white p-6 flex items-center justify-between">
                        <div className="flex items-center">
                            <div className="bg-stone-accent p-2 rounded-xl mr-3 shadow-lg shadow-stone-accent/20">
                                <SparklesIcon className="h-5 w-5 text-stone-primary" />
                            </div>
                            <div>
                                <h3 className="font-black text-sm uppercase tracking-widest">Market Concierge</h3>
                                <p className="text-[9px] text-stone-accent font-black uppercase tracking-[0.2em] opacity-80">Search Grounding Active</p>
                            </div>
                        </div>
                    </header>
                    <div className="flex-1 p-6 overflow-y-auto space-y-4">
                        {messages.map((msg, index) => (
                            <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[85%] px-5 py-4 rounded-[1.5rem] text-sm leading-relaxed ${msg.sender === 'user' ? 'bg-stone-primary text-white shadow-xl' : 'bg-stone-light text-stone-primary shadow-sm border border-stone-accent/10'}`}>
                                    {msg.isLoading ? (
                                        <div className="flex gap-1 py-1">
                                            <div className="w-1.5 h-1.5 bg-stone-accent rounded-full animate-bounce"></div>
                                            <div className="w-1.5 h-1.5 bg-stone-accent rounded-full animate-bounce delay-75"></div>
                                            <div className="w-1.5 h-1.5 bg-stone-accent rounded-full animate-bounce delay-150"></div>
                                        </div>
                                    ) : (
                                        <>
                                            {msg.text}
                                            {msg.sources && msg.sources.length > 0 && (
                                                <div className="mt-4 pt-3 border-t border-stone-accent/20">
                                                    <p className="text-[9px] font-black uppercase text-stone-accent mb-2 tracking-widest">Verified Sources:</p>
                                                    <div className="flex flex-wrap gap-2">
                                                        {msg.sources.map((src, i) => src.web && (
                                                            <a key={i} href={src.web.uri} target="_blank" rel="noopener noreferrer" className="text-[9px] bg-white border border-stone-accent/30 text-stone-primary px-2 py-1 rounded-md font-bold hover:bg-stone-accent transition-colors truncate max-w-[120px]">
                                                                {src.web.title || 'Source'}
                                                            </a>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </>
                                    )}
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>
                    <div className="p-4 bg-white border-t border-stone-light">
                        <div className="flex items-center space-x-2 bg-stone-light p-1 rounded-full border border-stone-accent/10">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleSend()}
                                placeholder="Ask about Kishangarh prices..."
                                className="flex-1 bg-transparent px-4 py-3 rounded-full focus:outline-none font-medium text-sm"
                                disabled={isLoading}
                            />
                            <button onClick={handleSend} disabled={isLoading || !input.trim()} className="bg-stone-primary text-white p-3 rounded-full hover:bg-stone-accent hover:text-stone-primary disabled:opacity-30 transition-all shadow-lg">
                                <SendIcon className="h-5 w-5"/>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Chatbot;
