import {getCharacters, scrollNavBar} from'./funtions.js';

gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {

  getCharacters();

  document.addEventListener('scroll', scrollNavBar);

});

