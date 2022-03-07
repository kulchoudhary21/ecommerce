const showData = async () => {
  let img=document.getElementById("img");  
  let title=document.getElementById("title");
  let description=document.getElementById("description");
  let quantity=document.getElementById("quantity");
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  let id = urlParams.get("id");
  const response = await fetch("http://127.0.0.1:5000/product/"+id);
  const product = await response.json();
  img.src=product['image'];
  title.innerHTML=product['title'];
  description.innerHTML="Description: "+product['description'];
  quantity.innerHTML="Quantity: "+product['quantity'];
};
showData();

function editProduct() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  let id = urlParams.get("id");
  location.href = "editProduct.html?id=" + id; 
}
document.getElementById("editButton").onclick = editProduct;

const deleteProduct = async () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  let id = urlParams.get("id");
  const response = await fetch("http://127.0.0.1:5000/product/" + id, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
};
document.getElementById("deleteButton").onclick = deleteProduct;
