let btn_theme = document.getElementById('theme');
let themeContainer = document.getElementById('theme-container');
let search_container = document.getElementById('search-container');
let input_search = document.getElementById('search');

//Evento para cargar el tema del sitio
document.addEventListener('DOMContentLoaded', () => {

  //inicial var animation
  let inicio = 0;
  let final = 0;

  if(theme() == 'oscuro'){
    //body oscuro
    document.body.classList.add('bg-neutral-900');
    document.body.classList.add('text-zinc-300');
    document.body.classList.remove('bg-neutral-100');
    document.body.classList.remove('text-zinc-900');

    //Input search oscuro
    if(search_container){
      search_container.classList.add('border-zinc-300');
      search_container.classList.add('text-zinc-300');
      search_container.classList.remove('border-zinc-900');
      search_container.classList.remove('text-zinc-900');
    }

    //button theme oscuro
    if(themeContainer){
      themeContainer.classList.toggle('justify-end');
      btn_theme.textContent = '🌙';
    }
    //variable para localStorage
    localStorage.setItem('theme', 'oscuro');

    //var animation
    inicio = 0;
    final = -29;

  }else{
    //body claro
    document.body.classList.add('bg-neutral-100');
    document.body.classList.add('text-zinc-900');
    document.body.classList.remove('bg-neutral-900');
    document.body.classList.remove('text-zinc-300');

    //Input search claro
    if(search_container){
      search_container.classList.add('border-zinc-900');
      search_container.classList.add('text-zinc-900');
      search_container.classList.remove('border-zinc-300');
      search_container.classList.remove('text-zinc-300');
    }

    //button theme claro
    if(themeContainer){
      themeContainer.classList.toggle('bg-zinc-200');
      btn_theme.textContent = '☀️';
    }

    //variable para localStorage
    localStorage.setItem('theme', 'claro');

    //var animation
    inicio = 29;
    final = 0;
  }

  //Evento para cambiar el tema del sitio
  if(btn_theme){
    btn_theme.addEventListener('click', () => {
      if(btn_theme.textContent == '🌙'){
        //body claro
        document.body.classList.remove('bg-neutral-900');
        document.body.classList.remove('text-zinc-300');
        document.body.classList.add('bg-neutral-100');
        document.body.classList.add('text-zinc-900');

        //Input search claro
        search_container.classList.add('border-zinc-900');
        search_container.classList.add('text-zinc-900');
        search_container.classList.add('text-zinc-900');
        search_container.classList.remove('text-zinc-300');
        search_container.classList.remove('border-zinc-300');
        search_container.classList.remove('text-zinc-300');

        //button theme claro
        themeContainer.classList.add('bg-zinc-200');
        btn_theme.textContent = '☀️';

        //animation btn
        gsap.fromTo("#theme", { x: inicio }, { x: final , duration: 0.5 });

        //variable para localStorage
        localStorage.setItem('theme', 'claro');

      }else if(btn_theme.textContent == '☀️'){
        //body oscuro
        document.body.classList.add('bg-neutral-900');
        document.body.classList.add('text-zinc-300');
        document.body.classList.remove('bg-neutral-100');
        document.body.classList.remove('text-zinc-900');

        //Input search oscuro
        search_container.classList.add('border-zinc-300');
        search_container.classList.add('text-zinc-300');
        search_container.classList.remove('text-zinc-900');
        search_container.classList.remove('border-zinc-900');

        //button theme oscuro
        themeContainer.classList.remove('bg-zinc-200');
        btn_theme.textContent = '🌙';

        //animation btn
        gsap.fromTo("#theme", { x: final  }, { x: inicio , duration: 0.5 });

        //variable para localStorage
        localStorage.setItem('theme', 'oscuro');
      }
    });
  }
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