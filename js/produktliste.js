window.addEventListener("DOMContentLoaded", hentData);

const url = `https://kea-alt-del.dk/t7/api/products?start=10&limit=20`;
const skabelon = document.querySelector("template").content;
const container = document.querySelector("main");
const knapper = document.querySelectorAll("button");
let data;
let filter = "alle";

knapper.forEach((knap) => knap.addEventListener("click", filtrer));

function hentData() {
  fetch(url)
    .then((res) => res.json())
    .then((produkter) => {
      data = produkter;
      visProdukter();
    });
}

function filtrer() {
  filter = this.dataset.kategori;
  document.querySelector(".valgt").classList.remove("valgt");
  this.classList.add("valgt");
  console.log(filter);
  visProdukter();
}

function visProdukter() {
  console.log(data);
  container.textContent = "";
  data.forEach((produkt) => {
    const kopi = skabelon.cloneNode(true);
    if (filter == "alle" || produkt.category == filter) {
      kopi.querySelector("img").src = `https://kea-alt-del.dk/t7/images/webp/640/${produkt.id}.webp`;
      kopi.querySelector("img").alt = produkt.productdisplayname;
      kopi.querySelector("h3").textContent = produkt.productdisplayname;
      kopi.querySelector(".price span").textContent = produkt.price;
      kopi.querySelector("a").href = `product.html?id=${produkt.id}`;
      if (produkt.soldout) {
        kopi.querySelector("article").classList.add("soldOut");
      }
      container.appendChild(kopi);
    }
  });
}
