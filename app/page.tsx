import { Pacifico } from 'next/font/google';
import { cn } from '@/lib/utils';

const pacifico = Pacifico({ weight: '400', subsets: ['latin'] });

export default function Home() {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-4">
      <h1 className={cn("text-4xl sm:text-6xl text-white text-center", pacifico.className)}>
        Rishika's Planner
      </h1>
    </div>
  );
}