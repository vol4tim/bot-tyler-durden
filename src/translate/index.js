import { ch } from "./ch";
import { en } from "./en";
import { ko } from "./ko";
import { ru } from "./ru";

export const t = (lang) => {
  if (lang === "ru") {
    return ru;
  }
  if (lang === "en") {
    return en;
  }
  if (lang === "ch") {
    return ch;
  }
  if (lang === "ko") {
    return ko;
  }
  return en;
};
