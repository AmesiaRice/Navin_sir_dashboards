// app/lib/sheetData.js

let cachedData = null;

export async function getSheetData() {
  if (cachedData) return cachedData;

  const res = await fetch('https://script.googleusercontent.com/macros/echo?user_content_key=AehSKLhVB7kA85T0KgGyriDCyNWZ2nmxiiGoPmBurnUb6-tvdXiF0w17R1-LieE5rb2C12mO0H2amFi8CgKk7KjKNKhV7ei6wYrXEO22VEjWzCh8k9RYP1qsxAMxwTk-Ap5kHRq78XtUKrl5UsJbK6UrngrVtJH5DHP2BBQ2Q4yLheSaPxjFid6ji4A-dgpBd0c_LSllDmyde6axW5oDei5In3Nt1iWPtS5vLNpo1EdhdVhU_EgVlmdrwg7zeCxb4c1pW9FlSIS2r-I9W0U2Qn_ie50GxMc-8A&lib=M0gYourf78sSuShXwOdZSKekTyRyPCM_0');

  if (!res.ok) {
    throw new Error("Failed to fetch Google Sheet data");
  }

  const json = await res.json();

  // Expecting { orders: [...], credentials: [...] }
  const { orders = [], credentials = [] } = json;

  cachedData = { orders, credentials };
  return cachedData;
}
