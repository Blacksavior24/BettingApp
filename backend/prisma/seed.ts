import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // 1️⃣ Crear usuario demo solo si no existe
  let user = await prisma.user.findFirst({ where: { username: 'demo' } });
  if (!user) {

    const hashedPassword = await bcrypt.hash('123456', 10);
    user = await prisma.user.create({
      data: {
        username: 'demo',
        password: hashedPassword,
      },
    });
  }

  // 2️⃣ Crear eventos deportivos (evitando duplicados)
  await prisma.sportEvent.createMany({
    data: [
      {
        category: 'sport',
        teamA: 'Real Madrid',
        teamB: 'FC Barcelona',
        oddsA: 2.5,
        oddsB: 2.8,
        drawOdds: 3.4,
        date: new Date('2025-08-15T20:00:00Z'),
      },
      {
        category: 'sport',
        teamA: 'Manchester United',
        teamB: 'Liverpool',
        oddsA: 3.1,
        oddsB: 2.2,
        drawOdds: 3.6,
        date: new Date('2025-08-16T15:00:00Z'),
      },
      {
        category: 'sport',
        teamA: 'Bayern Munich',
        teamB: 'Borussia Dortmund',
        oddsA: 1.8,
        oddsB: 4.0,
        drawOdds: 3.9,
        date: new Date('2025-08-17T18:30:00Z'),
      },
    ],
    skipDuplicates: true,
  });

  // 3️⃣ Crear eventos eSports
  await prisma.sportEvent.createMany({
    data: [
      {
        category: 'esport',
        game: 'League of Legends',
        teamA: 'T1',
        teamB: 'G2 Esports',
        oddsA: 1.5,
        oddsB: 2.5,
        drawOdds: 0,
        date: new Date('2025-08-20T14:00:00Z'),
      },
      {
        category: 'esport',
        game: 'CS:GO',
        teamA: 'Natus Vincere',
        teamB: 'FaZe Clan',
        oddsA: 1.9,
        oddsB: 1.9,
        drawOdds: 0,
        date: new Date('2025-08-21T17:00:00Z'),
      },
      {
        category: 'esport',
        game: 'Dota 2',
        teamA: 'Team Spirit',
        teamB: 'Gaimin Gladiators',
        oddsA: 2.1,
        oddsB: 1.7,
        drawOdds: 0,
        date: new Date('2025-08-22T12:00:00Z'),
      },
    ],
    skipDuplicates: true,
  });

  // 4️⃣ Obtener IDs actualizados para relacionar las apuestas
  const events = await prisma.sportEvent.findMany();

  // 5️⃣ Crear apuestas solo si no existen
  const existingBets = await prisma.bet.count();
  if (existingBets === 0) {
    await prisma.bet.createMany({
      data: [
        {
          userId: user.id,
          eventId: events.find(e => e.teamB === 'Liverpool')!.id,
          selectedOutcome: 'Liverpool',
          amount: 50,
          potentialWinnings: 110,
          status: 'Ganada',
          date: new Date('2025-08-10T10:00:00Z'),
        },
        {
          userId: user.id,
          eventId: events.find(e => e.teamB === 'Borussia Dortmund')!.id,
          selectedOutcome: 'Empate',
          amount: 20,
          potentialWinnings: 78,
          status: 'Perdida',
          date: new Date('2025-08-11T12:30:00Z'),
        },
        {
          userId: user.id,
          eventId: events.find(e => e.teamA === 'T1')!.id,
          selectedOutcome: 'T1',
          amount: 100,
          potentialWinnings: 150,
          status: 'Pendiente',
          date: new Date('2025-08-12T15:00:00Z'),
        },
      ],
    });
  }

  console.log('✅ Seed ejecutado correctamente (sin duplicados)');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
