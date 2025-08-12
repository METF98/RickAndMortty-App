import {getCharacters, efectCard} from'./funtions.js';

gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {

  if(getCharacters()){
    efectCard();
  }



});

