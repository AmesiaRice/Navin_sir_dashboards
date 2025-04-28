// app/lib/sheetData.js

let cachedData = null;

export async function getSheetData() {
  if (cachedData) return cachedData;

  const res = await fetch('https://script.google.com/macros/s/AKfycbzuphy6K3pcWWtCP2CplrzRCaF9UWUuha7gLOmZH24wNDM2hWEq9XaFAPbFUyBU6jEr/exec');

  if (!res.ok) {
    throw new Error("Failed to fetch Google Sheet data");
  }

  const json = await res.json();

  // Expecting { orders: [...], credentials: [...] }
  const { orders = [], credentials = [] } = json;

  cachedData = { orders, credentials };
  return cachedData;
}
