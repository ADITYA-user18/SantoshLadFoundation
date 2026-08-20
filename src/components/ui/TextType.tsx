'use client';

import {
  type ElementType,
  useEffect,
  useRef,
  useState,
  createElement,
  useMemo,
  useCallback,
} from 'react';
import { gsap } from 'gsap';
import './TextType.css';

interface TextTypeProps {
  className?: string;
  showCursor?: boolean;
  hideCursorWhileTyping?: boolean;
  cursorCharacter?: string | React.ReactNode;
  cursorBlinkDuration?: number;
  cursorClassName?: string;
  text: string | string[];
  as?: ElementType;
  typingSpeed?: number;
  initialDelay?: number;
  pauseDuration?: number;
  deletingSpeed?: number;
  loop?: boolean;
  textColors?: string[];
  variableSpeed?: { min: number; max: number };
  onSentenceComplete?: (sentence: string, index: number) => void;
  startOnVisible?: boolean;
  reverseMode?: boolean;
}

const TextType = ({
  text,
  as: Component = 'div',
  typingSpeed = 50,
  initialDelay = 0,
  pauseDuration = 2000,
  deletingSpeed = 30,
  loop = true,
  className = '',
  showCursor = true,
  hideCursorWhileTyping = false,
  cursorCharacter = '|',
  cursorClassName = '',
  cursorBlinkDuration = 0.5,
  textColors = [],
  variableSpeed,
  onSentenceComplete,
  startOnVisible = false,
  reverseMode = false,
  ...props
}: TextTypeProps & React.HTMLAttributes<HTMLElement>) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [phase, setPhase] = useState<'typing' | 'pausing' | 'deleting' | 'waiting'>('waiting');
  const [isVisible, setIsVisible] = useState(!startOnVisible);
  const cursorRef = useRef<HTMLSpanElement>(null);
  const containerRef = useRef<HTMLElement>(null);
  const rafRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);
  const charIndexRef = useRef(0);

  const textArray = useMemo(() => (Array.isArray(text) ? text : [text]), [text]);

  const getSpeed = useCallback(() => {
    if (variableSpeed) {
      const { min, max } = variableSpeed;
      return Math.random() * (max - min) + min;
    }
    return phase === 'deleting' ? deletingSpeed : typingSpeed;
  }, [variableSpeed, phase, typingSpeed, deletingSpeed]);

  // Intersection observer for startOnVisible
  useEffect(() => {
    if (!startOnVisible || !containerRef.current) return;
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setIsVisible(true); }),
      { threshold: 0.1 }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [startOnVisible]);

  // GSAP cursor blink
  useEffect(() => {
    if (showCursor && cursorRef.current) {
      gsap.set(cursorRef.current, { opacity: 1 });
      gsap.to(cursorRef.current, {
        opacity: 0,
        duration: cursorBlinkDuration,
        repeat: -1,
        yoyo: true,
        ease: 'power2.inOut',
      });
    }
    return () => {
      if (cursorRef.current) gsap.killTweensOf(cursorRef.current);
    };
  }, [showCursor, cursorBlinkDuration]);

  // Start typing after initial delay
  useEffect(() => {
    if (!isVisible) return;
    charIndexRef.current = 0;
    const t = setTimeout(() => setPhase('typing'), initialDelay);
    return () => clearTimeout(t);
  }, [isVisible, initialDelay]);

  // rAF-based typing loop — no chained setTimeout, buttery smooth
  useEffect(() => {
    if (phase === 'waiting' || !isVisible) return;

    const currentText = textArray[currentTextIndex];
    const processedText = reverseMode
      ? currentText.split('').reverse().join('')
      : currentText;

    let interval = phase === 'deleting' ? deletingSpeed : typingSpeed;

    const tick = (now: number) => {
      const elapsed = now - lastTimeRef.current;
      if (elapsed < interval) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }
      lastTimeRef.current = now;

      if (phase === 'typing') {
        const idx = charIndexRef.current;
        if (idx < processedText.length) {
          setDisplayedText(processedText.slice(0, idx + 1));
          charIndexRef.current += 1;
          if (variableSpeed) interval = getSpeed();
        } else {
          // Done typing — pause then delete
          setPhase('pausing');
          return;
        }
      } else if (phase === 'deleting') {
        setDisplayedText(prev => {
          const next = prev.slice(0, -1);
          if (next === '') {
            // Done deleting — move to next sentence
            const nextIndex = (currentTextIndex + 1) % textArray.length;
            if (!loop && nextIndex === 0) return prev; // stop
            if (onSentenceComplete) onSentenceComplete(currentText, currentTextIndex);
            setCurrentTextIndex(nextIndex);
            charIndexRef.current = 0;
            setPhase('typing');
            return '';
          }
          return next;
        });
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, isVisible, currentTextIndex]);

  // Pause between type→delete
  useEffect(() => {
    if (phase !== 'pausing') return;
    const t = setTimeout(() => setPhase('deleting'), pauseDuration);
    return () => clearTimeout(t);
  }, [phase, pauseDuration]);

  const currentText = textArray[currentTextIndex];
  const shouldHideCursor =
    hideCursorWhileTyping &&
    (charIndexRef.current < currentText.length || phase === 'deleting');

  const color =
    textColors.length > 0 ? textColors[currentTextIndex % textColors.length] : 'inherit';

  return createElement(
    Component,
    { ref: containerRef, className: `text-type ${className}`, ...props },
    <span className="text-type__content" style={{ color }}>
      {displayedText}
    </span>,
    showCursor && (
      <span
        ref={cursorRef}
        className={`text-type__cursor ${cursorClassName} ${shouldHideCursor ? 'text-type__cursor--hidden' : ''}`}
      >
        {cursorCharacter}
      </span>
    )
  );
};

export default TextType;
