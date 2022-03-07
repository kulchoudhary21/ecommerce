const check = async () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  let id = urlParams.get("id");

  const response = await fetch("http://127.0.0.1:5000/user/"+id);
  const user = await response.json();
  let name = document.getElementById("name");
  let contact = document.getElementById("contact");
  let email = document.getElementById("email");
  name.innerHTML=user['name'];
  email.innerHTML="Email : "+user['email'];
  contact.innerHTML="Contact : "+user['contact'];
};
check();

function addID()
{
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  let userId = urlParams.get("id");
  location.href = "/addProduct.html?id="+userId;
}

const userAction = async () => {
  const response = await fetch("http://127.0.0.1:5000/products");
  const products = await response.json();
  const apiResult = [];
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  let id = urlParams.get("id");
  for (let product in products) {
    userId=products[product]['userId'];
    if(userId==id)
    { 
      let temp=products[product]
      temp['id']=product 
      apiResult.push(products[product]);
    }
  }
  const inner = document.getElementById("inner");
  apiResult.forEach((result, idx) => {
    const card = document.createElement("div");
    card.classList = "card-body";
    const content = `
  <div class="col">
   <div class="card">
   <a href="productDetail.html?id=${result.id}" id="userProduct">
    <div class="card-header" id="heading-${idx}">
    <img src="${result.image} class="card-img-top img-fluid" class="card-img-top" alt="...">  
    </div></a>

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
