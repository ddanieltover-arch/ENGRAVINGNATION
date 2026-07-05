import type { ReactNode } from 'react';

type AnswerCapsuleProps = {
  children: ReactNode;
  className?: string;
};

export default function AnswerCapsule({ children, className = '' }: AnswerCapsuleProps) {
  return (
    <section id="answer" aria-label="Quick Answer" className={className}>
      <p className="text-white/80 text-lg leading-relaxed">
        <strong className="text-brand-gold uppercase tracking-widest text-xs block mb-2">
          Quick Answer:
        </strong>
        {children}
      </p>
    </section>
  );
}
