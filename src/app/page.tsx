"use client";
import Image from "next/image";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    const cards = document.querySelectorAll(".tilt-card");

    cards.forEach((card) => {
      const shine = card.querySelector(".shine") as HTMLElement;

      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = -(y - centerY) / 15;
        const rotateY = (x - centerX) / 15;
        (card as HTMLElement).style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

        const angle = Math.atan2(y - centerY, x - centerX) * (180 / Math.PI) - 90;
        shine.style.background = `linear-gradient(${angle}deg, rgba(255,255,255,0.4), transparent)`;
        shine.style.opacity = "1";
      });

      card.addEventListener("mouseleave", () => {
        (card as HTMLElement).style.transform = `rotateX(0deg) rotateY(0deg)`;
        shine.style.opacity = "0";
      });
    });
  }, []);

  const titles = [
    "The Fool",
    "The Magician",
    "The High Priestess",
    "The Empress",
    "The Emperor",
    "The Hierophant",
    "The Lovers",
    "The Chariot",
    "Strength",
    "The Hermit",
    "Wheel of Fortune",
    "Justice",
    "The Hanged Man",
    "Death",
    "Temperance",
    "The Devil",
    "The Tower",
    "The Star",
    "The Moon",
    "The Sun",
    "Judgement",
    "The World",
    "King of Cups",
    "King Of Pentacles",
    "King of Wands",
    "King of Swords"
  ];

  const cards = titles.map((title, i) => ({
    src: `/cards/card${String(i + 1).padStart(2, "0")}.webp`,
    title,
  }));

  return (
    <div
      className="w-full min-h-screen px-2 sm:px-4 py-8 font-orbitron bg-cover"
      style={{ backgroundImage: "url('/wallpaper.png')" }}
    >
      <main className="p-4 rounded-xl">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
          {cards.map((card, index) => (
            <div
              key={index}
              className="tilt-card relative w-72 h-96 flex flex-col rounded-2xl transition-transform duration-100 shadow-xl bg-black"
              style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
            >
              <div className="flex-1 relative rounded-t-2xl overflow-hidden">
                <Image
                  src={card.src}
                  alt={card.title}
                  fill
                  className="object-contain w-full h-full pointer-events-none"
                />
                <div className="shine absolute top-0 left-0 w-full h-full rounded-t-2xl pointer-events-none opacity-0 transition-opacity duration-200 mix-blend-screen" />
              </div>
              <div className="bg-black bg-opacity-70 text-white text-md p-2 text-center rounded-b-2xl">
                {card.title}
              </div>
            </div>

          ))}
        </div>
      </main>
    </div>
  );
}  