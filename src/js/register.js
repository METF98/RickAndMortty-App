import { efectForm, validateForm, alertMassage,verificarSesion,showPassword} from "./functions.js";

document.addEventListener("DOMContentLoaded", () => {
  if(verificarSesion()){
    window.location.href = "./../src/pages/landing.html";
  }
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
    document.getElementById("user").value = "";
    document.getElementById("password").value = "";
    document.getElementById("user_register").value = "";
    document.getElementById("password_register").value = "";
    document.getElementById("password_register_2").value = "";
    document.getElementById("mail_register").value = "";

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

  btn_register.addEventListener("click", async  (e) => {
    document.getElementById("login").addEventListener("submit",(e) => {
      e.preventDefault();
    })
    e.preventDefault();
    let user = document.getElementById("user_register").value;
    let password = document.getElementById("password_register").value;
    let password2 = document.getElementById("password_register_2").value;
    let mail = document.getElementById("mail_register").value;
    let registro = await validateForm(user, password, password2, mail, "register");

    if (registro.error) {
      alertMassage(registro.message);
    }else{
      alertMassage(registro.message);

      setTimeout(() => {
        window.location.reload();
      },1200);
    }
  });

  btn_login.addEventListener("click", async (e) => {
    document.getElementById("login").addEventListener("submit",(e) => {
      e.preventDefault();
    })
    e.preventDefault();
    let user = document.getElementById("user").value;
    let password = document.getElementById("password").value;
    let login = await validateForm(user, password,null,null, "login");
    if (login.error) {
      alertMassage(login.message);
    }else{
      alertMassage(login.message);
      setTimeout(() => {
        window.location.href = "./src/pages/landing.html";
      }, 1200);
    }
  });

  document.getElementById('eye').addEventListener('click', (e) => {
    showPassword('password', 'eye');
  });

  document.getElementById('eye_register').addEventListener('click', (e) => {
    showPassword('password_register', 'eye_register');
  });

  document.getElementById('eye_register_2').addEventListener('click', (e) => {
    showPassword('password_register_2', 'eye_register_2');
  });

});

