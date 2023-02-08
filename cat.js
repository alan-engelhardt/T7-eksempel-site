const url = `https://kea-alt-del.dk/t7/api/categories`;

const container = document.querySelector("nav.categorylist");

getData();

function getData() {
  fetch(url)
    .then((res) => res.json())
    .then((json) => {
      json.forEach(visEmner);
    });
}

function visEmner(emne) {
  const key = Object.keys(emne)[0];
  container.innerHTML += `<a href="productlist.html?cat=${emne.category}">${emne.category}</a>`;
}
