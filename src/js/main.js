import {getCharacters, scrollNavBar,showLoader, hideloader,verificarSesion,alertMassage} from'./funtions.js';

gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
  if(verificarSesion()){

    document.getElementById('user').innerHTML = JSON.parse(sessionStorage.getItem('sesion'))[0].logged == true ? JSON.parse(sessionStorage.getItem('sesion'))[0].user : '';

    showLoader();
    alertMassage('Welcome to the app');

    setTimeout(() => {
      hideloader();
      getCharacters();
    }, 2000);

    document.addEventListener('scroll', scrollNavBar);

    document.getElementById('logout').addEventListener('click', () => {
      sessionStorage.removeItem('sesion');
      alertMassage('The session is closing...');
      showLoader();
      setTimeout(() => {
        hideloader();
        window.location.reload();
      }, 2000);
    })
  }else{
    window.location.href = "./../../index.html";
  }
});

