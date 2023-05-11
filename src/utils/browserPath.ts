import fs from "fs";

const macChromePath =
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const windowsChromePath =
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const windowsChromeX86Path =
  "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe";
const possibleChromiumLocations = [
  macChromePath,
  windowsChromePath,
  windowsChromeX86Path,
];
export const chromePath = possibleChromiumLocations.find((x) =>
  fs.existsSync(x)
);
