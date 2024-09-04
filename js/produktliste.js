const params = new URLSearchParams(window.location.search);
window.addEventListener("DOMContentLoaded", init);

let url, produkter, skabelon, container, kategori, nav;

function init() {
  kategori = params.get("kategori");
  url = `https://kea-alt-del.dk/t7/api/products?category=${kategori}&limit=50`;
  nav = document.querySelector("#filterknapper");
  document.querySelector("h2").textContent = kategori;
  skabelon = document.querySelector("template").content;
  container = document.querySelector("main");
  hentData();
}

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
  data.forEach((elm) => kats.push(elm.subcategory));
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
    return produkt.subcategory == filter;
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
