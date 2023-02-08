const url = `https://kea-alt-del.dk/t7/api/brands`;
const container = document.querySelector("nav.brandlist");

getData();

function getData() {
  fetch(url)
    .then((res) => res.json())
    .then((json) => {
      json.sort((a, b) => {
        if (a < b) {
          return -1;
        }
        if (a > b) {
          return 1;
        }
        return 0;
      });
      console.log(json);
      json.forEach(visEmner);
    });
}

function visEmner(emne) {
  container.innerHTML += `<a href="productlist.html?brand=${emne.brandname}">${emne.brandname}</a>`;
}
