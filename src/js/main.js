import {paginator, scrollNavBar,showLoader, hideloader,verificarSesion,alertMassage,getUserSeccion} from'./funtions.js';

gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
  if(verificarSesion()){

    showLoader();
    alertMassage('Welcome to the app');
    getUserSeccion();

    setTimeout(() => {
      hideloader();
      paginator();
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

