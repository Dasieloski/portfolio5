import type { Locale } from "@/lib/site";
import type { Dictionary } from "./types";
import en from "./en";
import es from "./es";

const dictionaries: Record<Locale, Dictionary> = { en, es };

export const getDictionary = (lang: Locale): Dictionary => dictionaries[lang];
