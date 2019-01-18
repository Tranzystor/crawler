// ==UserScript==
// @name         Allegro TVs
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://allegro.pl/kategoria/tv-i-video-telewizory-257732?stan=nowe&offerTypeBuyNow=1&price_from=1000&marka=LG&przekatna-ekranu-od=40&przekatna-ekranu-do=50&format-hd=4K%20UHD&rozdzielczosc-ekranu-px=3840%20x%202160&technologia-hdr=Tak&order=p*
// @include      https://allegro.pl/kategoria/tv-i-video-telewizory-257732?stan=nowe&offerTypeBuyNow=1&price_from=1000&marka=LG&przekatna-ekranu-od=40&przekatna-ekranu-do=50&format-hd=4K%20UHD&rozdzielczosc-ekranu-px=3840%20x%202160&technologia-hdr=Tak&p=*&order=p
// @include      https://allegro.pl/kategoria/tv-i-video-telewizory-257732?*
// @grant        none
// @require http://code.jquery.com/jquery-3.3.1.min.js
// ==/UserScript==

const getTvsList = () => {
  let $ = window.jQuery;
  const articlesPath = ".a3ad614 ";
  const articles = $(articlesPath);

  // const model1Pattern = /(\d\d)[L|l|U|u|E|e|P|p|S|s][K|k|J|j|H|h|F|f|G|g|B|b|C|c|N|n|A|a|W|w|M|m|S|s|V|v](\d){4}[P|p|W|w|S|s|A|a][U|u|L|l|N|n|S|s|J|j](\w){1}/;
  // const model2Pattern = /(\d\d)[L|l|U|u|E|e|P|p|S|s][K|k|J|j|H|h|F|f|G|g|B|b|C|c|N|n|A|a|W|w|M|m|S|s|V|v](\d){3}(\w){1}/;
  // const model3Pattern = /(\d\d)(\w){1}[6|7|8][T|D|P|V|J|P|W|S|A|t|d|p|v|j|p|w|s|a][U|L|N|S|J|u|l|n|s|j](\w){1}/;
  const LGModelPattern = /((\d\d)[L|l|U|u|E|e|P|p|S|s][K|k|J|j|H|h|F|f|G|g|B|b|C|c|N|n|A|a|W|w|M|m|S|s|V|v](\d){4}[P|p|W|w|S|s|A|a][U|u|L|l|N|n|S|s|J|j](\w){1}|(\d\d)[L|l|U|u|E|e|P|p|S|s][K|k|J|j|H|h|F|f|G|g|B|b|C|c|N|n|A|a|W|w|M|m|S|s|V|v](\d){3}(\w){1}|(\d\d)(\w){1}[6|7|8][T|D|P|V|J|P|W|S|A|t|d|p|v|j|p|w|s|a][U|L|N|S|J|u|l|n|s|j](\w){1})/;

  const tvs = articles.map((i, art) => {
    const titlePath = ".ebc9be2";
    const title = $(art)
      .find(titlePath)
      .text();

    const pricePath = "._611a83b";
    const price = $(art)
      .find(pricePath)
      .text();

    const modelExec = LGModelPattern.exec(title);
    const model = modelExec ? modelExec[0] : "";

    const diagonalKeeperPath = "._7e08ebc > * > :contains('Przekątna ekranu')";
    const diagonalKeeper = $(art)
      .find(diagonalKeeperPath)
      .next();
    const diagonal = diagonalKeeper.text();

    return { model, title, price, diagonal };
  });
  return tvs;
};

const getNextPageNumber = () => {
  const $ = window.jQuery;
  const nextPagePath =
    "body > div.main-wrapper > div:nth-child(3) > div > div > div > div > div.main-content.layout__grid > * > div > div.layout__actions.layout__card > div > div.pagination-top > div > div > a.m-pagination__nav.m-pagination__nav--next";
  const nextPageNumber = $(nextPagePath).attr("data-page");

  if (!nextPageNumber) {
    return null;
  }
  const nextPageUrl = replaceQueryParam(
    "p",
    nextPageNumber,
    window.location.href
  );
  return nextPageUrl;
};

const removeDuplicates = tvs => {
  const tvsNoDuplicates = tvs.toArray().reduce((prev, curr) => {
    const isAvailable = !!prev.find(x => x.title === curr.title);
    if (isAvailable) {
      return prev;
    }
    return [...prev, curr];
  }, []);
  return tvsNoDuplicates;
};

const crawlTvs = () => {
  const tvs = getTvsList();
  const tvsNoDuplicates = removeDuplicates(tvs);
  console.log(JSON.stringify(tvsNoDuplicates, null, 2));

  const nextPageUrl = getNextPageNumber();
  if (nextPageUrl) {
    window.location.href = nextPageUrl;
  }
};

const replaceQueryParam = (param, newval, url) => {
  var regex = new RegExp("([?;&])" + param + "[^&;]*[;&]?");
  var query = url.replace(regex, "$1").replace(/&$/, "");

  return (
    (query.length > 2 ? query + "&" : "?") +
    (newval ? param + "=" + newval : "")
  );
};

(function() {
  "use strict";
  setTimeout(crawlTvs, 2000);
})();
