"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export default function Home() {
  const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(null);
  const bigCardRef = useRef<HTMLDivElement | null>(null);
  const shineRef = useRef<HTMLDivElement | null>(null);
  const t = useTranslations('cards');
  const m = useTranslations('main_text');

  useEffect(() => {
    const cards = document.querySelectorAll(".tilt-card");

    cards.forEach((card) => {
      const inner = card.querySelector(".inner-card") as HTMLElement;
      const shine = card.querySelector(".shine") as HTMLElement;

      let currentX = 0;
      let currentY = 0;
      let targetX = 0;
      let targetY = 0;
      let animationFrame: number;

      const lerp = (start: number, end: number, amt: number) =>
        start + (end - start) * amt;

      const update = () => {
        currentX = lerp(currentX, targetX, 0.1);
        currentY = lerp(currentY, targetY, 0.1);
        inner.style.transform = `rotateX(${currentY}deg) rotateY(${currentX}deg)`;
        animationFrame = requestAnimationFrame(update);
      };

      const handleMouseMove = (e: Event) => {
        const event = e as MouseEvent;
        const rect = card.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        targetX = (x - centerX) / 10;
        targetY = -(y - centerY) / 10;

        const angle = Math.atan2(y - centerY, x - centerX) * (180 / Math.PI) - 90;
        shine.style.background = `linear-gradient(${angle}deg, rgba(255,255,255,0.3), transparent)`;
        shine.style.opacity = "1";
      };

      const handleMouseLeave = () => {
        targetX = 0;
        targetY = 0;
        shine.style.opacity = "0";
      };

      // ✅ Listeners añadidos sin error de tipos
      card.addEventListener("mousemove", handleMouseMove);
      card.addEventListener("mouseleave", handleMouseLeave);
      animationFrame = requestAnimationFrame(update);

      // Cleanup
      return () => {
        card.removeEventListener("mousemove", handleMouseMove);
        card.removeEventListener("mouseleave", handleMouseLeave);
        cancelAnimationFrame(animationFrame);
      };

    });
  }, []);

  const cards = Array.from({ length: 26 }, (_, i) => {
    const key = `card_${i + 1}`;
    return {
      src: `/cards/card${String(i + 1).padStart(2, '0')}.webp`,
      title: t(`${key}.title`),
      description: t(`${key}.description`)
    };
  });


  return (
    <div
      className="w-full min-h-screen px-2 sm:px-4 py-8 bg-cover bg-center"
      style={{ backgroundImage: "url('/wallpaper.png')" }}
    >
      <main className="p-4 rounded-xl">
        <h1 className="text-6xl font-orbitron text-[#fbfb53] font-bold my-8 text-center">
          {m("title")}
        </h1>
        <h2 className="text-3xl font-orbitron text-[#fbfb53] font-semibold mt-8 text-center">
          {m("subtitle")}
        </h2>
        <div className="flex flex-row">
          <h3 className="text-xl font-orbitron text-gray-200 font-semibold my-2 text-center">
            {m("about_01")}
          </h3>
          <Link className="text-xl font-orbitron text-blue-500 cursor-pointer hover:underline font-semibold my-2 text-center ms-1" href={"https://linktr.ee/galizaragozadev"}>galizaragozadev</Link>
          <h3 className="text-xl font-orbitron text-gray-200 font-semibold my-2 text-center">
            {m("about_02")}
          </h3>
        </div>
        <div className="flex justify-center my-4">
          <Link href={'/adivination'} target="_blank">
            <Button className="text-2xl p-8 bg-[#01000f] text-[#66aed4] hover:bg-[#66aed4] hover:text-[#01000f]">{m("cta_button")}
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
          {cards.map((card, index) => (
            <div
              key={index}
              className="tilt-card group relative w-72 h-96 flex flex-col rounded-2xl transition-transform duration-100 shadow-xl bg-black hover:bg-black/10"
              style={{ perspective: "1200px" }}
              onClick={() => setSelectedCardIndex(index)}
            >
              <div className="inner-card relative flex-1 flex flex-col rounded-2xl overflow-hidden transform-style-preserve-3d will-change-transform transition-transform duration-200">
                <div className="flex-1 relative z-10">
                  <Image
                    src={card.src}
                    alt={card.title}
                    fill
                    className="object-contain w-full h-full pointer-events-none"
                  />
                </div>
                <div className="z-10 font-orbitron bg-black bg-opacity-70 text-white text-md p-2 text-center rounded-b-2xl">
                  {card.title}
                </div>

                {/* Efecto de brillo sobre toda la carta */}
                <div className="shine absolute top-0 left-0 w-full h-full z-20 pointer-events-none opacity-0 transition-opacity duration-200 mix-blend-screen" />
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Descripción centrada con Framer Motion */}
      <AnimatePresence>
        {selectedCardIndex !== null && (
          <motion.div
            key="expanded-card"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center px-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
              className="bg-black text-white p-6 rounded-2xl shadow-2xl max-w-7xl w-full flex flex-col md:flex-row items-center gap-6 relative"
            >
              <button
                onClick={() => setSelectedCardIndex(null)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white text-xl"
              >
                ✕
              </button>

              {/* Carta grande con efecto de brillo dinámico */}
              <div
                ref={bigCardRef}
                className="w-[40rem] h-[50rem] relative flex-shrink-0 drop-shadow-[0_0_30px_rgba(0,255,255,0.4)]"
              >
                <Image
                  src={cards[selectedCardIndex].src}
                  alt={cards[selectedCardIndex].title}
                  fill
                  className="object-contain rounded-xl pointer-events-none"
                />
                <div
                  ref={shineRef}
                  className="absolute inset-0 rounded-xl pointer-events-none opacity-0 transition-opacity duration-200 mix-blend-screen"
                />
              </div>

              {/* Descripción */}
              <div className="flex-1">
                <h2 className="text-3xl font-orbitron font-bold mb-4">{cards[selectedCardIndex].title}</h2>
                <p className="text-xl font-roboto leading-relaxed text-white/90">
                  {cards[selectedCardIndex].description}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
