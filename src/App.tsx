import Battleship from './components/battleship';

export default function Home() {
  return (
    <main className="flex h-full flex-col items-center justify-between">
      <div className="z-10 w-full max-w-5xl items-center justify-center font-mono text-sm">
        <h1 className="mb-8 text-center text-4xl font-bold text-green-600">Battleship</h1>
        <Battleship />
      </div>
    </main>
  );
}
