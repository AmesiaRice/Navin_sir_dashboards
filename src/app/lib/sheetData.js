// app/lib/sheetData.js

let cachedData = null;

export async function getSheetData() {
  if (cachedData) return cachedData;

  const res = await fetch('https://script.googleusercontent.com/macros/echo?user_content_key=AehSKLicrgKmf11VlByw6QB3Wqm_yIyt7lJ9vzgT3AJbXswRy5xN0eC1raMEVDwCKqXJumzIARfMYvvgDn5gawd4LQtdpSL1lpz9UKbPQxpQi6dhxYcrE30Wji7LH2_9nsusqjICmjOJJwq293fX3P8ERHGiiPgyjPCH_PgiGwvYUPq83H7V2fZ_eTiUiG5VGP7tYeMFsg644gRgiMocye6RqkjNGq3juWPFQvLZJWIBrVPfsJuaxv9gKvN3Z1sdk_JHxLUWlGyfSJCH6y4UIu-LjCMK8_T_AA&lib=M0gYourf78sSuShXwOdZSKekTyRyPCM_0');

  if (!res.ok) {
    throw new Error("Failed to fetch Google Sheet data");
  }

  const json = await res.json();

  // Expecting { orders: [...], credentials: [...] }
  const { orders = [], credentials = [] } = json;

  cachedData = { orders, credentials };
  return cachedData;
}
