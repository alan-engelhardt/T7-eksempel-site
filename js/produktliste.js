const url = `https://kea-alt-del.dk/t7/api/products`;
const skabelon = document.querySelector("template").content;
const container = document.querySelector("main");

function hentData() {
  fetch(url)
    .then((res) => res.json())
    .then((produkter) => visProdukter(produkter));
}

function visProdukter(produkter) {
  produkter.forEach((produkt) => {
    const kopi = skabelon.cloneNode(true);
    kopi.querySelector("img").src = `https://kea-alt-del.dk/t7/images/webp/640/${produkt.id}.webp`;
    kopi.querySelector("img").alt = produkt.productdisplayname;
    kopi.querySelector("h3").textContent = produkt.productdisplayname;
    kopi.querySelector(".price span").textContent = produkt.price;
    kopi.querySelector("a").href = `product.html?id=${produkt.id}`;
    container.appendChild(kopi);
  });
}

hentData();
