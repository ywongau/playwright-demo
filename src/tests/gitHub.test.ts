import test from "../../fixture";
import randomId from "../utils/randomId";
const suffix = "-" + randomId(5);
const { GITHUB_USER, GITHUB_PASSWORD } = process.env;
test.describe("GitHub", () => {
  test("Create then delete a repository", async ({ page, gitHub }) => {
    await page.setViewportSize({ width: 768, height: 720 });
    await page.goto("https://github.com");
    await gitHub.hamburgerMenu.click();
    await gitHub.signIn(GITHUB_USER, GITHUB_PASSWORD);

    const repositoryName = "test-repo" + suffix;
    await gitHub.newRepository(
      repositoryName,
      "test description",
      "Public",
      true,
      "Node"
    );
    await gitHub.repositoryLink("Settings");
    await gitHub.deleteRepository(GITHUB_USER, repositoryName);
  });
});
