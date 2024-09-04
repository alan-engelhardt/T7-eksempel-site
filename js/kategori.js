const catURL = "https://kea-alt-del.dk/t7/api/categories";

fetch(catURL)
  .then((res) => res.json())
  .then(bygNav);

function bygNav(data) {
  data.forEach((kategori) => {
    const list = document.querySelector(".categorylist");
    list.innerHTML += `<a href="productlist.html?kategori=${kategori.category}">${kategori.category}</a>`;
  });
}
