"use client"

import { motion } from "framer-motion";
import type { ReactNode } from "react";

const variants = {
    hidden: { opacity: 0, y:20 },
    enter: { opacity: 1, y:0 }
}

export default function AnimatedWrapper({ children }: { children: ReactNode }) {
    return (
        <motion.div
            initial="hidden"
            animate="enter"
            variants={variants}
            transition={{ duration: 0.5 }}
        >
            {children}
        </motion.div>
    )
}