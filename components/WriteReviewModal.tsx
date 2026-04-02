'use client';

import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Star, Upload, Loader2, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';

interface Props {
  productId: string;
  productSlug: string;
  productName: string;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (newReview: any) => void;
}

export default function WriteReviewModal({ productId, productSlug, productName, isOpen, onClose, onSuccess }: Props) {
  const [author, setAuthor] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Body scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !mounted) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    if (selectedFiles.length + files.length > 5) {
      alert("Maximum 5 photos allowed per review.");
      return;
    }

    setFiles(prev => [...prev, ...selectedFiles]);
    
    // Create previews
    const newPreviews = selectedFiles.map(file => URL.createObjectURL(file));
    setPreviews(prev => [...prev, ...newPreviews]);
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
    setPreviews(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!author || !comment) {
      setError("Please fill out all fields.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      // 1. Upload photos first (if any)
      const imageUrls: string[] = [];
      
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId,
          productSlug,
          author,
          rating,
          comment,
          images: [] // Initially empty, would be populated after real upload
        })
      });

      const data = await response.json();
      
      if (!response.ok) throw new Error(data.error || 'Failed to submit review');

      setIsSuccess(true);
      setTimeout(() => {
        onSuccess(data.review);
        onClose();
        setIsSuccess(false);
        setAuthor('');
        setComment('');
        setFiles([]);
        setPreviews([]);
      }, 2000);

    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const modalContent = (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto overflow-x-hidden">
      <div className="bg-brand-bg w-full max-w-xl rounded-2xl border border-white/10 shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300 my-auto">
        <div className="flex items-center justify-between p-6 border-b border-white/5 bg-white/5">
          <div>
            <h3 className="text-xl font-heading font-black text-white uppercase italic tracking-tighter">Write a <span className="text-brand-gold">Review</span></h3>
            <p className="text-[10px] text-white/40 uppercase tracking-widest font-medium mt-1">Reviewing: {productName}</p>
          </div>
          <button onClick={onClose} className="p-2 text-white/40 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="p-8">
          {isSuccess ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <CheckCircle2 size={64} className="text-brand-gold mb-4 animate-bounce" />
              <h4 className="text-2xl font-bold text-white mb-2">Thank you!</h4>
              <p className="text-white/60">Your review has been submitted successfully.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-[10px] text-brand-gold/60 uppercase tracking-widest font-black mb-2">Overall Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setRating(s)}
                      className={`p-1 transition-all ${s <= rating ? 'text-brand-gold scale-110' : 'text-white/10 hover:text-brand-gold/30'}`}
                    >
                      <Star size={32} fill={s <= rating ? "currentColor" : "none"} />
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-[10px] text-white/40 uppercase tracking-widest font-black">Your Name</label>
                  <input
                    required
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-gold/50 transition-colors"
                    placeholder="Full Name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-[10px] text-white/40 uppercase tracking-widest font-black">Photos (Optional)</label>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full flex items-center justify-center gap-2 bg-white/5 border border-dashed border-white/20 rounded-xl px-4 py-3 text-white/40 hover:text-brand-gold hover:border-brand-gold/50 transition-all group"
                  >
                    <Upload size={16} className="group-hover:-translate-y-1 transition-transform" />
                    <span className="text-xs uppercase font-bold tracking-wider">Upload Pics</span>
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    multiple
                    accept="image/*"
                    className="hidden"
                  />
                </div>
              </div>

              {previews.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {previews.map((src, i) => (
                    <div key={i} className="relative w-16 h-16 rounded-lg overflow-hidden border border-white/10">
                      <Image src={src} alt="Preview" fill className="object-cover" />
                      <button
                        type="button"
                        onClick={() => removeFile(i)}
                        className="absolute top-0 right-0 p-0.5 bg-black/60 text-white rounded-bl-lg"
                      >
                        <X size={10} />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div className="space-y-2">
                <label className="block text-[10px] text-white/40 uppercase tracking-widest font-black">Your Experience</label>
                <textarea
                  required
                  rows={4}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-gold/50 transition-colors resize-none"
                  placeholder="Tell others about the quality and fitment..."
                />
              </div>

              {error && <p className="text-red-400 text-xs italic">{error}</p>}

              <button
                disabled={isSubmitting}
                type="submit"
                className="w-full py-4 bg-brand-gold hover:bg-white text-black font-black uppercase italic tracking-widest rounded-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin" size={18} />
                    Submitting...
                  </>
                ) : (
                  'Post Review'
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
