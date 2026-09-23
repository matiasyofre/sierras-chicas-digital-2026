import React from 'react';

/**
 * BlurTextReveal - React Bits Pro inspired animated text component
 * Animates text with a staggered blur-to-sharp & fade-in reveal effect.
 */
export default function BlurTextReveal({
  text = '',
  className = '',
  wordClassName = '',
  delay = 70,
  initialDelay = 150,
  animateBy = 'words' // 'words' | 'letters'
}) {
  const elements = animateBy === 'words' ? text.split(' ') : text.split('');

  return (
    <span className={`inline-flex flex-wrap items-center justify-center gap-x-[0.3em] gap-y-[0.1em] ${className}`}>
      {elements.map((segment, index) => (
        <span
          key={index}
          className={`inline-block opacity-0 filter blur-[14px] translate-y-3 animate-blur-reveal ${wordClassName}`}
          style={{
            animationDelay: `${initialDelay + index * delay}ms`,
            animationFillMode: 'forwards'
          }}
        >
          {segment === ' ' ? '\u00A0' : segment}
        </span>
      ))}
    </span>
  );
}
