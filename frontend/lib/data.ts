// DATA FRONTEND MOCK 
import type { SportEvent, Bet } from "./types"

export const mockEvents: SportEvent[] = [
  {
    id: 1,
    category: "sport",
    teamA: "Real Madrid",
    teamB: "FC Barcelona",
    oddsA: 2.5,
    oddsB: 2.8,
    drawOdds: 3.4,
    date: "2025-08-15T20:00:00Z",
  },
  {
    id: 2,
    category: "sport",
    teamA: "Manchester United",
    teamB: "Liverpool",
    oddsA: 3.1,
    oddsB: 2.2,
    drawOdds: 3.6,
    date: "2025-08-16T15:00:00Z",
  },
  {
    id: 3,
    category: "sport",
    teamA: "Bayern Munich",
    teamB: "Borussia Dortmund",
    oddsA: 1.8,
    oddsB: 4.0,
    drawOdds: 3.9,
    date: "2025-08-17T18:30:00Z",
  },
]

export const mockESportsEvents: SportEvent[] = [
  {
    id: 101,
    category: "esport",
    game: "League of Legends",
    teamA: "T1",
    teamB: "G2 Esports",
    oddsA: 1.5,
    oddsB: 2.5,
    drawOdds: 0, // No draws in LoL
    date: "2025-08-20T14:00:00Z",
  },
  {
    id: 102,
    category: "esport",
    game: "CS:GO",
    teamA: "Natus Vincere",
    teamB: "FaZe Clan",
    oddsA: 1.9,
    oddsB: 1.9,
    drawOdds: 0, // No draws
    date: "2025-08-21T17:00:00Z",
  },
  {
    id: 103,
    category: "esport",
    game: "Dota 2",
    teamA: "Team Spirit",
    teamB: "Gaimin Gladiators",
    oddsA: 2.1,
    oddsB: 1.7,
    drawOdds: 0, // No draws
    date: "2025-08-22T12:00:00Z",
  },
]

export const mockBets: Bet[] = [
  {
    id: 1,
    userId: 1,
    eventId: 2,
    selectedOutcome: "Liverpool",
    amount: 50,
    potentialWinnings: 110,
    status: "Ganada",
    date: "2025-08-10T10:00:00Z",
    eventDetails: { category: "sport", teamA: "Manchester United", teamB: "Liverpool" },
  },
  {
    id: 2,
    userId: 1,
    eventId: 3,
    selectedOutcome: "Empate",
    amount: 20,
    potentialWinnings: 78,
    status: "Perdida",
    date: "2025-08-11T12:30:00Z",
    eventDetails: { category: "sport", teamA: "Bayern Munich", teamB: "Borussia Dortmund" },
  },
  {
    id: 3,
    userId: 1,
    eventId: 101,
    selectedOutcome: "T1",
    amount: 100,
    potentialWinnings: 150,
    status: "Pendiente",
    date: "2025-08-12T15:00:00Z",
    eventDetails: { category: "esport", game: "League of Legends", teamA: "T1", teamB: "G2 Esports" },
  },
]
