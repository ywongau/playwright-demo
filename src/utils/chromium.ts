import { chromium } from "playwright-core";
import { BrowserContextOptions } from "playwright-core";
import { chromePath } from "./browserPath";
export default async (contextOptions?: Partial<BrowserContextOptions>) => {
  const browser = await chromium.launch({
    headless: false,
    executablePath: chromePath,
    tracesDir: "./trace",
  });
  const context = await browser.newContext({
    ignoreHTTPSErrors: true,
    ...contextOptions,
    viewport: { width: 768, height: 768 },
  });
  const page = await context.newPage();
  return { browser, page, context };
};
