import {getCharacters, scrollNavBar,showLoader, hideloader,verificarSesion,alertMassage,getUserSeccion,verifyFavorite} from'./funtions.js';

gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
  if(verificarSesion()){

    showLoader();
    alertMassage('Welcome to the app');
    getUserSeccion();

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

