import {getCharacters,getCharactersFavorites,searchCharter, scrollNavBar,showLoader, hideloader,verificarSesion,alertMassage,getUserSeccion} from'./funtions.js';

//gsap animation
gsap.registerPlugin(ScrollTrigger);

//event DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  //verificar sesion
  if(verificarSesion()){
    showLoader();
    getUserSeccion();

    //show characters after 2 seconds
    setTimeout(() => {

      //hide loader
      hideloader();

      //get characters or characters favorites
      if(document.getElementById('favoritesList')){
        getCharactersFavorites();
      }else{
        if(!document.cookie.includes('message')){
          alertMassage('Welcome to the app');
        }
        getCharacters();
      }
    }, 2000);

    //scroll navbar animation
    document.addEventListener('scroll', scrollNavBar);

    if(document.getElementById('search')){
      document.getElementById('search').addEventListener('input', (e) => {
        searchCharter(e.target.value);
      });
    }

    if(document.getElementById('menu-button')){
      document.getElementById('menu-button').addEventListener('click', () => {
        document.getElementById('menu-mobile').classList.toggle('hidden');
      });
    }
    //logout button event
    document.querySelectorAll('.logout').forEach((logout) => {
      logout.addEventListener('click', () => {
        //remove sesion
        sessionStorage.removeItem('sesion');
        //remove cookie
        document.cookie = 'message=false; expires='+ new Date().toUTCString()+'; path=/';
        //message and reload
        alertMassage('The session is closing...');
        showLoader();
        setTimeout(() => {
          hideloader();
          window.location.reload();
        }, 2000);
      })
    })

  }else{
    window.location.href = "./../../index.html";
  }
});

