import bcrypt from "https://cdn.jsdelivr.net/npm/bcryptjs@2.4.3/+esm";
import "./env.js";

export {
  getCharacters,
  getCharactersFavorites,
  searchCharter,
  scrollNavBar,
  efectForm,
  validateForm,
  encryptPassword,
  showPassword,
  alertMassage,
  showLoader,
  hideloader,
  verificarSesion,
  getUserSeccion
};


  let currentPage = 1;
  let totalPages = 0;
  let maxPages = 5;
  let nextButton = document.getElementById("next");
  let prevButton = document.getElementById("prev");

/**
 * @description Function to get the characters from the API
 * @param {number} page - The page number
 * @return {Promise} - The characters
 * @author Miguel Ticaray
 * @version 1.0
 */
async function getCharacters(page = 1) {
  let cards = document.getElementById("cards");

  cards.innerHTML = "";

  //Get characters
  await fetch(`https://rickandmortyapi.com/api/character?page=${page}`)
    .then((response) => response.json())
    .then((data) => {
      return data.results.map((character) => {
        totalPages = data.info.pages;
        currentPage = page;
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
  verifyFavorite();
  favorite();
  paginator();
}

/**
 * @description Function to get the characters favorites
 * @return {void}
 * @author Miguel Ticaray
 * @version 1.0
 */
async function getCharactersFavorites(){
  let cardsFavorites = document.getElementById('cards');
  let user = JSON.parse(sessionStorage.getItem('sesion'))[0].user;
  let charactersFavorites = JSON.parse(localStorage.getItem('users')).find(u => u.user === user).characters;

  if(charactersFavorites.length == 0){
    cardsFavorites.innerHTML = '<h2 class="text-center text-2xl">No tienes personajes favoritos agregados</h2>';
  }else{
    cardsFavorites.innerHTML = '';
  }

  for (let i = 0; i < charactersFavorites.length; i++) {
    let idCharacter = charactersFavorites[i];
    await fetch(`https://rickandmortyapi.com/api/character/${idCharacter}`)
    .then((response) => response.json())
    .then((data) => {
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
      card.id = data.id;
      img.src = data.image;
      img.alt = data.name;
      name.textContent = data.name;
      species.innerHTML = `<i class="fa-solid fa-globe"></i>${data.species}`;
      gender.innerHTML = `<i class="fa-solid fa-venus-mars"></i>${data.gender}`;
      status.innerHTML = `<i class="fa-regular fa-circle-dot ${lifeStatus(
        data.status
      )}"></i> ${data.status}`;

      //Append elements
      div_img.appendChild(img);
      div_img.appendChild(heart);
      div_info.appendChild(name);
      div_info.appendChild(species);
      div_info.appendChild(gender);
      div_info.appendChild(status);
      card.appendChild(div_img);
      card.appendChild(div_info);
      cardsFavorites.appendChild(card);
    });
  }
  if(charactersFavorites.length > 20){
    totalPages = charactersFavorites.length / 20;
    currentPage = 1;
  }else{
    totalPages = 1;
    currentPage = 1;
  }
  efectCard();
  verifyFavorite();
  favorite();
  paginator();
}

/**
 * @description Function to search characters in the API
 * @param {number} page - The page number to search @example 1
 * @param {string} nameCharacter - The name of the character to search @example "morty"
 * @function efectCard - Function to add the effect to the cards
 * @function verifyFavorite - Function to verify if the character is favorite
 * @function favorite - Function to add the favorite character to the local storage
 * @function paginator - Function to create the paginator
 * @return {Promise} - The characters
 * @author Miguel Ticaray
 * @version 1.0
 */
async function searchCharter(nameCharacter,page = 1) {
  let cards = document.getElementById("cards");
  cards.innerHTML = "";
  await fetch(`https://rickandmortyapi.com/api/character?page=${page}&&name=${nameCharacter}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.info.count > 20){
          totalPages = data.info.pages;
          currentPage = page;
        }
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
    });
  efectCard();
  verifyFavorite();
  favorite();
  paginator();
}


/**
 * @description Function to create the paginator
 * @returns {void}
 * @function getCharacters - Function to get the characters
 * @author Miguel Ticaray
 * @version 1.0
 */
function paginator(){
  let pageNumbersContainer = document.getElementById("pageNumbers");
  pageNumbersContainer.innerHTML = "";

  prevButton.disabled = currentPage === 1;
  prevButton.onclick = async () => {
    if (currentPage > 1) {
      currentPage-=1;
      scrollSmooth();
      setTimeout(async() => {
        if(document.getElementById('search').value != ''){
          await searchCharter(document.getElementById('search').value,currentPage);
        }else{
          await getCharacters(currentPage);
        }
      })
    }
  };

  // Calculate the range of page numbers to display
  let start = Math.max(1, currentPage - Math.floor(maxPages / 2));
  let end = currentPage + maxPages - 1;

  // Ensure the end is not greater than the total number of pages
  if (end > totalPages) {
    end = totalPages;
    start = Math.max(1, end - maxPages + 1);
  }

  for (let i = start; i <= end ; i++) {
    let pageButton = document.createElement("button");
    pageButton.textContent = i;
    pageButton.className = "cursor-pointer flex gap-3 items-center justify-center lg:hover:text-zinc-500 disabled:text-zinc-600 disabled:cursor-default disabled:hover:text-zinc-600";
    if (i === currentPage) {
      pageButton.disabled = true;
    }
    pageButton.addEventListener("click", async () => {
      currentPage = i;
      scrollSmooth();
      setTimeout(async () => {
        if(document.getElementById('search').value != ''){
          await searchCharter(document.getElementById('search').value, currentPage);
        }else{
          await getCharacters(currentPage);
        }
      })
    });
    pageNumbersContainer.appendChild(pageButton);
  }

  nextButton.disabled = currentPage === totalPages;
  nextButton.onclick = async () => {
    if (currentPage < totalPages) {
      prevButton.disabled = false;
      currentPage++;
      scrollSmooth();
      setTimeout(async () => {
        if(document.getElementById('search').value != ''){
          await searchCharter(document.getElementById('search').value, currentPage);
        }else{
          await getCharacters(currentPage);
        }
      })
    }
  };

}

/**
 * @description Function to scroll to the top of the page
 * @return {void}
 * @author Miguel Ticaray
 * @version 1.0
 */
function scrollSmooth() {
  if (window.scrollY > 0) {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
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
 * @description Function to verify if the character is favorite
 * @return {void}
 * @author Miguel Ticaray
 * @version 1.0
 */
function verifyFavorite() {
  document.querySelectorAll(".heart").forEach((heart) => {
    let id = heart.parentElement.parentElement.id;
    let userName = document.getElementById("user").textContent;
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let userIndex = users.findIndex(u => u.user === userName);
    let user = users[userIndex];
    if (user.characters.includes(id)) {
      heart.classList.remove("text-zinc-900");
      heart.classList.add("text-red-500");
    }
  })
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
      opacity: 0,
      scale: 0.5,
    },
    {
      opacity: 1,
      scale: 1,
      duration: 1,
      ease: "expo.out",
    }
  );
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
        heart.classList.toggle("text-zinc-900");
        heart.classList.toggle("text-red-500");
        gsap.to(heart, {
          scale: 2,
          repeat: 1,
          yoyo: true,
          duration: 0.2,
        });

        let id = heart.parentElement.parentElement.id;
        let userName = document.getElementById("user").textContent;
        let users = JSON.parse(localStorage.getItem("users")) || [];
        let userIndex = users.findIndex(u => u.user === userName);


        let user = users[userIndex];

        if (!user.characters) {
          user.characters = [];
        }

        let characterIndex = user.characters.indexOf(id);

        if (characterIndex === -1) {
          user.characters.push(id);
        } else {
          user.characters.splice(characterIndex, 1);
        }

        localStorage.setItem("users", JSON.stringify(users));
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
    "z-10",
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
    document.cookie = "message=true; expires=/; path=/";
  }, 3000);
}

/**
 * @description Function to scroll the navbar
 * @return {void}
 * @author Miguel Ticaray
 * @version 1.0
 */
function scrollNavBar() {
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

/**
 * @description Function to animate the form
 * @param {integer} x_inicio - The x position of the separador @example 0
 * @param {integer} x_final - The x position of the separador @example -230
 * @param {html} login_container - div that contains the form login @example login-container
 * @param {html} register_container - div that contains the form register @example register-container
 * @param {html} separador - div that contains the separador @example separador
 * @param {html} btn_switch - button that change the position of the form @example btn_switch
 * @param {html} p_separador_1 - p that contains the text in the separador  @example "¿Don't have an account yet?"
 * @param {html} p_separador_2 - p that contains the text in the separador @example "Sign up for free"
 * @return {void}
 * @author Miguel Ticaray
 * @version 1.0
 */
function efectForm(
  x_inicio,
  x_final,
  login_container,
  register_container,
  separador,
  btn_switch,
  p_separador_1,
  p_separador_2
) {
  if (btn_switch.textContent == "Sign up") {
    gsap.fromTo(
      login_container,
      {
        x: x_inicio,
        opacity: 1,
      },
      {
        opacity: 0,
        x: -x_final,
        duration: 0.4,
      }
    );
    gsap.fromTo(
      separador,
      { x: x_inicio },
      {
        x: x_final,
        duration: 0.1,
        ease: "power2.inOut",
        onStart: () => {
          gsap.fromTo(
            register_container,
            {
              opacity: 0,
              x: x_final,
            },
            {
              x: x_inicio,
              opacity: 1,
              duration: 0.4,
            }
          );
        },
        onComplete: () => {
          p_separador_1.textContent = "Already have an account?";
          p_separador_2.textContent = "Sign in";
          btn_switch.textContent = "Login";
          login_container.classList.remove("z-5");
          register_container.classList.add("z-5");
        },
      }
    );
  } else {
    gsap.fromTo(
      register_container,
      {
        opacity: 1,
        x: x_inicio,
      },
      {
        x: x_final,
        opacity: 0,
        duration: 0.5,
      }
    );
    gsap.fromTo(
      separador,
      { x: x_final },
      {
        x: x_inicio,
        duration: 0.1,
        ease: "power4.inOut",
        onStart: () => {
          gsap.fromTo(
            login_container,
            {
              opacity: 0,
              x: -x_final,
            },
            {
              x: x_inicio,
              opacity: 1,
              duration: 0.5,
            }
          );
        },
        onComplete: () => {
          p_separador_1.textContent = "¿Don't have an account yet?";
          p_separador_2.textContent = "Sign up for free";
          btn_switch.textContent = "Sign up";
          login_container.classList.add("z-5");
          register_container.classList.remove("z-5");
        },
      }
    );
  }
}

/**
 * @description Function to validate the form and return the result
 * @param {string} users - username of the user @example "miguel"
 * @param {string} password - password of the user @example "123456"
 * @param {string} [password_2=null] - password of the user @example "123456"
 * @param {string} form - form to validate @example "login" or "register"
 * @return {object} - object with the result of the validation @example {error: true , message: "El usuario no existe"}
 * @author Miguel Ticaray
 * @version 1.0
 */
async function validateForm(users, password, password_2 = null,mail = null, form) {
  if (form == "login") {
    if (sessionStorage.getItem("sesion") == null) {
      sessionStorage.setItem("sesion", JSON.stringify([]));
    }
    let datos = searchStorage(users);
    if (!datos) {
      return { error: true, message: "El usuario no existe" };
    }
    if (users == "" || password == "") {
      return { error: true, message: "Debes completar todos los campos" };
    } else {
      if(!validateRegex( /^[a-zA-Z0-9\sáéíóúÁÉÍÓÚ]{4,120}$/i,users)){
        return { error: true, message: "Formato de usuario no válido" };
      }
      if(validateRegex(/^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$/, password)){
        return { error: true, message: "La contraseña ingresada no es válida" };
      }
      let passwordDecrypt = await decryptPassword(datos, password);
      if (passwordDecrypt) {
        let sesion = JSON.parse(sessionStorage.getItem("sesion"));
        sesion.push({ user: datos.user, logged: true});
        sessionStorage.setItem("sesion", JSON.stringify(sesion));
        return { error: false, message: "Login exitoso" };
      } else {
        return {
          error: true,
          message: "El usuario o la contraseña son incorrectos",
        };
      }
    }
  } else {
    let datos = searchStorage(users);
    if (datos) {
      if (users == datos.user) {
        return { error: true, message: "El usuario ingresado ya existe" };
      }
    }
    if (users == "" || password == "" || password_2 == "" || mail == "") {
      return { error: true, message: "Debes completar todos los campos" };
    } else {
      if(!validateRegex( /^[a-zA-Z0-9\sáéíóúÁÉÍÓÚ]{4,120}$/i,users)){
        return { error: true, message: "Formato de usuario no válido" };
      }
      if(validateRegex(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]$/, mail)){
        return { error: true, message: "El correo ingresado no es válido" };
      }
      if (password != password_2) {
        return { error: true, message: "Las contraseñas no coinciden" };
      }
      if(validateRegex(/^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$/, password)){
        return {error: true, message: "La contraseña debe tener al menos 8 caracteres" };
      }
      if (register(users, password, mail)) {
        return { error: false, message: "Registro exitoso" };
      }
    }
  }
}


/**
 * @description Function to search the user in the localStorage
 * @param {string} user - The user to search @example "miguel"
 * @return {object|boolean} - The user object or false if not found
 * @author Miguel Ticaray
 * @version 1.0
 */
function searchStorage(user) {
  let users = JSON.parse(localStorage.getItem("users")) || [];
  return users.find(u => u.user === user) || false;
}


/**
 * @description Function to register a new user
 * @param {string} user - The user to register @example "miguel"
 * @param {string} password - The password to register @example "123456"
 * @return {boolean}
 * @author Miguel Ticaray
 * @version 1.0
 */
function register(user, password, mail) {
  if (localStorage.getItem("users") == null) {
    localStorage.setItem("users", JSON.stringify([]));
  }
  let passwordHash = encryptPassword(password);
  let users = JSON.parse(localStorage.getItem("users"));
  users.push({ user: user, password: passwordHash,mail: mail, characters: [] });
  localStorage.setItem("users", JSON.stringify(users));
  return true;
}

/**
 * @description Function to encrypt the password with bcrypt
 * @see \
 * @param {string} password - The password to encrypt @example "123456"
 * @return {string} - The encrypted password
 * @author Miguel Ticaray
 * @version 1.0
 */
function encryptPassword(password) {
  let mysalt = bcrypt
    .genSaltSync(10)
    .replace(/.{22}$/, window.env.TOKEN_SECRET);
  let hash = bcrypt.hashSync(password, mysalt);
  return hash;
}

/**
 * @description Function to decrypt the password with bcrypt
 * @param {string} user - The user for password to compare @example "miguel"
 * @param {string} password - The password to compare @example "123456"
 * @return {boolean} - The result of the comparison
 * @author Miguel Ticaray
 * @version 1.0
 */
async function decryptPassword(user, password) {
  let passwordHash = user.password;
  console.log(user);
  console.log(passwordHash);
  console.log(password);

  try {
    const result = await bcrypt.compare(password, passwordHash);

    if (result) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    return false;
  }
}

/**
 * @description Function to show or hide the password
 * @param {string} id_input - The id of the input
 * @param {string} id_btn - The id of the button
 * @return {void}
 * @author Miguel Ticaray
 * @version 1.0
 */
function showPassword(id_input, id_btn){
  let pass = document.getElementById(id_input);
  let btn_pass = document.getElementById(id_btn);
  // console.log(pass.value);
    if(pass.value != ""){
      if(pass.type == "password"){
      pass.type = "text";
      btn_pass.classList.remove("fa-eye");
      btn_pass.classList.add("fa-eye-slash");
    }else{
      pass.type = "password";
      btn_pass.classList.add("fa-eye");
      btn_pass.classList.remove("fa-eye-slash");
    }
  }
}

/**
 * @description Function to hide the loader
 * @return {void}
 * @author Miguel Ticaray
 * @version 1.0
 */
function hideloader() {
  let modal = document.getElementById("modal_loader");
  let modal_loader = document.getElementById("dialog_loader");

  modal.classList.remove("flex");
  modal_loader.classList.remove("flex");
  modal.classList.add("hidden");
  modal_loader.classList.add("hidden");
}

/**
 * @description Funcion for show the loader
 * @return {void}
 * @author Miguel Ticaray
 * @version 1.0
 */
function showLoader() {
  let modal = document.createElement("dialog");
  let container_loader = document.createElement("div");
  let loader = document.createElement("div");

  modal.id = "dialog_loader";
  container_loader.id = "modal_loader";
  modal.classList.add(
    "flex",
    "justify-center",
    "items-center",
    "bg-zinc-900/50",
    "fixed",
    "top-0",
    "left-0",
    "w-screen",
    "h-screen",
    "min-h-screen",
    "z-99",
    "w-screen",
    "h-screen"
  );
  container_loader.classList.add(
    "flex",
    "flex-col",
    "justify-center",
    "items-center",
    
    "min-w-30",
    "min-h-30",
    "overflow-auto",
    "rounded-md",
    "p-2",
    "sahdow-lg"
  );
  loader.classList.add("loader");

  document.body.appendChild(modal);
  modal.appendChild(container_loader);
  container_loader.appendChild(loader);
}

/**
 * @description Function to verify if the user is logged
 * @return {boolean} - The result of the verification
 * @author Miguel Ticaray
 * @version 1.0
 */
function verificarSesion(){
  if(sessionStorage.getItem("sesion") == null || sessionStorage.getItem("sesion") == "[]"){
    return false;
  }else{
    let sesion = JSON.parse(sessionStorage.getItem("sesion"));
    if(sesion[0].logged == true){
      return true;
    }else{
      return false;
    }
  }
}

/**
 * @description Function to show the user in the navbar
 * @return {void}
 * @author Miguel Ticaray
 * @version 1.0
 */
function getUserSeccion(){
  let user = document.getElementById('user');
  user.innerHTML = JSON.parse(sessionStorage.getItem('sesion'))[0].logged == true ? JSON.parse(sessionStorage.getItem('sesion'))[0].user : '';
}


/**
 * @description Function to validate the regex
 * @param {string} regex - The regex to validate @example "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
 * @param {string} value - The value to validate @example "miguel"
 * @return {boolean} - The result of the validation
 * @author Miguel Ticaray
 * @version 1.0
 */
function validateRegex(regex, value) {
  return regex.test(value);
}

