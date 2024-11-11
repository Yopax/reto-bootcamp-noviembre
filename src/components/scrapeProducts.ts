import Product from "../interfaces/Product";

export default async function scrapeProducts(): Promise<Product[]> {
  function delay(time: number) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }
  await delay(200);
  const cards = Array.from(
    document.querySelectorAll("div.showcase-grid>div> .Showcase__content")
  ) as HTMLElement[];
  const products: Product[] = cards.map((el) => {
    const name =
      el.querySelector(".Showcase__name")?.textContent?.trim() ||
      "Nombre no encontrado";
    const sellerName =
      el.querySelector(".Showcase__SellerName")?.textContent?.trim() ||
      "Vendedor no encontrado";
    const salePrice =
      el.querySelector(".Showcase__salePrice")?.textContent?.trim() ||
      "Precio no encontrado";
    const salePriceDes =
      el.querySelector(".Showcase__ohPrice")?.textContent?.trim() || "";
    const priceTag =
      el
        .querySelector(".Showcase__priceTag.Showcase__priceTag--ohPrice > span")
        ?.textContent?.trim() || "-0%";
    return { name, sellerName, salePrice, priceTag, salePriceDes };
  });
  return products;
}
