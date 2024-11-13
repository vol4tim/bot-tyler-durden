export const escape = (str) =>
  str
    .replaceAll("#", "\\#")
    .replaceAll("(", "\\(")
    .replaceAll(")", "\\)")
    .replaceAll(".", "\\.")
    .replaceAll("!", "\\!")
    .replaceAll("-", "\\-");
