'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

// ⚙️ Total de cartas disponibles
const TOTAL_CARDS = 26;

// 🃏 Función que devuelve 3 cartas aleatorias sin repetir y con orientación
const getRandomCards = () => {
    const indexes = Array.from({ length: TOTAL_CARDS }, (_, i) => i + 1);
    const shuffled = indexes.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 3);

    return selected.map((index) => ({
        id: index,
        src: `/cards/card${String(index).padStart(2, '0')}.webp`,
        title: `card_${index}`, // <- clave para i18n
        reversed: Math.random() < 0.5
    }));
};

const Page = () => {
    const t = useTranslations('cards');
    const [selectedCards, setSelectedCards] = useState<
        { id: number; src: string; title: string; reversed: boolean }[]
    >([]);

    const handlePlay = () => {
        const cards = getRandomCards();
        setSelectedCards(cards);
    };

    return (
        <div
            className="w-full min-h-screen px-2 sm:px-4 py-8 font-orbitron bg-cover bg-center relative"
            style={{ backgroundImage: "url('/wallpaper.png')" }}
        >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-8">
                {selectedCards.length === 0 && (
                    <Button
                        className="text-2xl p-8 bg-[#01000f] text-[#66aed4] hover:bg-[#66aed4] hover:text-[#01000f] shadow-xl"
                        onClick={handlePlay}
                    >
                        Jugar
                    </Button>
                )}

                {selectedCards.length > 0 && (
                    <div className="flex gap-6">
                        {selectedCards.map((card, i) => (
                            <div
                                key={i}
                                className="w-60 h-96 bg-black rounded-xl shadow-2xl relative flex flex-col items-center"
                            >
                                {/* Título dinámico arriba (puedes usar i18n aquí con `m(`cards.${card.title}.title`)`) */}
                                <p className="text-white text-lg font-semibold mt-2 text-center">
                                    {t(`${card.title}.title`)} {card.reversed ? "↕" : ""}
                                </p>

                                {/* Imagen con posible giro */}
                                <div className="relative w-full h-full">
                                    <Image
                                        src={card.src}
                                        alt={`Carta ${card.id}`}
                                        fill
                                        className={`object-contain rounded-xl transition-transform duration-300 ${card.reversed ? 'rotate-180' : ''
                                            }`}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                <p className='font-bold text-lg bg-yellow-400/40 rounded-xl p-2'>Ahora, has de mandarle el siguiente mensaje a ChatGPT: En tu siguiente respuesta debes actuar, 
                acabo de echar las cartas y salieron (tu tres cartas y si están o no del revés), interpretalas y lee mi pasado, presente y futuro</p>
            </div>
        </div>
    );
};

export default Page;
