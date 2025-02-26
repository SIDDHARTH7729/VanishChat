import React from 'react'

type Props = {}
import { BackgroundLines } from "@/components/ui/background-lines";
import FrontReviws from './FrontReviws';

export function BackgroundLinesDemo() {
  return (
    <BackgroundLines className="flex items-center justify-center w-full flex-col px-4 h-[40rem] md:h-[40rem] ">
      <h2 className="bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white  md:text-2xl text-4xl lg:text-7xl font-sans py-2 md:py-10 relative z-20 font-bold tracking-tight">
      Messages that vanish, <br /> secrets that linger.
      </h2>
      <p className="max-w-xl mx-auto text-sm md:text-lg text-neutral-700 dark:text-neutral-400 text-center">
      A mysterious messaging app where texts disappear after being read—unless you make them public. Share secrets, let them linger, and see how many likes they gather before they vanish
      </p>
    </BackgroundLines>
  );
}
