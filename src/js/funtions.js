
/**
 * @description Function to get the characters from the API
 * @return {Promise} - The characters
 * @author Miguel Ticaray
 * @version 1.0
 */
export async function getCharacters() {
  await fetch("https://rickandmortyapi.com/api/character")
    .then((response) => response.json())
    .then((data) => {
      return data.results.map((character) => {
        let card = document.createElement("div");
        card.classList.add(
          "card",
          "border",
          "flex",
          "flex-col",
          "gap-2",
          "rounded-lg",
          "shadow-xl",
          "hover:scale-105",
          "transition-all",
          "duration-200",
          "ease-in-out",
          "cursor-pointer",
          "group/characters"
        );
        card.id = character.id;
        card.innerHTML = `
      <div class="rounded-t-lg overflow-hidden shadow-xl ">
        <img src="${character.image}" alt="${
          character.name
        }" class="w-full h-full object-center object-cover xl:group-hover/characters:scale-110 transition-all duration-200 ease-in-out ">
      </div>
      <div class="flex flex-col justify-center items-start gap-2 px-2 py-1 ">
        <h2 class="text-xl text-center xl:group-hover/characters:text-teal-300 transition-all duration-200 ease-in-out">${
          character.name
        }</h2>
        <p class="flex gap-2"><i class="fa-solid fa-globe"></i></i>${
          character.species
        }</p>
        <p class="flex gap-2"><i class="fa-solid fa-venus-mars"></i>${
          character.gender
        }</p>
        <p class="status flex gap-2"><i class="fa-regular fa-circle-dot ${lifeStatus(
          character.status
        )}"></i>${character.status}</p>
      </div>
      `;
        cards.appendChild(card);
      });
    })
    .catch((error) => console.log(error));
}

/**
 * @description Function to change the color of the status of the character
 * @param {string} status - The status of the character @example Alive, Dead
 * @return {string} - The color of the status of the character @example text-green-500
 * @author Miguel Ticaray
 * @version 1.0
 */
function lifeStatus(status) {
  if (status === "Alive") {
    return "text-green-500";
  } else if (status === "Dead") {
    return "text-red-500";
  } else {
    return "text-gray-400";
  }
}

export function efectCard() {
  const cards = document.getElementById("cards").children;
  let cardTl = gsap.timeline();

  let character = document.getElementById("1");
  console.log(character);
    cardTl.fromTo(
      cards,
      { opacity: 0, scale: 0.5 },
      {
        opacity: 1,
        scale: 1,
        stagger: 0.08,
        scrollTrigger: {
          trigger:'#home',
          start: "-50% bottom",
          end: "50% top",
          scrub: true,
          markers: true,
        }
      }
    );
}

// export function efectCard() {
//   const cards = document.querySelectorAll('.group/characters');
//   cards.forEach(card => {
//     card.addEventListener('click', () => {
//       window.location.href = `./character.html?id=${card.id}`;
//     });
//   });
// }
