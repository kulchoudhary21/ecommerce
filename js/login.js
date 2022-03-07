const check = async () => {
  const response = await fetch("http://127.0.0.1:5000/users");
  const users = await response.json();
  let f = 0;
  for (let user in users) {
    const userEmail = document.getElementById("email").value;
    const userPassword = document.getElementById("passwd").value;
    const email = users[user]["email"];
    const passwd = users[user]["password"];
    if (userEmail == email && passwd == userPassword) {
      f = 1;
      location.href = "/userDashboard.html?id=" + user;
    }
  } 
  if (f == 0) {
    let msg = document.getElementById("msg");
    msg.innerHTML = "wrong username and password";
  }
};
document.getElementById("login").onclick=check
