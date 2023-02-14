const urlParams = new URLSearchParams(window.location.search);
const cat = urlParams.get("cat");
const url = `https://kea-alt-del.dk/t7/api/products?limit=20&category=${cat}`;

const skabelon = document.querySelector("template").content;
const container = document.querySelector("main");

document.querySelector("h2").textContent = cat;

function getData() {
  fetch(url)
    .then((res) => res.json())
    .then((produkter) => produkter.forEach(visProdukter));
}

function visProdukter(produkt) {
  console.log(produkt);
  const kopi = skabelon.cloneNode(true);
  const imgurl = `https://kea-alt-del.dk/t7/images/webp/640/${produkt.id}.webp`;
  kopi.querySelector("img").src = imgurl;
  kopi.querySelector("img").alt = produkt.productdisplayname;
  kopi.querySelector("h3").textContent = produkt.productdisplayname;
  kopi.querySelector(".subtle").textContent = produkt.usagetype;
  kopi.querySelector(".price span").textContent = produkt.price;
  kopi.querySelector("a").href += produkt.id;
  if (produkt.soldout) {
    kopi.querySelector("article").classList.add("soldOut");
  }
  if (produkt.discount) {
    kopi.querySelector("article").classList.add("onSale");

    kopi.querySelector(".discounted p span").textContent = Math.round(produkt.price - (produkt.price * produkt.discount) / 100);

    kopi.querySelector(".discounted p+p span").textContent = produkt.discount;
  }
  container.appendChild(kopi);
}

getData();
