'use client';

import React, { useState } from 'react';
import { XIcon, SendIcon, ChatBubbleIcon } from '@/components/IconComponents';
import { useAuth, BuyerTier } from '@/contexts/AuthContext';

interface Message {
    id: string;
    sender: 'buyer' | 'seller';
    text: string;
    timestamp: Date;
}

interface ChatWindowProps {
    sellerId: number;
    sellerName: string;
    sellerImage?: string;
    isOpen: boolean;
    onClose: () => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({
    sellerId,
    sellerName,
    sellerImage,
    isOpen,
    onClose
}) => {
    const { user } = useAuth();
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            sender: 'seller',
            text: `Welcome! I'm ${sellerName}. How can I help you today?`,
            timestamp: new Date(),
        },
    ]);

    const isPro = user?.buyerTier === 'pro';

    const sendMessage = () => {
        if (!message.trim() || !isPro) return;

        const newMsg: Message = {
            id: Date.now().toString(),
            sender: 'buyer',
            text: message,
            timestamp: new Date(),
        };

        setMessages(prev => [...prev, newMsg]);
        setMessage('');

        // Mock seller reply
        setTimeout(() => {
            setMessages(prev => [...prev, {
                id: (Date.now() + 1).toString(),
                sender: 'seller',
                text: 'Thank you for your inquiry! I will check our inventory and get back to you shortly.',
                timestamp: new Date(),
            }]);
        }, 1500);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed bottom-24 right-6 w-96 max-w-[calc(100vw-2rem)] bg-white rounded-[2rem] shadow-2xl z-50 overflow-hidden border border-stone-accent/20">
            {/* Header */}
            <div className="bg-stone-primary text-white p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-stone-accent flex items-center justify-center text-stone-primary font-bold">
                        {sellerImage ? (
                            <img src={sellerImage} alt={sellerName} className="w-full h-full rounded-full object-cover" />
                        ) : (
                            sellerName.charAt(0)
                        )}
                    </div>
                    <div>
                        <h4 className="font-bold text-sm">{sellerName}</h4>
                        <span className="text-[10px] text-stone-accent font-medium uppercase tracking-wide">Verified Seller</span>
                    </div>
                </div>
                <button
                    onClick={onClose}
                    className="p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                    <XIcon className="h-5 w-5" />
                </button>
            </div>

            {/* Messages */}
            <div className="h-72 overflow-y-auto p-4 space-y-4 bg-stone-light/30">
                {messages.map(msg => (
                    <div
                        key={msg.id}
                        className={`flex ${msg.sender === 'buyer' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div className={`
              max-w-[80%] px-4 py-2 rounded-2xl text-sm
              ${msg.sender === 'buyer'
                                ? 'bg-stone-primary text-white rounded-br-none'
                                : 'bg-white text-stone-primary rounded-bl-none shadow-sm'
                            }
            `}>
                            {msg.text}
                            <div className={`text-[9px] mt-1 opacity-50`}>
                                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Input */}
            {isPro ? (
                <div className="p-4 border-t border-stone-accent/10 flex gap-2">
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                        placeholder="Type your message..."
                        className="flex-1 bg-stone-light/50 px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-stone-accent/50"
                    />
                    <button
                        onClick={sendMessage}
                        className="bg-stone-primary text-white p-3 rounded-xl hover:bg-stone-accent hover:text-stone-primary transition-colors"
                    >
                        <SendIcon className="h-5 w-5" />
                    </button>
                </div>
            ) : (
                <div className="p-4 bg-gradient-to-r from-stone-accent/20 to-amber-100 text-center">
                    <p className="text-sm font-bold text-stone-primary mb-2">Upgrade to Pro for Chat</p>
                    <button className="bg-stone-primary text-white px-6 py-2 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-stone-accent hover:text-stone-primary transition-colors">
                        Get Pro @ ₹299/mo
                    </button>
                </div>
            )}
        </div>
    );
};

// Chat trigger button for product pages
export const ChatTrigger: React.FC<{ onClick: () => void; isPro: boolean }> = ({ onClick, isPro }) => (
    <button
        onClick={onClick}
        className={`
      flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all
      ${isPro
                ? 'bg-green-500 text-white hover:bg-green-600'
                : 'bg-stone-light text-stone-secondary border border-stone-accent/20'
            }
    `}
    >
        <ChatBubbleIcon className="h-5 w-5" />
        {isPro ? 'Chat with Seller' : 'Chat (Pro Only)'}
    </button>
);

export default ChatWindow;
