"use client";

import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

type Message = {
  id: number;
  role: 'user' | 'concierge';
  text: string;
  products?: any[];
};

export default function ChatConcierge() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, role: 'concierge', text: 'Welcome to Engraving Nation! 🛠️ What kind of vehicle are you building?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim()) return;

    const userText = input.trim();
    setInput('');
    
    // Add user message
    setMessages(prev => [...prev, { id: Date.now(), role: 'user', text: userText }]);
    setIsTyping(true);

    try {
      const res = await fetch('/api/concierge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userText })
      });
      
      const data = await res.json();
      
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        role: 'concierge',
        text: data.reply,
        products: data.products
      }]);
    } catch (err) {
      setMessages(prev => [...prev, { id: Date.now() + 1, role: 'concierge', text: "Sorry, I lost connection to the vault. Please try again." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <button 
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 p-4 bg-yellow-500 text-black rounded-full shadow-2xl hover:scale-105 transition-transform duration-300 ${isOpen ? 'hidden' : 'block'}`}
      >
        <MessageCircle size={28} />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[350px] sm:w-[400px] h-[550px] max-h-[85vh] bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
          
          {/* Header */}
          <div className="bg-zinc-900 border-b border-zinc-800 p-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center text-black">
                <Bot size={20} />
              </div>
              <div>
                <h3 className="font-bold text-white text-sm">EN Concierge</h3>
                <p className="text-xs text-yellow-500 flex items-center gap-1">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></span>
                  Online
                </p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-zinc-400 hover:text-white transition">
              <X size={20} />
            </button>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                
                {msg.role === 'concierge' && (
                  <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center mr-2 shrink-0">
                    <Bot size={14} className="text-yellow-500" />
                  </div>
                )}

                <div className="max-w-[80%] flex flex-col gap-2">
                  <div className={`p-3 text-sm rounded-2xl ${msg.role === 'user' ? 'bg-yellow-500 text-black rounded-br-none' : 'bg-zinc-800 text-zinc-200 rounded-bl-none'}`}>
                    {msg.text}
                  </div>
                  
                  {/* Embedded Product Cards */}
                  {msg.products && msg.products.length > 0 && (
                    <div className="flex flex-col gap-2 mt-2">
                      {msg.products.map(p => (
                        <Link href={`/products/${p.slug}`} key={p.id} className="block group">
                          <div className="bg-zinc-900 border border-zinc-700 rounded-lg overflow-hidden flex items-center p-2 hover:border-yellow-500 transition">
                            <div className="w-16 h-16 bg-black shrink-0 relative rounded">
                              {p.images && p.images[0] ? (
                                <Image src={p.images[0]} alt={p.name} fill className="object-cover rounded" />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-zinc-600 text-xs">No img</div>
                              )}
                            </div>
                            <div className="ml-3 flex-1 min-w-0">
                              <p className="text-xs font-bold text-white truncate">{p.name}</p>
                              <p className="text-xs text-yellow-500 mt-1">${p.price.toFixed(2)}</p>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                {msg.role === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-zinc-700 flex items-center justify-center ml-2 shrink-0">
                    <User size={14} className="text-zinc-300" />
                  </div>
                )}

              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                 <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center mr-2 shrink-0">
                    <Bot size={14} className="text-yellow-500" />
                  </div>
                  <div className="bg-zinc-800 p-3 rounded-2xl rounded-bl-none flex gap-1 items-center">
                    <div className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s'}}></div>
                    <div className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s'}}></div>
                  </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-3 bg-zinc-900 border-t border-zinc-800">
            <form onSubmit={handleSend} className="relative flex items-center">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="E.g. I'm building a 2023 Bronco..."
                className="w-full bg-zinc-950 border border-zinc-700 text-white text-sm rounded-full pl-4 pr-12 py-3 focus:outline-none focus:border-yellow-500 transition"
              />
              <button 
                type="submit"
                disabled={!input.trim()}
                className="absolute right-2 p-2 bg-yellow-500 text-black rounded-full hover:scale-105 transition disabled:opacity-50 disabled:hover:scale-100"
              >
                <Send size={16} />
              </button>
            </form>
          </div>

        </div>
      )}
    </>
  );
}
