import assert from "node:assert/strict";

const base = process.argv[2] ?? "http://localhost:3010";
const carPath = process.argv[3] ?? "/coches/mercedes-benz-a180-cdi-2006";

const blocks = async (path) => {
  const html = await (await fetch(base + path)).text();
  const found = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)];
  return found.map((m) => JSON.parse(m[1]));
};

const byType = (list, type) => {
  const hit = list.find((o) => o["@type"] === type);
  assert.ok(hit, `${type} JSON-LD missing`);
  return hit;
};

const has = (obj, keys, label) =>
  keys.forEach((k) => assert.ok(obj[k], `${label}: missing ${k}`));

for (const [locale, home, car] of [
  ["es", "/", carPath],
  ["en", "/en", "/en" + carPath.replace("/coches", "/cars")],
  ["ru", "/ru", "/ru" + carPath.replace("/coches", "/cars")],
]) {
  const dealer = byType(await blocks(home), "AutoDealer");
  has(dealer, ["name", "url", "telephone", "address", "geo", "priceRange",
               "openingHoursSpecification", "areaServed", "knowsLanguage"], `${locale} AutoDealer`);
  assert.equal(dealer.inLanguage, locale, `${locale} AutoDealer: wrong inLanguage`);

  const page = await blocks(car);
  const vehicle = byType(page, "Car");
  has(vehicle, ["name", "brand", "model", "vehicleModelDate", "mileageFromOdometer",
                "fuelType", "vehicleTransmission", "bodyType", "image", "offers"], `${locale} Car`);
  assert.equal(vehicle.inLanguage, locale, `${locale} Car: wrong inLanguage`);
  assert.equal(vehicle.mileageFromOdometer.unitCode, "KMT", `${locale} Car: mileage not in km`);
  assert.equal(vehicle.offers.priceCurrency, "EUR", `${locale} Car: wrong currency`);
  assert.equal(vehicle.offers.seller["@id"], dealer["@id"], `${locale} Car: seller not linked to dealer`);
  // Canonical and JSON-LD must agree, or /en and /ru claim to be the ES page.
  // JSON-LD always uses the canonical host, so compare paths, not full URLs.
  assert.equal(new URL(vehicle.url).pathname, car, `${locale} Car: url is not the locale's own URL`);

  const crumbs = byType(page, "BreadcrumbList").itemListElement;
  assert.equal(crumbs.length, 3, `${locale} BreadcrumbList: expected Home > Coches > car`);
  crumbs.forEach((c, i) => {
    assert.equal(c.position, i + 1, `${locale} BreadcrumbList: bad position`);
    has(c, ["name", "item"], `${locale} BreadcrumbList[${i}]`);
  });
}

console.log("JSON-LD OK");
