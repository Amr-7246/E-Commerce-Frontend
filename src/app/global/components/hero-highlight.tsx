"use client";
import { cn } from "@/lib/utils";
import { useMotionValue, motion, useMotionTemplate } from "framer-motion";
import React from "react";

export const HeroHighlight = ({ children }: { children: React.ReactNode }) => {
    let mouseX = useMotionValue(0);
    let mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent<HTMLDivElement>) {
        if (!currentTarget) return console.log('issue');
        let { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }
return (
    <div className="relative bg-[var(--main)] items-start h-full flex-center w-full group bg-[radial-gradient(var(--inactive-text)_10px,transparent_10px)] [background-size:20px_20px]" onMouseMove={handleMouseMove}>
        <div className="absolute inset-0 bg-[var(--main)] dark:bg-[var(--main)]  pointer-events-none" />
        <motion.div
        className="pointer-events-none bg-[var(--btn-I)]/20 dark:bg-[var(--btn-II)] absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
            WebkitMaskImage: useMotionTemplate` radial-gradient( 200px circle at ${mouseX}px ${mouseY}px, black 0%, transparent 100% ) `,
            maskImage: useMotionTemplate` radial-gradient( 200px circle at ${mouseX}px ${mouseY}px, black 0%, transparent 100% ) `,
        }}
        />
        <div className="relative flex items-start lg:w-[85%] " >{children}</div>
    </div>
);
};

export const Highlight = ({ children, className }: { children: React.ReactNode; className?: string }) => {
return (
    <motion.span
        initial={{ backgroundSize: "0% 100%",}}
        animate={{backgroundSize: "100% 100%",}}
        transition={{ duration: 2, ease: "linear", delay: 0.5, }}
        style={{ backgroundRepeat: "no-repeat", backgroundPosition: "left center", display: "inline", }}
        className={cn( `relative inline-block pb-1 px-1 rounded-lg bg-gradient-to-r from-[var(--gradient-from)] to-[var(--color-error)] dark:from-[var(--color-error)] dark:to-[var(--color-error)]`, className )}
    >
        {children}
    </motion.span>
);
};
