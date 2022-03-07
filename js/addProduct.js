import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/9.4.0/firebase-storage.js";
var ImgName, ImgUrl;
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
document.getElementById("select").onclick = function (e) {
  var input = document.createElement("input");
  input.type = "file";
  input.onchange = (e) => {
    files = e.target.files;
    reader = new FileReader();
    reader.onload = function () {
      document.getElementById("myimg").src = reader.result;
    };
    reader.readAsDataURL(files[0]);
  };
  input.click();
};
document.getElementById("upload").onclick = function () {
  ImgName = document.getElementById("namebox").value;
  const storage = getStorage();
  const spaceRef = ref(storage, "products/" + ImgName);
  const uploadTask = uploadBytesResumable(spaceRef, files[0]);
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
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
const add = async () => {
  const title = document.getElementById("title").value;
  const quantity = document.getElementById("quantity").value;
  const description = document.getElementById("description").value;
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  let userId = urlParams.get("id");
  const failMsg = document.getElementById("msg");
  const successMsg = document.getElementById("msg1");
  if (
    !ImgUrl == "" &&
    !userId == "" &&
    !title == "" &&
    !quantity == "" &&
    !description == "" &&
    !ImgName == ""
  ) {
    const response = await fetch("http://127.0.0.1:5000/product", {
      method: "POST",
      body: JSON.stringify({
        title: title,
        quantity: quantity,
        description: description,
        image: ImgUrl,
        imageName: ImgName,
        userId: userId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    successMsg.innerHTML = "Successfully added";
    failMsg.innerHTML = "";
    location.href = "/userDashboard.html?id=" + userId;
  } else {
    failMsg.innerHTML = "Input field can not empty!";
    successMsg.innerHTML = "";
  }
};
document.getElementById("btnClick").onclick = add;
