import appPreviewImg from "../assets/preview.png";
import logoImg from "../assets/logo.svg";
import userAvatarExampleImg from "../assets/avatares.png";
import iconCheck from "../assets/icon.svg";
import Image from "next/image";
import { api } from "../lib/axios";
import { FormEvent, useState } from "react";

interface HomeProps {
	poolCount: number;
	guessesCount: number;
	userCount: number;
}

export default function Home(props: HomeProps) {
	const [poolTitle, setPoolTitle] = useState("");

	async function createPool(event: FormEvent) {
		event.preventDefault();
		try {
			const response = await api.post("/pools", {
				title: poolTitle,
			});
			const { code } = response.data;
			await navigator.clipboard.writeText(code);
			alert("Pool created, code was copied!");
		} catch (err) {
			console.log(err);
			alert("Failed to create the pool, try again");
		}
	}

	return (
		<div className="max-w-[1124px] h-screen mx-auto grid grid-cols-2 gap-28 items-center">
			<main className="">
				<Image src={logoImg} alt="NLW Copa" />
				<h1 className="mt-16 text-white text-5xl font-bold leading-tight">
					Create your own Copa pool and share to your friends{" "}
				</h1>

				<div className="mt-10 flex items-center gap-2">
					<Image src={userAvatarExampleImg} alt="avatares de pessoas" />
					<strong className="text-gray-100 text-xl">
						<span className="text-ignite-500"> +{props.userCount}</span> people
						are using
					</strong>
				</div>
				<form onSubmit={createPool} className="mt-10 flex gap-2">
					<input
						type="text"
						required
						placeholder="What is the Pool name ?"
						className="flex-1 px-6 py-4 rounded bg-gray-800 border border-gray-600 text-sm text-gray-100"
						onChange={(event) => setPoolTitle(event.target.value)}
						value={poolTitle}
					/>
					<button
						type="submit"
						className="bg-yellow-500 rounded px-6 py-4 tewxt-gray-900 font-bold text-sm uppercase  hover:bg-yellow-700"
					>
						Create my Pool
					</button>
				</form>

				<p className="text-gray-300 mt-4 text-sm leading-relaxed">
					After creating your pool, you will receive a unique code you can use
					to invite your friends
				</p>

				<div className="mt-10 pt-10 border-t border-gray-600 flex justify-between text-gray-100">
					<div className="flex items-center gap-6">
						<Image src={iconCheck} alt="" />
						<div className="flex flex-col ">
							<span className="font-bold text-2xl">+ {props.poolCount}</span>
							<span>Pools Created</span>
						</div>
					</div>
					<div className="w-px bg-gray-600"></div>
					<div className="flex items-center gap-6">
						<Image src={iconCheck} alt="" />
						<div className="flex flex-col ">
							<span className="font-bold text-2xl">+ {props.guessesCount}</span>
							<span>Guesses sent</span>
						</div>
					</div>
				</div>
			</main>
			<Image
				src={appPreviewImg}
				alt="Dois celulares exibindo uma previa da aplicacao móvel"
				quality={100}
			/>
		</div>
	);
}

export const getStaticProps = async () => {
	const [poolCountResponse, guessesCountResponse, userCountResponse] =
		await Promise.all([
			api.get("pools/count"),
			api.get("guesses/count"),
			api.get("users/count"),
		]);

	return {
		props: {
			poolCount: poolCountResponse.data.count,
			guessesCount: guessesCountResponse.data.count,
			userCount: userCountResponse.data.count,
		},
	};
};
