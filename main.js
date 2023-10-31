const { error } = require("selenium-webdriver");
const { Builder, By, Key, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");

(async function main() {
  console.log("comenzando prueba");

  let driver = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(new chrome.Options().headless())
    .build();

  console.log("driver creado");

  const url = "https://www.dolarito.ar/";

  console.log(`abriendo ${url}`);

  try {
    await driver.get(url);
  } catch (error) {
    console.error(`error al traer la url: ${error}`);
    await driver.quit();
    throw Error("error al traer la url");
  }

  console.log("url encontrada");

  await driver.quit();
  console.log("terminando prueba correctamente");
})();