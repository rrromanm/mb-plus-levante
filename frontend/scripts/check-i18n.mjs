import assert from "node:assert/strict";

const base = process.argv[2] ?? "http://localhost:3010";
const slug = process.argv[3] ?? "mercedes-benz-a180-cdi-2006";

const BRAND = "MB Plus";
const CITY = { es: "Benidorm", en: "Benidorm", ru: "Бенидорме" };
const SPANISH = /\b(Coches|Catálogo|Vehículos|Inicio|imagen|miniatura|Descripción)\b/;

const PAGES = [
  ["es", "/", "/coches", `/coches/${slug}`],
  ["en", "/en", "/en/cars", `/en/cars/${slug}`],
  ["ru", "/ru", "/ru/cars", `/ru/cars/${slug}`],
];

const strip = (s) =>
  s.replace(/<[^>]+>/g, "").replace(/&[a-z]+;|&#\d+;/gi, " ").trim();

for (const [locale, ...paths] of PAGES) {
  for (const path of paths) {
    const html = await (await fetch(base + path)).text();
    const at = `${locale} ${path}`;

    const lang = html.match(/<html[^>]*\blang="([^"]+)"/)?.[1];
    assert.equal(lang, locale, `${at}: <html lang> is ${lang}`);

    const title = strip(html.match(/<title[^>]*>(.*?)<\/title>/s)?.[1] ?? "");
    assert.ok(title, `${at}: no <title>`);
    assert.equal(
      title.split(BRAND).length - 1, 1,
      `${at}: title is double-branded — ${title}`,
    );
    assert.ok(title.length <= 60, `${at}: title is ${title.length} chars — ${title}`);

    const desc = html.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? "";
    assert.ok(desc, `${at}: no meta description`);
    assert.ok(desc.length <= 155, `${at}: description is ${desc.length} chars`);

    const heads = [...html.matchAll(/<h([1-6])[^>]*>(.*?)<\/h\1>/gs)]
      .map((m) => [Number(m[1]), strip(m[2])]);
    assert.equal(heads.filter(([l]) => l === 1).length, 1, `${at}: not exactly one h1`);
    assert.ok(
      heads[0][1].includes(CITY[locale]),
      `${at}: h1 has no location term — ${heads[0][1]}`,
    );
    let deepest = 0;
    for (const [level, text] of heads) {
      assert.ok(level <= deepest + 1, `${at}: heading skip to h${level} — ${text}`);
      deepest = Math.max(deepest, level);
    }

    if (locale !== "es") {
      for (const alt of html.match(/\balt="([^"]*)"/g) ?? []) {
        assert.ok(!SPANISH.test(alt), `${at}: Spanish alt text — ${alt}`);
      }
      for (const [, text] of heads) {
        assert.ok(!SPANISH.test(text), `${at}: Spanish heading — ${text}`);
      }
    }
  }
}

console.log("i18n content checks passed");
