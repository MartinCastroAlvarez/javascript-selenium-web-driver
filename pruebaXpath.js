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

  const xpath =
    "/html/body/div[1]/div[2]/div[2]/div[3]/ul/li[2]/div/div[2]/div[1]/div/p";

  console.log(`buscando ${xpath}`);

  // Localiza el elemento por su expresión XPath
  const elemento = await driver.findElement(By.xpath(xpath))
    .catch(error => {
        console.error(`error al traer el elemento: ${error}`);
        throw Error("error al traer el elemento");
    })
  console.log("elemento encontrado");

  // Obtiene el texto del elemento
  const textoDelElemento = await elemento.getText()
    .catch(error => {
      console.error(`error al obtener el texto del elemento: ${error}`);
      throw Error("error al obtener el texto del elemento");
  })

  console.log(`texto del elemento encontrado: ${textoDelElemento}`);

  const textoEsperado = "DOLAR BLUE";

  console.log(`esperando ${textoEsperado}`);

  // Comprueba si el texto del elemento coincide con "dolar blue"
  if (textoDelElemento.includes(textoEsperado)) {
    console.log('La prueba pasó. El elemento contiene el texto "dolar blue".');
  } else {
    console.error(
      'La prueba falló. El elemento no contiene el texto "dolar blue".'
    );
    await driver.quit();
    throw Error("La prueba falló. El elemento no contiene el texto dolar blue");
  }

  await driver.quit();
  console.log("terminando prueba correctamente");
})();