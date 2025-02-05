import { Country } from "./types";

export const createContextFromCountries = (countries: Country[] = []) => {
  if (!countries.length) return "";

  const countryInfo = countries
    .map(
      (country) =>
        `${country.name} (${country.emoji}): Capital - ${
          country.capital || "N/A"
        }, Currency - ${country.currency || "N/A"}`
    )
    .join("\n");

  return `Here is the current information about countries in the table:\n${countryInfo}\n\nPlease use this information to answer questions about countries.`;
};

export const SUGGESTED_QUESTIONS = [
  "What countries use the Euro as their currency?",
  "Which countries are in Asia?",
  "Tell me about the table!",
];
