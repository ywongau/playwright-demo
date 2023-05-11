import type { Locator, Page } from "playwright-core";

const GitHub = (page: Page) => {
  const hamburgerMenu = page.getByRole("button", {
    name: "Toggle navigation",
  });

  const repositoryNavigation = page.getByRole("navigation", {
    name: "Repository",
  });

  const moreButton = repositoryNavigation.getByRole("button", { name: "more" });
  const deleteDialog = page.getByRole("dialog").filter({ hasText: "Delete" });

  const signIn = async (username: string, password: string) => {
    await page.getByRole("link", { name: "Sign in" }).click();
    await page
      .getByRole("textbox", { name: "Username or email address" })
      .fill(username);
    await page.getByLabel("Password").fill(password);
    await page.getByRole("button", { name: "Sign in" }).click();
  };

  const newRepository = async (
    repositoryName: string,
    description?: string,
    visibility?: "Public" | "Private",
    addReadme?: boolean,
    gitIgnoreTemplate?: string
  ) => {
    await page.getByRole("link", { name: "New" }).click();
    await page
      .getByRole("textbox", { name: "Repository" })
      .fill(repositoryName);
    await page.getByText("is available").waitFor();
    await page.getByRole("textbox", { name: "Description" }).fill(description);
    await page.getByRole("radio", { name: visibility }).check();
    await page
      .getByRole("checkbox", { name: "Add a README file" })
      .setChecked(addReadme);
    await page.getByRole("button", { name: ".gitignore template" }).click();
    await page.getByPlaceholder("Filter").fill(gitIgnoreTemplate);
    await page.getByRole("menuitem", { name: gitIgnoreTemplate }).click();
    await page.getByRole("button", { name: "Create repository" }).click();
  };

  const deleteRepository = async (username: string, repositoryName: string) => {
    await page.getByRole("button", { name: "Delete this repository" }).click();
    await deleteDialog
      .getByRole("button", { name: "I want to delete this repository" })
      .click();
    await deleteDialog
      .getByRole("button", { name: "I have read and understand these effects" })
      .click();
    await deleteDialog
      .getByRole("textbox", {
        name: "To confirm",
      })
      .fill(username + "/" + repositoryName);
    await deleteDialog
      .getByRole("button", { name: "Delete this repository" })
      .click();
    await page.getByText("successfully deleted").waitFor();
    await page.getByRole("button", { name: "Dismiss this message" }).click();
  };

  const repositoryLink = async (name: string) => {
    const link = repositoryNavigation.getByRole("link", {
      name: name,
    });
    if ((await link.count()) > 0) {
      await link.click();
    } else {
      await moreButton.click();
      await repositoryNavigation
        .getByRole("menuitem", {
          name: name,
        })
        .click();
    }
  };

  return {
    hamburgerMenu,
    signIn,
    newRepository,
    repositoryLink,
    deleteRepository,
  };
};

export default GitHub;
