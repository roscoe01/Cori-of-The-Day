import { coris } from "./data.js";

const botonCori = document.getElementById("coriButton");
const tarjeta = document.getElementById("tarjeta");

function randomCori() {
  const maxUsesPerDay = 3;
  const storageKey = "coriUses";
  const today = new Date().toISOString().split("T")[0];
  const storageLastDate = localStorage.getItem("coriLastDate");

  if (storageLastDate !== today) {
    localStorage.setItem("coriLastDate", today);
    localStorage.setItem(storageKey, "0");
  }

  let coriUses = parseInt(localStorage.getItem(storageKey));

  if (coriUses >= maxUsesPerDay) {
    Swal.fire({
      title: "Hey!",
      text: "Cori se cansó por hoy, probá mañana seguro tiene ganas de seguir jugando",
      imageUrl: "./assets/coriDescanso.jpg",
      imageWidth: 600,
      imageHeight: 400,
      imageAlt: "Cori Descanso",
      showClass: {
        popup: "animate__animated animate__bounceIn",
      },
    });
    return;
  }

  if (canExecute()) {
    botonCori.style.display = "none";

    // Generar la tarjeta con la información
    let randomIndex = Math.floor(Math.random() * coris.length);
    let cori = coris[randomIndex];

    tarjeta.innerHTML = `
      <div class="tarjeta-adelante">
          <div class="imagen">
              <img src="${cori.img}" alt="${cori.nombre}">
          </div>
          
          <div class="contenedor">
              
            <div class="nombre-carta">
                <p>${cori.nombre}</p>
            </div>

            <div class="descripcion-carta">
                
                <p><i class="fa-solid fa-quote-left"></i> ${cori.descripcion} <i class="fa-solid fa-quote-right"></i></p>
                
            </div>

            
          </div>   
      </div>

    `;
    tarjeta.style.display = "block";
    tarjeta.classList.add("animate-in");

    localStorage.setItem(storageKey, (coriUses + 1).toString());
  }
}

botonCori.addEventListener("click", () => randomCori());

function canExecute() {
  // Obtener la fecha y hora de la última ejecución desde localStorage
  const lastExecution = localStorage.getItem("lastExecutionDate");
  if (lastExecution === null) {
    // Si no hay fecha y hora guardadas, se puede ejecutar la función
    return true;
  } else {
    // Calcular el tiempo transcurrido desde la última ejecución
    const currentTime = new Date().getTime();
    const timeDiff = currentTime - parseInt(lastExecution);

    // Si ha pasado suficiente tiempo, se puede ejecutar la función
    const minTimeDiff = 24 * 60 * 60 * 1000; // 24 horas en milisegundos
    return timeDiff >= minTimeDiff;
  }
}
