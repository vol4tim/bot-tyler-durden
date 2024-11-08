import { en } from "./en";
import { ru } from "./ru";

export const t = (lang) => {
  if (lang === "ru") {
    return ru;
  }
  if (lang === "en") {
    return en;
  }
  return en;
};
