"use client"

import { mockBets, mockESportsEvents, mockEvents } from "@/lib/data";
import { Bet, SportEvent, User } from "@/lib/types";
import { useRouter } from "next/navigation";
import { createContext, useState, useContext, type ReactNode } from "react";

interface AuthContextType {
    user: User | null;
    bets: Bet[];
    sportEvents: SportEvent[];
    login: (username: string, password: string) => void;
    logout: () => void;
    placeBet: (eventId: number, selectedOutcome: string, amount: number) => void;
}

const API_BASE = process.env.NEXT_PUBLIC_API_URL

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {

    const [user, setUser] = useState<User | null>(null);
    const [bets, setBets] = useState<Bet[]>([]);
    const [sportEvents, setSportEvents] = useState<SportEvent[]>([]);
    const router = useRouter();


    const fetchSportEvents = async () => {
        try {
            const res = await fetch(`${API_BASE}/sport-event`)
            if (!res.ok) throw new Error('No se pudieron obtener los eventos')
            const data = await res.json()
            setSportEvents(data)
        } catch (error) {
            console.error(error)
        }
    }

    const login = async (username: string, password: string) => {

        const res = await fetch(`${API_BASE}/user/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        })

        if (!res.ok) {
            throw new Error('Usuario o contraseña incorrectos')
        }

        const loggedUser: User = await res.json()
        setUser(loggedUser)

        const userRes = await fetch(`${API_BASE}/user/${loggedUser.id}`)
        if (!userRes.ok) throw new Error('No se pudieron obtener las apuestas')
        const userData: User & { bets: Bet[] } = await userRes.json()
        setBets(userData.bets || [])

        await fetchSportEvents()

        router.push('/')

    }

    const logout = () => {
        setUser(null);
        setBets([]);
        router.push("/login");
    }

    const placeBet = async (eventId: number, selectedOutcome: string, amount: number) => {
        if (!user) return alert('Debes estar logueado para apostar')

        const event = sportEvents.find(e => e.id === eventId)
        if (!event) return alert('Evento no encontrado')

        let odds = 0
        if (selectedOutcome === event.teamA) odds = event.oddsA
        else if (selectedOutcome === event.teamB) odds = event.oddsB
        else odds = event.drawOdds

        const potentialWinnings = parseFloat((amount * odds).toFixed(2))
        const status = "Pendiente"
        const date = new Date().toISOString()


        const res = await fetch(`${API_BASE}/bet`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userId: user.id,
                eventId,
                selectedOutcome,
                amount,
                potentialWinnings,
                status,
                date,
            }),
        })

        if (!res.ok) throw new Error('No se pudo realizar la apuesta')

        const newBet: Bet = await res.json()
        setBets((prev) => [newBet, ...prev])
    }


    return <AuthContext.Provider value={{ user, bets, sportEvents, login, logout, placeBet }}>{children}</AuthContext.Provider>

}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}