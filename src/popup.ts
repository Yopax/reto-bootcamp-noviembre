import scrapeProducts from "./components/scrapeProducts";
import downloadJSON from "./components/downloadJson";
import Product from "./interfaces/Product";
import InjectionResult from "./interfaces/InjectionResult";

document.getElementById("scrapeButton")?.addEventListener("click", async () => {
  const feedback = document.getElementById("feedback") as HTMLElement;
  const output = document.getElementById("output") as HTMLElement;
  feedback.textContent = "Realizando scraping...";
  output.innerHTML = "";
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript(
    {
      target: { tabId: tab.id as number },
      func: scrapeProducts,
    },
    (results: InjectionResult<Product[]>[]) => {
      const data = results[0].result; // Recoge los resultados
      if (!data || data.length === 0) {
        feedback.textContent = "No se encontraron productos.";
        (
          document.getElementById("downloadButton") as HTMLElement
        ).style.display = "none";
      } else {
        feedback.textContent = "Scraping completado.";
        output.innerHTML = data
          .map(
            (product, i) =>
              `<div class="divcardgeneral">
                  <p class="pre">Producto scrapeado n°:${i + 1}</p>
                  <h2 class="letrab">${product.name}</h2>
                  <p class="for">${product.sellerName}</p>
                  <div class="divcardsecundary">
                   <p class="price">${product.salePrice}</p>
                   <div class="descuento">
                   <p class="pricedes">${product.salePriceDes}</p>
                   <p class="pricetag">${product.priceTag}</p>
                   </div>
                  </div>
                 </div>`
          )
          .join("");
        (
          document.getElementById("downloadButton") as HTMLElement
        ).style.display = "inline";
        (document.getElementById("downloadButton") as HTMLElement).onclick =
          () => downloadJSON(data);
      }
    }
  );
});
scrapeProducts;
downloadJSON;
