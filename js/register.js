const updateEmployee = async () => {
  const name = document.getElementById("name").value;
  const contact = document.getElementById("contact").value;
  const password = document.getElementById("passwd").value;
  const email = document.getElementById("email").value;
  const failMsg = document.getElementById("msg");
  const successMsg = document.getElementById("msg1");
  if (!name == "" && !contact == "" && !password == "" && !email == "") {
    const respons = await fetch("http://127.0.0.1:5000/user", {
      method: "POST",
      body: JSON.stringify({
        name: name,
        contact: contact,
        email: email,
        password: password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (respons.status == 500) {
      failMsg.innerHTML =
        "password should be more than 6 char";
      successMsg.innerHTML = "";
    } else {
      successMsg.innerHTML = "Successfully Sing-Up";
      failMsg.innerHTML = "";
    }
  } else {
    failMsg.innerHTML = "Input field can not empty!";
    successMsg.innerHTML = "";
  }
};
