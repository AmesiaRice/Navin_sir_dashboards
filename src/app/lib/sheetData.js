// app/lib/sheetData.js

let cachedData = null;
let cachedPending = null;

export async function getSheetData() {
  if (cachedData) return cachedData;

  const res = await fetch('https://script.google.com/macros/s/AKfycbyISZRmFKNYeDFkdsQ4Ep0DkMRMN2mzZjYsE8l5OJF5tmthr7eMntnN1iXRbAFxb13z/exec');

  if (!res.ok) {
    throw new Error("Failed to fetch Google Sheet data");
  }

  const json = await res.json();

  // Expecting { orders: [...], credentials: [...] }
  const { orders = [], credentials = [] } = json;

  cachedData = { orders, credentials };
  return cachedData;
}

export async function getPendingOrders() {
  if (cachedPending) return cachedPending;

  const res = await fetch('https://script.google.com/macros/s/AKfycbyISZRmFKNYeDFkdsQ4Ep0DkMRMN2mzZjYsE8l5OJF5tmthr7eMntnN1iXRbAFxb13z/exec?type=pending');
  if (!res.ok) throw new Error("Failed to fetch pending orders");

  const json = await res.json();
  cachedPending = json;
  return cachedPending;
}
