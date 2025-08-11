export interface User {
    id: number;
    username: string;
    password: string;
}

export interface SportEvent {
    id: number
    category: "sport" | "esport"
    game?: string 
    teamA: string
    teamB: string
    oddsA: number
    oddsB: number
    drawOdds: number
    date: string
}

export interface Bet {
    id: number
    userId: number
    eventId: number
    selectedOutcome: string
    amount: number
    potentialWinnings: number
    status: "Pendiente" | "Ganada" | "Perdida"
    date: string
    eventDetails?: {
        teamA: string
        teamB: string
        category: "sport" | "esport"
        game?: string
    }
}

