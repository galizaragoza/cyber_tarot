'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { FaCopy } from "react-icons/fa";
import { MdDone } from "react-icons/md";

const TOTAL_CARDS = 26;

const getRandomCards = () => {
    const indexes = Array.from({ length: TOTAL_CARDS }, (_, i) => i + 1);
    const shuffled = indexes.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 3);

    return selected.map((index) => ({
        id: index,
        src: `/cards/card${String(index).padStart(2, '0')}.webp`,
        titleKey: `card_${index}`,
        reversed: Math.random() < 0.5,
    }));
};

const Page = () => {
    const tCards = useTranslations('cards');
    const tPrompt = useTranslations('reading_prompt');

    const [selectedCards, setSelectedCards] = useState<
        { id: number; src: string; titleKey: string; reversed: boolean }[]
    >([]);
    const [copied, setCopied] = useState(false);

    const handlePlay = () => {
        setCopied(false); // reset copy state when replaying
        const cards = getRandomCards();
        setSelectedCards(cards);
    };

    const handleCopy = () => {
        const text = tPrompt('after', { cards: getFormattedCardList() });
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500); // reset icon after 2.5s
    };

    const getFormattedCardList = () => {
        return selectedCards
            .map((card) => {
                const name = tCards(`${card.titleKey}.title`);
                return `${name}${card.reversed ? ' (upside down)' : ''}`;
            })
            .join(', ');
    };

    return (
        <div
            className="w-full min-h-screen px-2 sm:px-4 py-8 bg-cover bg-center relative"
            style={{ backgroundImage: "url('/wallpaper.png')" }}
        >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-8">
                {selectedCards.length === 0 && (
                    <Button
                        className="text-2xl font-orbitron p-8 bg-[#01000f] text-[#66aed4] hover:bg-[#66aed4] hover:text-[#01000f] shadow-xl"
                        onClick={handlePlay}
                    >
                        {tPrompt('play')}
                    </Button>
                )}

                {selectedCards.length > 0 && (
                    <>
                        <div className="flex gap-6">
                            {selectedCards.map((card, i) => (
                                <div
                                    key={i}
                                    className="w-72 h-[28rem] bg-black rounded-xl shadow-2xl relative flex flex-col items-center"
                                >
                                    <p className="text-white font-orbitron text-lg font-semibold mt-2 text-center">
                                        {tCards(`${card.titleKey}.title`)} {card.reversed ? '↕' : ''}
                                    </p>
                                    <div className="relative w-full h-full">
                                        <Image
                                            src={card.src}
                                            alt={`Carta ${card.id}`}
                                            fill
                                            className={`object-contain rounded-xl transition-transform duration-300 ${card.reversed ? 'rotate-180' : ''}`}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="text-center font-orbitron max-w-xl">
                            <p className="mt-8 font-bold text-lg bg-black/70 text-white rounded-xl p-4">
                                {tPrompt('before')}
                                <br /><br />
                                <span className="italic text-white font-roboto!">
                                    {tPrompt('after', { cards: getFormattedCardList() })}
                                </span>
                            </p>
                            <Button
                                onClick={handleCopy}
                                className="mt-2 bg-[#01000f] text-[#66aed4] hover:bg-[#66aed4] hover:text-[#01000f] shadow-md"
                            >
                                {copied ? <MdDone size={30} /> : <FaCopy size={30} />}
                            </Button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Page;
