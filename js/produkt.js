// med urlParams kan vi fiske id'et ud af URL'en og vise det rigtige produkt

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
const url = `https://kea-alt-del.dk/t7/api/products/${id}`;

/* 
async function getProduct() {
  const resp = await fetch(url);
  const data = await resp.json();
  visProdukt(data);
} */

function getProduct() {
  fetch(url)
    .then((res) => res.json())
    .then(visProdukt);
  console.log(url);
}

function visProdukt(produkt) {
  document.querySelector(".purchaseBox h3").textContent = produkt.productdisplayname;
  document.querySelector("img").src = `https://kea-alt-del.dk/t7/images/webp/640/${id}.webp`;
  document.querySelector("img").alt = produkt.productdisplayname;
  // etc. med de øvrige data
}

getProduct();
