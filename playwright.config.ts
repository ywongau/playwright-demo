import { PlaywrightTestConfig, devices } from "@playwright/test";

const use = {
  timeout: 60000,
  ignoreDefaultArgs: ["--hide-scrollbars"],
  ignoreHTTPSErrors: true,
  acceptDownloads: true,
  screenshot: "only-on-failure",
  video: "retain-on-failure",
  trace: "retain-on-failure",
  headless: false,
  viewport: { width: 1280, height: 720 },
  launchOptions: {
    slowMo: 500,
  },
} as any;

const config: PlaywrightTestConfig = {
  timeout: 60000,
  reporter: "list",
  projects: [
    {
      name: "Chrome",
      testDir: "src/tests",
      outputDir: "videos",
      retries: 0,
      use: {
        ...devices["Desktop Chrome"],
        ...use,
      },
    },
  ],
};
export default config;
