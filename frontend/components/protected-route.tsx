"use client"

import { useAuth } from "@/context/auth-context";
import { useRouter } from "next/navigation";
import type React from "react";
import { useEffect } from "react";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {

    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (user === null) {
            router.push("/login");
        }
    }, [user, router]);

    if (!user) {
        return (
            <div className="flex h-screen w-full items-center justify-center">
                <p>Redirigiendo al inicio de sesión...</p>
            </div>
        )
    }

  return (
    <>
      {children}
    </>
  );
}
