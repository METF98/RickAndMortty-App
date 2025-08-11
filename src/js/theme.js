let btn_theme = document.getElementById('theme');
let themeContainer = document.getElementById('theme-container');
let search_container = document.getElementById('search-container');
let input_search = document.getElementById('search');
let btn_search = document.getElementById('search-button');
let menu = document.getElementById('menu');
let menuContainer = document.getElementById('menu-container');
let status = document.getElementById('status');
let favorites = document.getElementById('favorites');

document.addEventListener('DOMContentLoaded', () => {

  let inicio = 0;
  let final = 0;

  if(theme() == 'oscuro'){
    document.body.classList.add('bg-neutral-900');
    document.body.classList.add('text-zinc-300');
    document.body.classList.remove('bg-neutral-100');
    document.body.classList.remove('text-zinc-900');
    localStorage.setItem('theme', 'oscuro');
    btn_theme.textContent = '🌙';
    themeContainer.classList.toggle('justify-end');

    inicio = 0;
    final = -29;

  }else{
    document.body.classList.add('bg-neutral-100');
    document.body.classList.add('text-zinc-900');
    document.body.classList.remove('bg-neutral-900');
    document.body.classList.remove('text-zinc-300');
    localStorage.setItem('theme', 'claro');
    btn_theme.textContent = '☀️';
    themeContainer.classList.toggle('bg-zinc-200');

    inicio = 29;
    final = 0;
  }


  btn_theme.addEventListener('click', () => {
    if(btn_theme.textContent == '🌙'){
      document.body.classList.remove('bg-neutral-900');
      document.body.classList.remove('text-zinc-300');
      document.body.classList.add('bg-neutral-100');
      document.body.classList.add('text-zinc-900');
      themeContainer.classList.add('bg-zinc-200');
      btn_theme.textContent = '☀️';
      gsap.fromTo("#theme", { x: inicio }, { x: final , duration: 0.5 });
      localStorage.setItem('theme', 'claro');

    }else if(btn_theme.textContent == '☀️'){
      document.body.classList.add('bg-neutral-900');
      document.body.classList.add('text-zinc-300');
      document.body.classList.remove('bg-neutral-100');
      document.body.classList.remove('text-zinc-900');
      themeContainer.classList.remove('bg-zinc-200');
      btn_theme.textContent = '🌙';
      gsap.fromTo("#theme", { x: final  }, { x: inicio , duration: 0.5 });
      localStorage.setItem('theme', 'oscuro');
    }

  });
});


/**
 * @description Funcion para cambiar el tema de la pagina
 * @const localTheme - Obtiene el tema de la pagina del localStorage
 * @return {string} - El tema de la pagina @example claro, oscuro
 * @author Miguel Ticaray
 * @version 1.0
 */
function theme() {
  const localTheme = localStorage.getItem("theme");
  if (localTheme){
    return localTheme;
  }else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches){
    return "oscuro";
  }else{
    return "claro";
  }
}