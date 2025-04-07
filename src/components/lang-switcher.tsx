'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { useTransition } from 'react';
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";
import { HiLanguage } from 'react-icons/hi2';

const locales = [
    { code: 'en', label: 'English' },
    { code: 'es', label: 'Español' },
    { code: 'fr', label: 'Français' },
    { code: 'it', label: 'Italiano' },
    { code: 'pt', label: 'Português' },
    { code: 'de', label: 'Deutsch' },
    { code: 'ru', label: 'Русский' },
    { code: 'zh', label: '中文' },
    { code: 'nl', label: 'Nederlands' },
];

export default function LanguageSwitcher() {
    const locale = useLocale();
    const pathname = usePathname();
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const handleSelect = (newLocale: string) => {
        const segments = pathname.split('/');
        segments[1] = newLocale;
        startTransition(() => {
            router.replace(segments.join('/'));
        });
    };

    return (
        <div className="fixed top-4 right-4 z-50">
            <Select value={locale} onValueChange={handleSelect}>
                <SelectTrigger className="w-18 h-18 rounded-full border border-white/20 bg-black/70 hover:bg-black/90 text-white p-2">
                    <HiLanguage size={25} />
                </SelectTrigger>
                <SelectContent>
                    {locales.map(({ code, label }) => (
                        <SelectItem key={code} value={code}>
                            {label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
}
