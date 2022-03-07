import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/9.4.0/firebase-storage.js";
var ImgName, ImgUrl, uid;
var files = [];
var reader;
var firebaseConfig = {
  apiKey: "AIzaSyDaNT0P54iBtqinc2yRbeDbhYtMWoj-WWA",
  authDomain: "ecommerce-96643.firebaseapp.com",
  databaseURL: "https://ecommerce-96643-default-rtdb.firebaseio.com",
  projectId: "ecommerce-96643",
  storageBucket: "ecommerce-96643.appspot.com",
  messagingSenderId: "738527397731",
  appId: "1:738527397731:web:6c13796d9f94ac70b0f556",
  measurementId: "G-78BLVXY84S",
};
var app = initializeApp(firebaseConfig);
const productDetail = async () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  let userId = urlParams.get("id");
  const img = document.getElementById("img");
  const title = document.getElementById("title");
  const quantity = document.getElementById("quantity");
  const description = document.getElementById("description");
  const response = await fetch("http://127.0.0.1:5000/product/" + userId);
  const product = await response.json();
  img.src = product["image"];
  title.value = product["title"];
  quantity.value = product["quantity"];
  description.value = product["description"];
  ImgName = product["imageName"];
  uid = product["userId"];
};
productDetail();

function addImage() {
  document.getElementById("select").onclick = function (e) {
    var input = document.createElement("input");
    input.type = "file";
    input.onchange = (e) => {
      files = e.target.files;
      reader = new FileReader();
      reader.onload = function () {
        document.getElementById("img").src = reader.result;
      };
      reader.readAsDataURL(files[0]);
    };
    input.click();
  };
  document.getElementById("upload").onclick = function () {
    const storage = getStorage();
    const spaceRef = ref(storage, "products/" + ImgName);
    const uploadTask = uploadBytesResumable(spaceRef, files[0]);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        const upProgress = document.getElementById("upProgress");
        upProgress.innerHTML = "Upload " + progress + "%";
      },
      (error) => {
        console.log("error in upload:" + error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          ImgUrl = downloadURL;
        });
      }
    );
  };
}
document.getElementById("select").onclick = addImage;
const editProduct = async () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  let id = urlParams.get("id");
  const title = document.getElementById("title").value;
  const quantity = document.getElementById("quantity").value;
  const description = document.getElementById("description").value;
  const failMsg = document.getElementById("msg");
  const successMsg = document.getElementById("msg1");
  if (
    !ImgUrl == "" &&
    !uid == "" &&
    !title == "" &&
    !quantity == "" &&
    !description == "" &&
    !ImgName == ""
  ) {
    const respons = await fetch("http://127.0.0.1:5000/product/" + id, {
      method: "PUT",
      body: JSON.stringify({
        userId: uid,
        quantity: quantity,
        description: description,
        title: title,
        imageName: ImgName,
        image: ImgUrl,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    successMsg.innerHTML = "Successfully added";
    failMsg.innerHTML = "";
  } else {
    // location.href = "/addProduct.html?id="+userId;
    failMsg.innerHTML = "Input field can not empty!";
    successMsg.innerHTML = "";
  }
};
document.getElementById("editButton").onclick = editProduct;
