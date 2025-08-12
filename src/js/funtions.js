/**
 * @description Function to get the characters from the API
 * @return {Promise} - The characters
 * @author Miguel Ticaray
 * @version 1.0
 */
export async function getCharacters(page = 1) {
  let cards = document.getElementById("cards");

  //Get characters
  await fetch("https://rickandmortyapi.com/api/character?page=" + page)
    .then((response) => response.json())
    .then((data) => {
      return data.results.map((character) => {
        //Create elements
        let card = document.createElement("div");
        let div_img = document.createElement("div");
        let img = document.createElement("img");
        let div_info = document.createElement("div");
        let heart = document.createElement("i");
        let name = document.createElement("h2");
        let species = document.createElement("p");
        let gender = document.createElement("p");
        let status = document.createElement("p");

        //Add classes
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
        div_img.classList.add(
          "rounded-t-lg",
          "overflow-hidden",
          "shadow-xl",
          "relative"
        );
        img.classList.add(
          "w-full",
          "h-full",
          "object-center",
          "object-cover",
          "xl:group-hover/characters:scale-110",
          "transition-all",
          "duration-200",
          "ease-in-out"
        );
        heart.classList.add(
          "heart",
          "cursor-pointer",
          "fa-solid",
          "fa-heart",
          "text-zinc-900",
          "text-2xl",
          "transition-all",
          "duration-200",
          "ease-in-out",
          "absolute",
          "top-2",
          "right-2"
        );
        div_info.classList.add(
          "flex",
          "flex-col",
          "justify-center",
          "items-start",
          "gap-2",
          "px-2",
          "py-1"
        );
        name.classList.add(
          "text-xl",
          "text-center",
          "xl:group-hover/characters:text-teal-300",
          "transition-all",
          "duration-200",
          "ease-in-out"
        );
        species.classList.add("flex", "gap-2");
        gender.classList.add("flex", "gap-2");
        status.classList.add("status", "flex", "gap-2");

        //Add attributes
        card.id = character.id;
        img.src = character.image;
        img.alt = character.name;
        name.textContent = character.name;
        species.innerHTML = `<i class="fa-solid fa-globe"></i>${character.species}`;
        gender.innerHTML = `<i class="fa-solid fa-venus-mars"></i>${character.gender}`;
        status.innerHTML = `<i class="fa-regular fa-circle-dot ${lifeStatus(
          character.status
        )}"></i> ${character.status}`;

        //Append elements
        div_img.appendChild(img);
        div_img.appendChild(heart);
        div_info.appendChild(name);
        div_info.appendChild(species);
        div_info.appendChild(gender);
        div_info.appendChild(status);
        card.appendChild(div_img);
        card.appendChild(div_info);
        cards.appendChild(card);
      });
    })
    .catch((error) => console.log(error));

  efectCard();
  favorite();
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

/**
 * @description Function to animate the cards
 * @returns {void}
 * @function cardHover - Function to animate the cards hover
 * @author Miguel Ticaray
 * @version 1.0
 */
function efectCard() {
  let cards = document.querySelectorAll(".card");
  gsap.fromTo(
    cards,
    {
      y: 500,
      opacity: 0,
      scale: 0.5,
    },
    {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 1,
      ease: "expo.out",
      stagger: 0.2,
    }
  );

  cards.forEach((card) => {
    card.addEventListener("mouseover", cardHover);

    /**
     * @description Function to animate the cards hover
     * @return {void}
     * @author Miguel Ticaray
     * @version 1.0
     */
    function cardHover() {
      gsap
        .timeline()
        .to(card, {
          scale: 0.75,
          duration: 0.3,
          onStart: () => {
            card.removeEventListener("mouseover", cardHover);
          },
        })
        .to(card, {
          scale: 1,
          duration: 0.3,
          onComplete: () => {
            setTimeout(() => {
              card.addEventListener("mouseover", cardHover);
            }, 500);
          },
        });
    }
  });
}

/**
 * @description Function to add a favorite character
 * @return {void}
 * @author Miguel Ticaray
 * @version 1.0
 */
function favorite() {
  document.querySelectorAll(".heart").forEach((heart) => {
    heart.addEventListener("click", () => {
      if (localStorage.getItem("logged") === "true") {
        heart.classList.toggle("text-zinc-900");
        heart.classList.toggle("text-red-500");
        gsap.to(heart, {
          scale: 2,
          repeat: 1,
          yoyo: true,
          duration: 0.2,
        });
      } else {
        alertMassage("Debes iniciar sesión para agregar a favoritos");
      }
    });
  });
}

/**
 * @description Function to show a message in the screen
 * @param {string} info_message - The message to show @example "Debes iniciar sesión para agregar a favoritos"
 * @return {void}
 * @author Miguel Ticaray
 * @version 1.0
 */
function alertMassage(info_message) {
  //Create elements
  let modal_message_container = document.createElement("div");
  let message_container = document.createElement("div");
  let message = document.createElement("p");

  //Add classes
  modal_message_container.classList.add(
    "w-screen",
    "h-screen",
    "fixed",
    "top-0",
    "left-0",
    "bg-zinc-900/50",
    "z-1",
    "flex",
    "justify-center",
    "items-center"
  );
  message_container.classList.add(
    "flex",
    "flex-col",
    "gap-4",
    "items-center",
    "justify-center"
  );
  message.classList.add(
    "text-zinc-300",
    "text-2xl",
    "font-bold",
    "text-center",
    "bg-zinc-800",
    "p-4",
    "rounded-lg"
  );

  //Add content
  message.textContent = info_message;

  //Append elements
  document.body.appendChild(modal_message_container);
  modal_message_container.appendChild(message_container);
  message_container.appendChild(message);

  //remove elements
  setTimeout(() => {
    modal_message_container.remove();
  }, 3000);
}

/**
 * @description Function to scroll the navbar
 * @return {void}
 * @author Miguel Ticaray
 * @version 1.0
 */
export function scrollNavBar() {
  let nav = document.querySelector("nav");
  let scroll = window.scrollY;

  if (scroll > 0) {
    nav.classList.add(
      "bg-zinc-900/50",
      "backdrop-blur-md",
      "border-b",
      "border-zinc-100/5",
      "shadow-md",
      "shadow-zinc-900",
      "duration-500",
      "ease-in-out",
      "transition-all"
    );
    nav.classList.remove("bg-neutral-900");
  } else {
    nav.classList.remove(
      "bg-zinc-900/50",
      "backdrop-blur-md",
      "border-b",
      "border-zinc-100/5",
      "shadow-md",
      "shadow-zinc-900"
    );
    nav.classList.add("bg-neutral-900");
  }
}
