import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
	const user = await prisma.user.create({
		data: {
			name: "John Doe",
			email: "jhon123doe@gmail.com",
			avatarUrl: "github.com/Padilha1.png",
		},
	});

	const pool = await prisma.pool.create({
		data: {
			title: "Example Pool",
			code: "BOL125",
			ownerId: user.id,

			participants: {
				create: {
					userId: user.id,
				},
			},
		},
	});

	await prisma.game.create({
		data: {
			date: "2022-11-02T01:05:53.599Z",
			firstTeamCountryCode: "DE",
			secondTeamCountryCode: "BR",
		},
	});
	await prisma.game.create({
		data: {
			date: "2022-11-02T01:05:53.599Z",
			firstTeamCountryCode: "BR",
			secondTeamCountryCode: "AR",

			guesses: {
				create: {
					firstTeamPoints: 2,
					secondTeamPoints: 1,

					participant: {
						connect: {
							userId_poolId: {
								userId: user.id,
								poolId: pool.id,
							},
						},
					},
				},
			},
		},
	});
}

main();
