import { efectForm, validateForm, encryptPassword } from "./funtions.js";

document.addEventListener("DOMContentLoaded", () => {
  const btn_switch = document.getElementById("btn_switch");
  const register_container = document.getElementById("register-container");
  const login_container = document.getElementById("login-container");
  const separador = document.getElementById("separador");
  let btn_login = document.getElementById("btn_login");
  let btn_register = document.getElementById("btn_register");

  btn_switch.addEventListener("click", (e) => {
    e.preventDefault();
    let p_separador_1 = document.getElementById("p_separador_1");
    let p_separador_2 = document.getElementById("p_separador_2");
    efectForm(
      0,
      -225,
      login_container,
      register_container,
      separador,
      btn_switch,
      p_separador_1,
      p_separador_2
    );
  });

  btn_register.addEventListener("click", (e) => {
    e.preventDefault();
    let user = document.getElementById("user_register").value;
    let password = document.getElementById("password_register").value;
    let password2 = document.getElementById("password_register_2").value;
    let registro = validateForm(user, password, password2, "register");

    if (registro.error) {
      alert(registro.message);
    }else{
      alert(registro.message);
    }
  });

  btn_login.addEventListener("click", (e) => {
    e.preventDefault();
    let user = document.getElementById("user").value;
    let password = document.getElementById("password").value;
    let login = validateForm(user, password, null, "login");
    if (login.error) {
      alert(login.message);
    }else{
      alert(login.message);
    }
  });
  console.log(encryptPassword("123456"));
  // let users = [
  //   { user: "miguel",
  //     password:"123456",
  //     characters:[1,3,5],
  //   },
  //   { user: "miguel2",
  //     password:"123456",
  //     characters:[2,4,6],
  //   },
  // ]

  // localStorage.setItem("users",JSON.stringify(users));
  // let user = validateForm("miguel","123456",null,"login");
  // console.log(user.message);
});
