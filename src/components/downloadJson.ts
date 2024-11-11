import Product from "../interfaces/Product";

export default function downloadJSON(data: Product[]) {
  const filenameInput = document.getElementById(
    "filenameInput"
  ) as HTMLInputElement;
  const filename = filenameInput.value.trim() || "testdarli"; // Nombre predeterminado si no se ingresa uno
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${filename}.json`;
  a.click();
  URL.revokeObjectURL(url);
}
