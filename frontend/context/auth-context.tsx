"use client"

import { mockBets, mockESportsEvents, mockEvents } from "@/lib/data";
import { Bet, User } from "@/lib/types";
import { useRouter } from "next/navigation";
import { createContext, useState, useContext, type ReactNode } from "react";

interface AuthContextType {
    user: User | null;
    bets: Bet[];
    login: (username: string, password: string) => void;
    logout: () => void;
    placeBet: (eventId: number, selectedOutcome: string, amount: number) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {

    const [user, setUser] = useState<User | null>(null);
    const [bets, setBets] = useState<Bet[]>([]);
    const router = useRouter();

    const login = (username: string, password: string) => {
        const loggedInUser = { id: 1, username, password };
        setUser(loggedInUser);
        setBets(mockBets.filter((b) => b.userId === loggedInUser.id));
        router.push("/");
    }

    const logout = () => {
        setUser(null);
        setBets([]);
        router.push("/login");
    }

    const placeBet = (eventId: number, selectedOutcome: string, amount: number) => {
        if (!user) return;
        
        const allEvents = [...mockEvents, ...mockESportsEvents];

        const event = allEvents.find((e) => e.id === eventId);

        if (!event) return;

        let odds = 0
        if (selectedOutcome === event.teamA) odds = event.oddsA
        else if (selectedOutcome === event.teamB) odds = event.oddsB
        else odds = event.drawOdds

        const newBet: Bet = {
        id: Date.now(),
        userId: user.id,
        eventId,
        selectedOutcome,
        amount,
        potentialWinnings: Number.parseFloat((amount * odds).toFixed(2)),
        status: "Pendiente",
        date: new Date().toISOString(),
        eventDetails: {
            teamA: event.teamA,
            teamB: event.teamB,
            category: event.category,
            game: event.game,
        },
        }

        setBets((prevBets) => [newBet, ...prevBets])

    }

    return <AuthContext.Provider value={{ user, bets, login, logout, placeBet}}>{children}</AuthContext.Provider>

}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}