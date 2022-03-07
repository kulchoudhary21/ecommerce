const userAction = async () => {
  const response = await fetch("http://127.0.0.1:5000/products");
  const products = await response.json();
  const apiResult = [];
  for (let product in products) {
    apiResult.push(products[product]);
  }
  const inner = document.getElementById("inner");
  apiResult.forEach((result, idx) => {
    const card = document.createElement("div");
    card.classList = "card-body";
    const content = `
  <div class="col">
    <div class="card">
    <div class="card-header" id="heading-${idx}">
    <img src="${result.image} class="card-img-top img-fluid" class="card-img-top" alt="...">  
    </div>

    <div id="collapse-${idx}" class="collapse show" aria-labelledby="heading-${idx}" data-parent="#accordion">
      <div class="card-body">
        <h5>${result.title}</h5>
      </div>
    </div>
  </div>
  </div>
  `;

    inner.innerHTML += content;
  });
};
userAction();
