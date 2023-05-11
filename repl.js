process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

require("ts-node").register({
  compilerOptions: {
    module: "commonjs",
  },
});
const path = require("path");
const repl = require("repl");
const { basename, extname, sep } = require("path");
const chokidar = require("chokidar");
const Chromium = require("./src/utils/chromium").default;
const context = repl.start(">").context;
const getFileName = (path) => basename(path, extname(path));
Chromium().then(async (chromium) => {
  context.context = chromium.context;
  context.browser = chromium.browser;
  context.page = chromium.page;
  chromium.page.setDefaultTimeout(5000);
  chromium.page.setDefaultNavigationTimeout(20000);
  const loadPageObject = (file) => {
    const fileName = getFileName(file);
    const requirePath = "./" + file.split(sep).join("/");
    Object.keys(require.cache)
      .filter((cachedFile) => cachedFile.startsWith(path.resolve(".")))
      .forEach((cachedFile) => delete require.cache[cachedFile]);
    try {
      context[fileName] = require(requirePath).default(context.page);
      console.log(fileName + " loaded");
    } catch (ex) {
      console.log(ex);
    }
  };
  const unloadPageObject = (path) => {
    const fileName = getFileName(path);
    delete context[fileName];
    console.log(fileName + " unloaded");
  };
  chokidar
    .watch("./src/pageObjects")
    .on("add", loadPageObject)
    .on("change", loadPageObject)
    .on("unlink", unloadPageObject);
  chromium.page.goto("https://www.github.com");
});
