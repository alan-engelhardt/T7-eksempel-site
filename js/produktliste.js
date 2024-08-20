window.addEventListener("DOMContentLoaded", hentData);

const url = `https://kea-alt-del.dk/t7/api/products?start=10&limit=50`;
const skabelon = document.querySelector("template").content;
const container = document.querySelector("main");
const knapper = document.querySelectorAll("button");
let produkter;
let filter = "alle";

knapper.forEach((knap) => knap.addEventListener("click", filtrer));

function hentData() {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      produkter = data;
      visProdukter(produkter);
    });
}

function filtrer() {
  document.querySelector(".valgt").classList.remove("valgt");
  this.classList.add("valgt");
  filter = this.dataset.kat;
  const valgte = produkter.filter((produkt) => {
    return produkt.category == filter;
  });
  if (filter == "alle") {
    visProdukter(produkter);
  } else {
    visProdukter(valgte);
  }
}

function visProdukter(produkter) {
  console.log(produkter);
  container.textContent = "";
  produkter.forEach((produkt) => {
    const kopi = skabelon.cloneNode(true);
    kopi.querySelector("img").src = `https://kea-alt-del.dk/t7/images/webp/640/${produkt.id}.webp`;
    kopi.querySelector("img").alt = produkt.productdisplayname;
    kopi.querySelector("h3").textContent = produkt.productdisplayname;
    kopi.querySelector(".price span").textContent = produkt.price;
    kopi.querySelector("a").href = `product.html?id=${produkt.id}`;
    if (produkt.soldout) {
      kopi.querySelector("article").classList.add("soldOut");
    }
    container.appendChild(kopi);
  });
}
