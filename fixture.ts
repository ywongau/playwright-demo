process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
import { test } from "@playwright/test";
import { Page } from "playwright-core";
import GitHub from "./src/pageObjects/gitHub";

const fixture = test.extend<{
  page: Page;
  gitHub: ReturnType<typeof GitHub>;
}>({
  gitHub: ({ page }, use) => use(GitHub(page)),
});

export default fixture;
