import GamePage from "./game/page";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="mb-10 text-5xl">Welcome to the Tic-Tac-Toe Game!</h1>
      <GamePage />

    </main>
  );
}
