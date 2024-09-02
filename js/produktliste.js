window.addEventListener("DOMContentLoaded", hentData);

const url = `https://kea-alt-del.dk/t7/api/products?start=50&limit=50`;
const skabelon = document.querySelector("template").content;
const container = document.querySelector("main");
const nav = document.querySelector("#filterknapper");
let produkter;
let filter = "alle";

function hentData() {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      produkter = data;
      bygKatNav(data);
      visProdukter(produkter);
    });
}

function bygKatNav(data) {
  // lav et array med alle kategorier
  let kats = [];
  data.forEach((elm) => kats.push(elm.category));
  // lav array med en forekomst af hver kategori
  const katOnce = new Set(kats);
  console.log(kats, katOnce);
  // lav en ny "Alt" knap
  let knap = document.createElement("button");
  knap.textContent = "Alt";
  knap.dataset.kat = "alle";
  knap.classList.add("valgt");
  knap.addEventListener("click", filtrer);
  nav.appendChild(knap);
  // lav en knap til hver kategori
  katOnce.forEach((kat) => {
    knap = document.createElement("button");
    knap.textContent = kat;
    knap.dataset.kat = kat;
    knap.addEventListener("click", filtrer);
    nav.appendChild(knap);
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
  container.textContent = "";
  produkter.forEach((produkt) => {
    //console.log(produkt.category);
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
