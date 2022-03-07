
    console.log("fun1");
    let img = document.getElementById("img");
    img.addEventListener("change", () => {
      uploadFile(img.files[0]);
    });
  
  // const uploadFile = async (file) => {
  //     console.log("hello");
  //   const title = document.getElementById("title").value;
  //   const quantity = document.getElementById("quantity").value;
  //   const description = document.getElementById("description").value;
  //   const queryString = window.location.search;
  //   const urlParams = new URLSearchParams(queryString);
  //   let userId = urlParams.get("id");
  
  //   const fd = new FormData();
  //   fd.append("avatar", file);
  //   console.log(fd);
  
  //   const respons = await fetch("http://127.0.0.1:5000/product", {
  //     method: "POST",
  //     body: JSON.stringify({
  //       userId:userId,  
  //       title: title,
  //       quantity: quantity,
  //       description: description,
  //       image: fd,
  //     }),
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });
  //   location.href = "/login.html";
  // };
  
  
  
  
  const uploadFile = (file) => {
      console.log("hi");
      const title = document.getElementById("title").value;
      const quantity = document.getElementById("quantity").value;
      const description = document.getElementById("description").value;
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      let userId = urlParams.get("id");
    
      const fd = new FormData();
      fd.append("avatar", file);
      console.log(": ",fd)
    
    fetch('http://127.0.0.1:5000/product', {
      method: "POST",
      body: JSON.stringify({
        userId:userId,  
        title: title,
        quantity: quantity,
        description: description,
        image: fd,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(res => res.json())
      .then(json => console.log(json))
      .catch(err => console.error(err));
  }


  /////user auth
  // import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
// import {
//   getAuth,
//   signInWithEmailAndPassword,
// } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js";
// var firebaseConfig = {
//   apiKey: "AIzaSyDaNT0P54iBtqinc2yRbeDbhYtMWoj-WWA",
//   authDomain: "ecommerce-96643.firebaseapp.com",
//   databaseURL: "https://ecommerce-96643-default-rtdb.firebaseio.com",
//   projectId: "ecommerce-96643",
//   storageBucket: "ecommerce-96643.appspot.com",
//   messagingSenderId: "738527397731",
//   appId: "1:738527397731:web:6c13796d9f94ac70b0f556",
//   measurementId: "G-78BLVXY84S",
// };

//var app = initializeApp(firebaseConfig);

// var auth = getAuth(); 

// document.getElementById("singin").onclick = function () { 
//   var email = document.getElementById("email").value;
// var password = document.getElementById("passwd").value;

// signInWithEmailAndPassword(auth, email, password)
//   .then((userCredential) => {
//     // Signed in
//     const user = userCredential.user;
//     console.log(user);
//   })
//   .catch((error) => {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     console.log("error");
//   });
// }
// <script src="https://www.gstatic.com/firebasejs/7.15.5/firebase-app.js"></script>
// <script src="https://www.gstatic.com/firebasejs/7.15.5/firebase-auth.js"></script>
// <script src="https://www.gstatic.com/firebasejs/7.15.5/firebase-database.js"></script>
// <script src="https://www.gstatic.com/firebasejs/7.15.5/firebase-storage.js"></script>

  
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js";
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

var auth = getAuth();   

// document.getElementById("login").onclick = function () { 
//   var email = document.getElementById("email").value;
// var password = document.getElementById("passwd").value;

// signInWithEmailAndPassword(auth, email, password)
//   .then((userCredential) => {
//     // Signed in
//     const user = userCredential.user;
//     console.log(userCredential._tokenResponse.idToken);
//     check(userCredential._tokenResponse.idToken);
//     //location.href = "/userDashboard.html?id=" + user;
//   })
//   .catch((error) => {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     let msg = document.getElementById("msg");
//     msg.innerHTML = "wrong username and password";
//     console.log("error");
//   });
// }
//document.getElementById("login").onclick=check


// document.getElementById("login").onclick = function () { 
//   var email = document.getElementById("email").value;
//   var password = document.getElementById("passwd").value;


//   auth.setPersistence('none');

// // When the user signs in with email and password.
//  signInWithEmailAndPassword(auth,email, password).then(user => {
//    console.log(user);
//   // Get the user's ID token as it is needed to exchange for a session cookie.
//   return user.user.getIdToken().then(idToken => {
//     // Session login endpoint is queried and the session cookie is set.
//     // CSRF protection should be taken into account.
//     // ...
//     //console.log("idToken:",user._tokenResponse);
//     //const csrfToken = getCookie('csrfToken')
//     //console.log("csrf:",csrfToken);
    
//     return check(idToken);
//   });
// })

// }

// const check = async (idToken) => {
//   const respons = await fetch("http://127.0.0.1:5000/token", {
//     method: "POST",
//     body: JSON.stringify({
//       idToken: idToken,
//     }),
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });
//   check1();
// }
// const check1 = async () => {
//   const respons = await fetch("http://127.0.0.1:5000/session")
//   console.log(respons);
   
// }