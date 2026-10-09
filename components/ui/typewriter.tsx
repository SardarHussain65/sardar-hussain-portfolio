"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState, useRef } from "react";
import { useReducedMotion } from "motion/react";

export function Typewriter({
  words,
  className,
  typingSpeed = 80,
  deletingSpeed = 50,
  pauseDuration = 2000,
}: {
  words: string[];
  className?: string;
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
}) {
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);
  const reduced = useReducedMotion();
  const lastTimeRef = useRef<number | null>(null);

  useEffect(() => {
    if (reduced) return;

    let requestRef: number;
    let accumulatedTime = 0;

    const animate = (time: number) => {
      if (lastTimeRef.current !== null) {
        accumulatedTime += time - lastTimeRef.current;
      }
      lastTimeRef.current = time;

      const currentWord = words[wordIndex];
      const isWordComplete = !isDeleting && text === currentWord;
      const isWordEmpty = isDeleting && text === "";
      
      let targetDelay = isDeleting ? deletingSpeed : typingSpeed;
      if (isWordComplete) targetDelay = pauseDuration;
      else if (isWordEmpty) targetDelay = 500;

      if (accumulatedTime >= targetDelay) {
        accumulatedTime -= targetDelay;

        if (isWordComplete) {
          setIsDeleting(true);
        } else if (isWordEmpty) {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
        } else {
          setText((prev) => 
            isDeleting 
              ? currentWord.substring(0, prev.length - 1)
              : currentWord.substring(0, prev.length + 1)
          );
        }
      }

      requestRef = requestAnimationFrame(animate);
    };

    requestRef = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef);
  }, [text, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, pauseDuration, reduced]);

  if (reduced) {
    return <span className={className}>{words[0]}</span>;
  }

  return (
    <span className={cn("inline-flex items-center", className)}>
      <span>{text}</span>
      <span className="ml-[1px] inline-block w-[2px] h-[1.1em] bg-[var(--violet)] animate-pulse" style={{ animationDuration: '0.8s' }} />
    </span>
  );
}
