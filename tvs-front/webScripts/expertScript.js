// ==UserScript==
// @name         MediaExpert
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.mediaexpert.pl/telewizory/lg/filtry/przekatna-ekranu-cal,od-40-do-49,od-50-do-59/rozdzielczosc,uhd-4k*
// @grant        none
// ==/UserScript==

const getRightPageUrl = () => {
  const $ = window.jQuery;
  const rightArrowPath =
    "#formPorownanie > div.list_head.b-offer_filters.clearfix2 > div:nth-child(2) > div.view_on_desktop > div.list_nav .icon-arrow-right";
  const rightArrow = $(rightArrowPath);
  const nextPageUrl = rightArrow.parent().attr("href");
  return nextPageUrl;
};

const getTvsList = () => {
  const $ = window.jQuery;
  const articlesPath = "[id^=product-id-]";
  const articles = $(articlesPath);

  const tvsList = articles.map(function(i, article) {
    const titlePath =
      "div.m-product_content.clearfix2 > div.m-product_header.clearfix2.is-desktop.is-varnish-test > h2 > a";
    const titleHref = $(article).find(titlePath);
    const title = titleHref.text();
    const productUrl = titleHref.attr("href");

    const isProductAvailablePath =
      "div.m-product_options.is-desktop > div > div > div.b-productAvailability > p.m-typo.m-typo_text.is-small";
    const isProductAvailable =
      $(article).find(isProductAvailablePath).length === 0;

    const pricePath = "div.m-product_options.is-desktop > div > p";
    const priceContent = $(article)
      .find(pricePath)
      .text();
    const price = priceContent / 100;

    const productDescriptionListPath =
      "div.m-product_content.clearfix2 > div.m-product_desc > div.m-product_descData.is-desktop .m-product_atrribute";
    const productDescriptionList = $(article).find(productDescriptionListPath);
    const diagonalKeeper = $(productDescriptionList).filter((i, item) => {
      const prodName = $(item).find(
        ".m-product_name :contains('Przekątna ekranu [cal]')"
      );
      return prodName.length > 0;
    });
    const diagonal = diagonalKeeper.find(".m-product_val").text();

    const result = { title, price, diagonal, isProductAvailable, productUrl };

    return result;
  });
  return tvsList.toArray();
};

const crawlTvs = () => {
  const tvsList = getTvsList();
  console.log(tvsList.length);

  console.log(JSON.stringify(tvsList, null, 2));
  const nextPageUrl = getRightPageUrl();
  if (nextPageUrl) {
    window.location.href = nextPageUrl;
  }
};

(function() {
  "use strict";

  setTimeout(crawlTvs, 2000);
})();
