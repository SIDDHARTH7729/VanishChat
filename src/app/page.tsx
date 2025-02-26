"use client"
import { BackgroundLinesDemo } from "@/components/ui/mainComponents/BackgroundLinesDemo";
import FrontReviws from "@/components/ui/mainComponents/FrontReviws";
import Navbar from "@/components/ui/mainComponents/NavBar";
// import Security from "@/components/ui/Accertinity/Security";
import Image from "next/image";
import { motion } from 'framer-motion';
import FeaturesSection from "@/components/ui/mainComponents/FeaturesSection";

export default function Home() {
  return (
    <motion.div initial={{ opacity: 0, y: 50 }}  
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, ease: 'easeOut' }} className="dark flex flex-col">
      <Navbar/>
      <BackgroundLinesDemo/>
      <FrontReviws/>
      <FeaturesSection/>
    </motion.div>
  );
}
