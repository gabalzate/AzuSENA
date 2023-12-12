import *as THREE from '../public/librerias/three/three.js';
import { OrbitControls } from '../public/librerias/OrbitControls.js';
import { GLTFLoader } from '../public/librerias/GLTFLoader.js';
import { Cambiar } from './cambiar.js';
Cambiar(1);
let object;
let mixer;
let actions = [];
let currentAnimation, prevAnimation = null;
let objToRender = "path";
let repetir;
//crear camara, escena, y renderizado en la pantalla
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera();

//agregar el modelo 3d usando la libreria GLTFLoader
let contador = 0;

const gltfloader = new GLTFLoader();
gltfloader.load("../public/path/hablar3.glb", function(gltf){
    console.log(gltf); //permite ver las propiedades del objeto
    object = gltf.scene;
    scene.add(object);
    //la variable mixer permite agregar las diferentes animaciones
    mixer = new THREE.AnimationMixer(object);
    //para navegar entre las diferentes animaciones el metodo clip
    for(const clip of gltf.animations){
        let action_1 = mixer.clipAction(clip);
        actions.push(action_1);
    }
    if(actions.length > 0){
       
        currentAnimation = mixer.clipAction(actions[0].getClip());
        currentAnimation.loop = THREE.LoopRepeat;
        currentAnimation.clampWhenFinished = true;
        currentAnimation.repetitions = repetir;
     
        currentAnimation.reset();
        console.log("contador: ", repetir)
    }
},function(xhr){
    console.log((xhr.loaded / xhr.total * 100) + "% loaded"); //metodo para ver el proceso de carga del objeto
}, function(error){
    console.log(error); // metodo para ver si existe un error al cargar el objeto

});

function animar(index, repetir){
    prevAnimation = currentAnimation;
    currentAnimation = actions[index];
    currentAnimation.play();
    if(index >= 0 && index < actions.length){
        for(const action_1 of actions){
            action_1.stop();
        }
        const currentAnimation = actions[index];
        currentAnimation.reset();
        currentAnimation.play();
    }
    currentAnimation.repetitions = repetir; //numero de repeticiones
}

// function animar(index){
       
//     prevAnimation = currentAnimation;
//     currentAnimation = actions[index];
//     currentAnimation.play();
//     if(prevAnimation !== currentAnimation){
//         currentAnimation.fadeOut(0.5);
//         currentAnimation.reset();
//         prevAnimation.fadeIn(1);
//         prevAnimation.play();
//         prevAnimation.fadeOut(0.5);
//         currentAnimation.fadeIn(0.5);
//     }
//     currentAnimation.clampWhenFinished = true;
// }



//renderizado de la pantalla
const renderer = new THREE.WebGLRenderer({alpha: true, antialias: true});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 0.85;
renderer.setSize(window.innerWidth / 3.4, window.innerHeight /1.8, true);

//agregar modelo al contenedor
document.getElementById("container3D").appendChild(renderer.domElement);

//la variable camera permite ubicarse en un area frente al modelo

camera.position.z = 2.3;
camera.position.y = 0;
camera.position.x = -0.5;
//necesario para iluminar el modelo en varias direcciones

const topLight = new THREE.DirectionalLight(0xffffff, 1);
topLight.position.set(0, 0, 100);
topLight.castShadow = true;
scene.add(topLight);

const topLight_1 = new THREE.DirectionalLight(0xA7C7B7, 1);
topLight_1.position.set(-300, 300, -500);
topLight_1.castShadow = true;
scene.add(topLight_1);

const ambientLight = new THREE.AmbientLight(0x00000, objToRender ==="path" ? 5 : 1);
ambientLight.add(scene);

//la variable controls permite un evento en el mause que mueve el objeto

const controls = new OrbitControls(camera, renderer.domElement);
controls.minDistance = 2;
controls.maxDistance = 3;
controls.minPolarAngle = Math.PI / 2;
controls.maxPolarAngle = Math.PI / 2;
controls.maxAzimuthAngle = Math.PI / 4;
controls.minAzimuthAngle = Math.PI / -4;
controls.update();
//resize en pantalla, responsive
window.addEventListener("resize", onWindowResize, true);
function onWindowResize(){
    camera.aspect = container3D.clientWidth / container3D.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container3D.clientWidth, container3D.clientHeight);

}

//la funcion update permite que renderice la escena durante 1 segunado a 60 frames

function update(){
    requestAnimationFrame(update);
    if(mixer){
        mixer.update(0.02);   
        renderer.render(scene, camera);
        onWindowResize();      
    }
}
update();


const btnStart = document.getElementById('btnStart');
const btnStop = document.getElementById('btnStop');
const pdfViewer = document.getElementById('mipdf');
const textArea = document.getElementById('textArea');

// Obtén el elemento de video y el div de contenido.
const videoPlayer = document.getElementById('videoPlayer');
const contenidoDiv = document.getElementById('contenido');

// Variable mostrar (cambia su valor según sea necesario)
let mostrar = 0; // Cambia esto según tus necesidades

if (mostrar === 1) {
  // Si mostrar es igual a 1, muestra el div de contenido.
  contenidoDiv.style.display = 'block';

  // Escucha el evento loadedmetadata del video y luego inicia la reproducción.
  videoPlayer.addEventListener('loadedmetadata', function() {
    videoPlayer.play();
  });
} else {
  // Si mostrar no es igual a 1, oculta el div de contenido.
  contenidoDiv.style.display = 'none';
  // Puedes pausar el video si está reproduciéndose.
  videoPlayer.pause();
}


//lector de textos

let contenido_main = ''; // Inicialmente, no se muestra ningún contenido
// Función para mostrar el contenido en función de la variable contenido
function mostrarContenido() {
  const main = document.getElementById("main");
  main.innerHTML = ""; // Limpia el contenido anterior
  
  if (contenido_main === "listado") {
    // Agrega un listado de procesos administrativos en salud
    const procesosList = document.createElement("ul");
    const procesos = [
        "Admisiones",
        "Afiliaciones",
        "Facturación",
        "Atención al usuario",
        "Casos"
    ];
    procesos.forEach(proceso => {
      const procesoItem = document.createElement("li");
      procesoItem.textContent = proceso;
      
      // Establece el tamaño de letra y el color de texto
      procesoItem.style.fontSize =  "200%"; // Cambia el tamaño de letra según sea necesario
      procesoItem.style.color = "white"; // Cambia el color de texto según sea necesario
      
      procesosList.appendChild(procesoItem);
  });

  main.appendChild(procesosList);
} else if (contenido_main === "admisiones") {
  // Limpia el contenido anterior
  const main = document.getElementById("main");
  main.innerHTML = "";

  // Crea un párrafo para el texto
  const textoParrafo = document.createElement("p");

  // Agrega el texto
  textoParrafo.textContent = "Admisiones es el proceso de recibir y registrar a pacientes en una institución de atención médica, como un hospital, una clínica o un centro de salud. Es una parte crucial porque establece la primera relación entre el paciente y el proveedor de atención médica.";

  // Aplica estilos CSS para organizar el texto (puedes personalizar los estilos según tus necesidades)
  textoParrafo.style.fontSize = "200%"; // Tamaño de letra
  textoParrafo.style.color = "white"; // Color de texto
  textoParrafo.style.margin = "20px"; // Margen para separar del borde

  // Agrega el párrafo al cuadro main
  main.appendChild(textoParrafo);
} else if (contenido_main === "video") {
  // Limpia el contenido anterior
  const main = document.getElementById("main");
  main.innerHTML = "";

  // Crea un reproductor de video
  const videoElement = document.createElement("video");

  // Configura la ruta del video
  videoElement.src = "/public/video/inicio.mp4";

  //Establece el tamaño del video en porcentaje
  videoElement.style.width = "100%"; // El ancho ocupa el 100% del contenedor
  videoElement.style.height = "auto"; // El alto se ajusta automáticamente
  // Indica que el video debe reproducirse automáticamente
  videoElement.autoplay = true;
  // Agrega controles para el usuario (reproducir, pausar, etc.)
  videoElement.controls = true;

  // Aplica estilos CSS adicionales si es necesario
  videoElement.style.margin = "20px"; // Margen para separar del borde

  // Agrega el reproductor de video al cuadro main
  main.appendChild(videoElement);
} else if (contenido_main === "equipo") {
  // Limpia el contenido anterior
  const main = document.getElementById("main");
  main.innerHTML = "";

  // Crea un elemento de imagen
  const imgElement = document.createElement("img");

  // Configura la ruta de la imagen (reemplaza 'ruta_de_tu_imagen.png' con la ruta correcta)
  imgElement.src = '/public/imagenes/equipo.png';

  // Establece atributos opcionales, como ancho y alto (ajústalos según tus necesidades)
  imgElement.width = 600; // Ancho en píxeles
  imgElement.height = 450; // Alto en píxeles

  // Aplica estilos CSS adicionales si es necesario
  imgElement.style.margin = "20px"; // Margen para separar del borde

  // Agrega la imagen al cuadro main
  main.appendChild(imgElement);
} else if(contenido_main === "casos") {
  // Agrega un listado de procesos administrativos en salud
  const procesosList = document.createElement("ul");
  const procesos = [
      "Puedes seleccionar casos de:",
      "Urgencias",
      "Atención telefónica ",
      "Atención presencial",
      "Historia clínica",
      "Atención neonatal",
      "PQRSD"
  ];
  procesos.forEach(proceso => {
    const procesoItem = document.createElement("li");
    procesoItem.textContent = proceso;
    
    // Establece el tamaño de letra y el color de texto
    procesoItem.style.fontSize =  "500%"; // Cambia el tamaño de letra según sea necesario
    procesoItem.style.color = "white"; // Cambia el color de texto según sea necesario
    
    procesosList.appendChild(procesoItem);
});

main.appendChild(procesosList);
}  else if (contenido_main === "casoUrgencias") {
  // Limpia el contenido anterior
  const main = document.getElementById("main");
  main.innerHTML = "";

  // Crea un párrafo para el texto
  const textoParrafo = document.createElement("p");

  // Agrega el texto
  textoParrafo.textContent = "Usuario Felipe Monsalve llega a urgencias acercándose a admisiones para poder ser atendido. ¿Le solicitas documento de identidad o le pregunta qué le duele?";

  // Aplica estilos CSS para organizar el texto (puedes personalizar los estilos según tus necesidades)
  textoParrafo.style.fontSize = "200%"; // Tamaño de letra
  textoParrafo.style.color = "white"; // Color de texto
  textoParrafo.style.margin = "20px"; // Margen para separar del borde

  // Agrega el párrafo al cuadro main
  main.appendChild(textoParrafo);
} else if (contenido_main === "documentos") {
  // Agrega un listado de procesos administrativos en salud
  const procesosList = document.createElement("ul");
  const procesos = [
      "seleccione la ley que quieres conocer",
      "Ley 100 de 1993 SGSST",
      "Ley 1733 de 2014 cuidados paliativos",
      "ley 1164 de 2007 referente al talento humano en salud"
  ];
  procesos.forEach(proceso => {
    const procesoItem = document.createElement("li");
    procesoItem.textContent = proceso;
    
    // Establece el tamaño de letra y el color de texto
    procesoItem.style.fontSize =  "200%"; // Cambia el tamaño de letra según sea necesario
    procesoItem.style.color = "white"; // Cambia el color de texto según sea necesario
    
    procesosList.appendChild(procesoItem);
});

main.appendChild(procesosList);
}else if (contenido_main === "general") {
  // Agrega un listado de procesos administrativos en salud
  const procesosList = document.createElement("ul");
  const procesos = [
      "Este proyecto",
      "Ubicación de sennova",
      "Director regional",
      "Subdirector del centro",
      "Coordinación misional",
      "Dinamizador",
      "Programador",
      "Diseñador",
      "Robótica",
      "Administrador en la nube"
  ];
  procesos.forEach(proceso => {
    const procesoItem = document.createElement("li");
    procesoItem.textContent = proceso;
    
    // Establece el tamaño de letra y el color de texto
    procesoItem.style.fontSize =  "100%"; // Cambia el tamaño de letra según sea necesario
    procesoItem.style.color = "white"; 
    procesoItem.style.fontFamily = "Arial";// Cambia el color de texto según sea necesario
    procesoItem.style.fontStyle = "italic";
    procesoItem.style.marginLeft = "40px"
    procesosList.appendChild(procesoItem);
});
main.appendChild(procesosList);
} 
else if (contenido_main === "pdf") {
    // Agrega un visor de PDF u otro contenido PDF
    // Puedes personalizar esto según tus necesidades
    const pdfEmbed = document.createElement("embed");
    pdfEmbed.src = "/public/docs/Ley_1164_DE_2007.pdf";
    pdfEmbed.type = "application/pdf";
    pdfEmbed.width = "100%";
    pdfEmbed.height = "500px";
    main.appendChild(pdfEmbed);
} else if (contenido_main === "especifico") {
  // Agrega un visor de PDF u otro contenido PDF
  // Puedes personalizar esto según tus necesidades
  const pdfEmbed = document.createElement("embed");
  pdfEmbed.src = "/public/docs/Ley_1164_DE_2007_especifico.pdf";
  pdfEmbed.type = "application/pdf";
  pdfEmbed.width = "100%";
  pdfEmbed.height = "500px";
  main.appendChild(pdfEmbed);
}
}


const recognition = new webkitSpeechRecognition();
recognition.continuous = true;
recognition.lang = 'es-ES';
recognition.interimResult = false;

recognition.onresult = (event) => {   
  const texto = event.results[event.results.length - 1][0].transcript;
  textArea.value = texto;
  responderTexto(texto);  
  console.log("Valor de mostrar:", mostrar);
};

btnStart.addEventListener('click', () => {
  recognition.start();
  console.log("Valor de mostrar:", mostrar);
});
btnStop.addEventListener('click', () => {
  recognition.abort();
  console.log("Valor de mostrar:", mostrar);
});

const textContainer = document.querySelector('.contenedor-texto');
const pdfContainer = document.querySelector('.contenedor-pdf');
 
let pdfMapping = {
  1: 'Flujograma_Admision.pdf', // PDF diagrama de flujo = admisiones
  2: 'Flujograma_Afiliacion.pdf', // PDF diagrama de flujo = afiliaciones
  3: 'Flujograma_Facturacion.pdf', //PDF diagrama de flujo = facturacion
  4: 'Flujograma_Orientacion.pdf', //PDF diagrama de flujo = orientacion al usuario
  // Añadir más opciones según sea necesario
};
let cambiar;
let activo = 0;

console. log('activo esta en: ' + activo)
console.log('cambiar esta en: ' + cambiar)
console.log('contenido main esta en: ' + contenido_main)
function leerTexto(text) {

  const speech = new SpeechSynthesisUtterance(text);
  speech.volume = 1;
  speech.rate = 1;
  window.speechSynthesis.speak(speech);
}
function eliminarTildes(texto) {
  return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}
function iniciarReconocimiento() {
  recognition.start();
}
function detenerReconocimiento() {
  recognition.abort();
}

function responderTexto(texto) {
  animar(1, 100);
  if (activo === 0) { // inicio
    const oracion = eliminarTildes(texto.toLowerCase()); // Eliminar tildes y convertir el texto a minúsculas
    const inicio = ["hola azucena", "iniciar"];
    const inicio1 = ["que tal"];
    const proyecto = ["este proyecto"];
    const continuemos = ["si por favor", "si quiero"];
    const gracias =["muchas gracias"];
    const casos = ["casos"]; // activo = 1
    const afiliaciones = ["afiliaciones"]; // activo = 2
    const facturacion = ["facturacion"]; // activo = 3
    const admisiones = ["admisiones"]; // activo = 4
    const usuario = ["atencion al usuario"]; // activo = 5
    const pdf = ["mostrar pdf", "ver pdf"]; // activo = 6
    const gener = ["informacion general"]; // activo = 20
    const listar = ["documentacion","documentos"];
    const consultar = ["consultar documento"];    
    const adios = ["despedirse", "despidase","despidete", "chao", "adios"];
    const invitados = ["invitados"];
    const tecnoparque = ["tecnoparque"];
    const cristian = ["cristian", "programador"];
    const rafael = ["dinamizador"];
    const cordinacion = ["ana carolina","cordinadora misional","cordinacion de senova"];
    const regional = ["arturo medina","gerardo medina", "gerardo arturo", "director regional"];
    const diseño = ["diseñador", "ivan","ivancho","artista","diseño"];
    const pregunta1=["ubicado senova","ubicación de senova","encuentra senova"];
    const redis2 = ["director de la revista", "subdirector del centro","carlos salgar"];

    for (let i = 0; i < inicio.length; i++) {
      if (oracion.includes(inicio[i])) {
        animar(0, 2);
        Cambiar(1);
        const texto = 'Hola, soy Asucena una inteligencia artificial creada para brindar información acerca de los servicios administrativos del sector salud, ¿como puedo ayudarte, selecciona una de las siguientes opciónes? procesos de admisiones, facturación, afiliaciones, atención al usuario, PQR, casos reales o información general';
        leerTexto(texto);
        
      }
    }
    for (let i = 0; i < inicio1.length; i++) {
      if (oracion.includes(inicio1[i])) {
        animar(0, 1);
        const texto = 'Hola Cristian bienvenido de nuevo, Soy Azusena. Una IA disponible para tu aprendizaje constante. que te gustaría saber';
        leerTexto(texto);
      }    
    }   
    for (let i = 0; i < proyecto.length; i++) {
      if (oracion.includes(proyecto[i])) {
        animar(0, 2);
        const texto = 'soy una IA que permite interactuar con aprendices e instructores para fortalecer los procesos administrativos en salud. quieres saber que procesos administrativos se contemplan?';
        leerTexto(texto);
      }
    }     
    for (let i = 0; i < gener.length; i++) {
      if (oracion.includes(gener[i])) {
        animar(0, 6);
        Cambiar(2);
        console.log("cambiar titulo es = a 2");
        contenido_main = 'general';
        console.log("contenido main esta en: " + contenido_main)
        mostrarContenido();
        const texto = 'Con gusto. Seleccina una de las siguientes opciones información sobre este proyecto, ubicacion de senova, director regional, subdirector del centro , coordinacion misional, dinamizador, programador, diseñador, robotica, administrador en la nube. ¿cual quieres conocer?';
        leerTexto(texto);
        activo = 20;
        console. log('activo esta en: ' + activo)
      }
    } 
    for (let i = 0; i < continuemos.length; i++) {
      if (oracion.includes(continuemos[i])) {
       
        animar(0, 2);
        console. log('cambiar titulo es = a 2');
        contenido_main = 'listado';
        console.log('contenido main esta en: ' + contenido_main)
        mostrarContenido();
        const texto = 'los procesos administrativos en salud son: Admisiones, afiliaciones, facturación, atención al usuario y casos. ¿cuál quieres abordar?';
        leerTexto(texto);
      }
    }
    for (let i = 0; i < casos.length; i++) {
      if (oracion.includes(casos[i])) {
        animar(0, 2);
        Cambiar(1);
        const texto = 'Con gusto. Tengo casos de consulta externa telefónica, consulta externa presencial, consulta por urgencias, historia clinica, atencion neonatal y PQRSD. ¿cual quieres conocer?';
        leerTexto(texto);
        activo = 1;
        console. log('activo esta en: ' + activo)
      }
    }    
    for (let i = 0; i < facturacion.length; i++) {
      if (oracion.includes(facturacion[i])) {
        animar(0, 6);
        Cambiar(3)
        const main = document.getElementById("main");
        main.innerHTML = "";
        const facturacion = document.createElement("video");
        facturacion.src = "/public/video/facturacion.mp4";
        facturacion.style.width = "100%";
        facturacion.style.height = "auto";
        facturacion.autoplay = true;
        facturacion.controls = true;
        facturacion.style.margin = "20px";
        main.appendChild(facturacion);
        const texto = '¡Bienvenido al área de facturación!. puedo explicarte que es la facturacion o que hace el proceso de facturacion.';
        leerTexto(texto);
        activo = 3;
        console. log('activo esta en: ' + activo)
      }
    }
    for (let i = 0; i < admisiones.length; i++) {
      if (oracion.includes(admisiones[i])) {
        animar(0, 3);
        Cambiar(2);
        console. log('cambiar titulo es = a 2');
        contenido_main = 'admisiones';
        console.log('contenido main esta en: ' + contenido_main)
        mostrarContenido();
        const texto = 'Admisiones es el proceso de recibir y registrar a pacientes en una institución de atención médica, como un hospital, una clínica o un centro de salud y es una parte crucial porque establece la primera relación entre el paciente y el proveedor de atención médica. responde: es claro el concepto o no es claro el concepto';
        leerTexto(texto);

        activo = 4;
        console. log('activo esta en: ' + activo)
        
      }
    }
    for (let i = 0; i < usuario.length; i++) {
      if (oracion.includes(usuario[i])) {
        animar(0, 6);
        Cambiar(5);
        const main = document.getElementById("main");
        main.innerHTML = "";
        const usuario = document.createElement("video");
        usuario.src = "/public/video/o_U.mp4";
        usuario.style.width = "100%";
        usuario.style.height = "auto";
        usuario.autoplay = true;
        usuario.controls = true;
        usuario.style.margin = "20px";
        main.appendChild(usuario);
        const texto = 'La "atención al usuario en admisiones en el servicio de salud" se refiere a la gestión y atención que se brinda a los pacient1es y usuarios cuando ingresan a un servicio de salud, ya sea un hospital, clínica u otro establecimiento de atención médica. Este proceso es crucial para establecer una comunicación efectiva entre el personal de salud y los pacientes desde el momento en que llegan al centro de atención. para mas informacion pregunta: quien me puede ayudar o donde presento una queja';
        leerTexto(texto);
        activo = 5;
        console. log('activo esta en: ' + activo)
      }
    }
    for (let i = 0; i < afiliaciones.length; i++) {
      if (oracion.includes(afiliaciones[i])) {
        animar(0, 1);
        Cambiar(4);
        const main = document.getElementById("main");
        main.innerHTML = "";
        const afiliaciones = document.createElement("video");
        afiliaciones.src = "./public/video/afiliacion.mp4";
        afiliaciones.style.width = "100%";
        afiliaciones.style.height = "auto";
        afiliaciones.autoplay = true;
        afiliaciones.controls = true;
        afiliaciones.style.margin = "20px";
        main.appendChild(afiliaciones);
        
        const texto = 'En Colombia, el sistema de salud opera bajo el modelo de aseguramiento, donde las personas deben afiliarse a una Entidad Promotora de Salud (EPS) repite una de las opciones que quieras conocer: como afiliare o como desafiliarte';
        leerTexto(texto);
        activo = 2;
        console. log('activo esta en: ' + activo)
      }
    }
    for (let i = 0; i < listar.length; i++) {
      if (oracion.includes(listar[i])) {
        animar(0, 4);
      
        console. log('camb+-iar titulo es = a 2');
        contenido_main = 'documentos';
        console.log('contenido main esta en: ' + contenido_main)
        mostrarContenido();
        const texto = 'dentro de mi base de datos tengo PDF con información de ley 100 de 1993, ley 1733 de 2014. cuidados paliativos y ley 1164 de 2007 referente al talento humano en salud. si quieres conocer uno de los documentos puedes hacerlo con la palaba ¡consultar documento!'; 
        leerTexto(texto);
      }
    } 
    for (let i = 0; i < consultar.length; i++) {
      if (oracion.includes(consultar[i])) {
        animar(0, 2);
        const texto = '¿cual de los documentos quieres consultar: ley 100, ley 1733 o ley 1164?';
        leerTexto(texto);
        activo = 7;
        console. log('activo esta en: ' + activo)
      }
    }
    for (let i = 0; i < cristian.length; i++) {
      if (oracion.includes(cristian[i])) {
        const texto = 'Cristian Reinoso, es mi creador, es un programador e investigador experto del área de senova'; 
        leerTexto(texto);
      }
    }
    for (let i = 0; i < cordinacion.length; i++) {
      if (oracion.includes(cordinacion[i])) {
        const texto = 'Ana Carolina Feris Córdoba Coordinadora del Grupo de Formación Integral, Gestión Educativa y Promoción y Relaciones Corporativas'
        leerTexto(texto);
      }
    }
    for (let i = 0; i < regional.length; i++) {
      if (oracion.includes(regional[i])) {
         const texto = 'Gerardo Arturo Medina Rosas es el director de la regional distrito capital'
         leerTexto(texto);
      }
    }
    for (let i = 0; i < diseño.length; i++) {
      if (oracion.includes(diseño[i])) {
        const texto = 'Iván Darío García es el encargado del arte gráfico y un investigador experto de Senoba'
        leerTexto(texto);
      }
    }
    for (let i = 0; i < pregunta1.length; i++) {
      if (oracion.includes(pregunta1[i])) {
        const texto = 'Senoba se encuenta ubicado en el nivel 1, bajando por las escaleras cerca de la cafetería'
        leerTexto(texto);
      }
    }
    for (let i = 0; i < redis2.length; i++) {
      if (oracion.includes(redis2[i])) {
        const texto = 'Carlos Arturo Salgar Ramirez es el subdirector del centro de formacion de talento humano en salud y el director de la revista Reedis'
        leerTexto(texto);
      }
    }
    for (let i = 0; i < rafael.length; i++) {
      if (oracion.includes(rafael[i])) {
        const texto = 'Rafael Mesa Perez es el dinamisador Sennova y jefe del area de investigación'
        leerTexto(texto);
      }
    }    
    for (let i = 0; i < invitados.length; i++) {
      if (oracion.includes(invitados[i])) {
        animar(0, 1);
        const texto = '¡que bien!... y, quiénes son los invitados?';
        leerTexto(texto);
      }
    }
    for (let i = 0; i < tecnoparque.length; i++) {
      if (oracion.includes(tecnoparque[i])) {
        animar(0, 1);
        Cambiar(1);
        const texto = '¡maravilloso!... empecemos con la demostración entonces';
        leerTexto(texto);
      }
    }
    for (let i = 0; i < pdf.length; i++) {
      if (oracion.includes(pdf[i])) {
        animar(0, 1);
        const texto = '¿tengo varias opciones de pdf, si sabes cual quieres ver: nómbralo o si quieres pide un listado?';
        leerTexto(texto);
        activo = 6;
        console. log('activo esta en: ' + activo)
      }
    }
    for (let i = 0; i < gracias.length; i++) {
      if (oracion.includes(gracias[i])) {
    
        const texto = 'con gusto, ¿te puedo ayudar en algo más?';
      
        leerTexto(texto);
      }
    }
    for (let i = 0; i < adios.length; i++) {
      if (oracion.includes(adios[i])) {
        animar(0, 7);
        Cambiar(2);
        console. log('cambiar titulo es = a 2');
        contenido_main = 'equipo';
        console.log('contenido main esta en: ' + contenido_main)
        mostrarContenido();
        const texto = 'Gracias por confiar en mí para obtener información y asistencia. Si tienes más preguntas en el futuro, no dudes en volver. ¡Que tengas un excelente día! Adiós y hasta la próxima.';
        leerTexto(texto);
      }
    }
  }  
  if (activo === 1) { // casos
    const oracion = eliminarTildes(texto.toLowerCase()); // Eliminar tildes y convertir el texto a minúsculas
    const urgencia = ["urgencias"]; // activo = 11 
    const externa = ["telefonica"]; // activo = 12 
    const presencial = ["presencial"]; // activo = 13
    const clinica = ["historia clinica"]; // activo = 14 
    const neonata = ["neonatal","canguro"]; // activo = 15
    const pqr = ["pqr"]; // activo = 16 
    const tema = ["cambiar tema", "cambiar el tema","cambiemos de tema","cambiar de tema","volver a inicio","volver al inicio", "regresar a inicio","regresar al inicio"]; // activo = 0 

    for (let i = 0; i < urgencia.length; i++) {
      if (oracion.includes(urgencia[i])) {
        animar(0, 1);
        const texto = 'Bienvenido al área de  urgencias. puedes empezar con la palabra iniciar';
        leerTexto(texto);
        activo = 11;
        console. log('activo esta en: ' + activo)

      }
    }
    for (let i = 0; i < externa.length; i++) {
      if (oracion.includes(externa[i])) {
        const texto = 'Bienvenido al área de consulta externa. puedes empezar con la palabra iniciar';
        leerTexto(texto);
        activo = 12;
        console. log('activo esta en: ' + activo)        
      }
    }
    for (let i = 0; i < presencial.length; i++) {
      if (oracion.includes(presencial[i])) {
        animar(0, 1);
        const texto = 'Bienvenido al área de consulta externa presencial. puedes empezar con la palabra iniciar';
        leerTexto(texto);
        activo = 13;
        console. log('activo esta en: ' + activo)
      }
    }
    for (let i = 0; i < clinica.length; i++) {
      if (oracion.includes(clinica[i])) {
        const texto = 'Bienvenido al área de historia clinica. puedes empezar con la palabra iniciar';
        leerTexto(texto);
        activo = 14;
        console. log('activo esta en: ' + activo)
      }
    }
    for (let i = 0; i < neonata.length; i++) {
      if (oracion.includes(neonata[i])) {
        const texto = 'Bienvenido al área de consulta externa neonatal. puedes empezar con la palabra iniciar';
        leerTexto(texto);
        activo = 15;
        console. log('activo esta en: ' + activo)
      }
    }
    for (let i = 0; i < pqr.length; i++) {
      if (oracion.includes(pqr[i])) {
        const texto = '	¡¡Bienvenido al área de PQRSD!!. puedes empezar con la palabra iniciar';
        leerTexto(texto);
        activo = 16;
        console. log('activo esta en: ' + activo)
      }
    }
    for (let i = 0; i < tema.length; i++) {
      if (oracion.includes(tema[i])) {
        animar(0, 1);
        const texto = 'Bienvenido al inicio, ¿como puedo ayudarte, selecciona una de las siguientes opciónes? procesos de admisiones, facturación, afiliaciones, atención al usuario, PQR, casos reales o información general';
        leerTexto(texto);
        activo = 0;
        console. log('activo esta en: ' + activo)
      }
    }
  }  
  if (activo === 2) {0 //  afiliaciones
    const oracion = eliminarTildes(texto.toLowerCase()); // Eliminar tildes y convertir el texto a minúsculas
    const afiliar = ["afiliacion", "afiliarme"];
    const retirar = ["como desafiliarme", "como retirarme"];
    const caso = ["si quiero"];
    const gracia = ["gracias"];// activo = 0 
    const tema = ["cambiar tema", "cambiar el tema","cambiemos de tema","cambiar de tema","volver a inicio","volver al inicio", "regresar a inicio","regresar al inicio"]; // activo = 0 
  
    for (let i = 0; i < afiliar.length; i++) {
      if (oracion.includes(afiliar[i])) {
        animar(0, 1);
        const texto = 'En Colombia, el proceso de afiliación a una EPS (Entidad Promotora de Salud) sigue un conjunto de pasos específicos. A continuación, te proporciono una guía general para afiliarte a una EPS en Colombia: Elige una EPS, cumplir con los Requisitos de Afiliación, Solicitud de Afiliación, presentar la Documentación necesaria, Dependiendo del tipo de afiliación, podrías estar realizando un traslado desde otra EPS o una afiliación inicial, pagar de la Cuota de Afiliación, Espera la Aprobación, por último recibe tu Carnet de Afiliación o certificación en línea en donde indica tu estado de afiliación y la fecha de inicio del servicio; Por el momento estamos trabajando en la actualización de mi base de datos y no te puedo dar más información. Pero puedo remitirte a un caso real si lo deseas, responde si quiero casos o no gracias';
        leerTexto(texto);
      }
    }    
    for (let i = 0; i < retirar.length; i++) {
      if (oracion.includes(retirar[i])) {
        const texto = 'En Colombia, el proceso de des afiliación de una Entidad Promotora de Salud (EPS) puede variar según la situación y las circunstancias individuales. Aquí te proporciono una guía general sobre cómo podrías proceder, pero ten en cuenta que es fundamental consultar directamente con la EPS en cuestión para obtener información específica y asegurarte de seguir los procedimientos correctos. A continuación, algunos pasos generales que podrías seguir: Contacta a tu EPS, solicita Información y Documentación necesaria para el proceso, informa el Motivo de Des afiliación, presentación de una solicitud formal, Cancela deudas, las pendientes, espera el tiempo requerido por la EPS para recibir la confirmación del trámite, Si decides afiliarte a otra EPS, asegúrate de realizar el proceso de afiliación con la nueva entidad de salud. Por el momento estamos trabajando en la actualización de mi base de datos y no te puedo dar más información. Pero puedo remitirte a un caso real si lo deseas, responde si quiero casos o no gracias';
        leerTexto(texto);
      }
    }
    for (let i = 0; i < caso.length; i++) {
      if (oracion.includes(caso[i])) {
        const texto = 'Con gusto. Tengo casos de consulta externa telefónica, consulta externa presencial, consulta por urgencias, historia clinica, atencion neonatal y PQRSD. ¿cual quieres conocer?';
        leerTexto(texto);
        activo= 1;
      }
    }   
    for (let i = 0; i < gracia.length; i++) {
      if (oracion.includes(gracia[i])) {
        const texto = 'bienvenido al inicio ¿como puedo ayudarte, selecciona una de las siguientes opciónes? procesos de admisiones, facturación, afiliaciones, atención al usuario, PQR, casos reales o información general';
        leerTexto(texto);
        activo= 0;
      }
    }
    for (let i = 0; i < tema.length; i++) {
      if (oracion.includes(tema[i])) {
        animar(0, 1);
        const texto = 'Bienvenido al inicio, seleccione el nuevo tema';
        leerTexto(texto);
        activo = 0;
        console. log('activo esta en: ' + activo)
      }
    }    
  }
  if (activo === 3) { //  facturacion
    const oracion = eliminarTildes(texto.toLowerCase()); // Eliminar tildes y convertir el texto a minúsculas
    const facturar = ["como facturar"];
    const hace = ["que hace"];
    const caso = ["si quiero"];
    const tema = ["cambiar tema", "cambiar el tema","cambiemos de tema","cambiar de tema","volver a inicio","volver al inicio", "regresar a inicio","regresar al inicio"]; // activo = 0 
  
    for (let i = 0; i < facturar.length; i++) {
      if (oracion.includes(facturar[i])) {
        const texto = 'Es el proceso mediante el cual las EPS gestionan los cobros y pagos asociados a los servicios de salud brindados a sus afiliados. Por el momento estamos trabajando en la actualización de mi base de datos y no te puedo dar más información. Pero puedo remitirte a un caso real si lo deseas, responde si quiero casos o quiero saber que hace el proceso de facturación';
        leerTexto(texto);
        activo= 17;
      }
    }
    for (let i = 0; i < hace.length; i++) {
      if (oracion.includes(hace[i])) {
        const texto = ' Los proveedores de servicios de salud, como hospitales, clínicas, laboratorios, etc., envían facturas detalladas a la EPS por los servicios prestados a sus afiliados. Estas facturas incluyen información sobre los servicios, tarifas y cualquier otro cargo asociado, Las EPS procesan las facturas recibidas, verifican la información y determinan los pagos correspondientes a los proveedores de servicios de salud. Dependiendo de la póliza y las condiciones de afiliación, los afiliados pueden tener coberturas específicas y, en algunos casos, se les puede solicitar realizar copagos por ciertos servicios. Por el momento estamos trabajando en la actualización de mi base de datos y no te puedo dar más información. Pero puedo remitirte a un caso real si lo deseas, responde si quiero casos o regresar al inicio';
        leerTexto(texto);
        activo= 17;
      }
    }   
    for (let i = 0; i < caso.length; i++) {
      if (oracion.includes(caso[i])) {
        const texto = 'Con gusto. Tengo casos de consulta externa telefónica, consulta externa presencial, consulta por urgencias, historia clinica, atencion neonatal y PQRSD. ¿cual quieres conocer?';
        leerTexto(texto);
        activo= 1;
      }
    }  
    for (let i = 0; i < tema.length; i++) {
      if (oracion.includes(tema[i])) {
        const texto = 'Bienvenido al inicio, seleccione el nuevo tema';
        leerTexto(texto);
        activo = 0;
        console. log('activo esta en: ' + activo)
      }
    }
    
  }
  if (activo === 4) { //  admisiones
    const oracion = eliminarTildes(texto.toLowerCase()); // Eliminar tildes y convertir el texto a minúsculas
    const claro = ["si es claro", "si quedo claro","si es muy claro", "si quedo muy claro","asi esta bien"]; 
    const noclaro = ["no es claro", "no quedo claro","no es muy claro", "no quedo muy claro"]; 
    const conocerlos = ["si quiero", "si quisiera", "si me gustaria"];
    const ahora = ["por ahora"]; 
    const urgencia = ["urgencias"]; // activo = 11 
    const externa = ["telefonica"]; // activo = 12 
    const presencial = ["presencial"]; // activo = 13 
    const tema = ["cambiar tema", "cambiar el tema","cambiemos de tema","cambiar de tema","volver a inicio","volver al inicio", "regresar a inicio","regresar al inicio"]; // activo = 0 
      
    for (let i = 0; i < claro.length; i++) {
      if (oracion.includes(claro[i])) {
        animar(0, 2);
        const texto = 'reforcemos tus conocimientos mediante un caso hipotético. puedes seleccionar: urgencias, atención telefónica o atención presencial';        
        console. log('cambiar titulo es = 1  ');
        leerTexto(texto);
        activo = 1;
        console. log('activo = 0')
      }
    } 
    for (let i = 0; i < ahora.length; i++) {
      if (oracion.includes(ahora[i])) {
        const main = document.getElementById("main");
        main.innerHTML = "";
        animar(0, 5);
        console. log('cambiar titulo es = a 2');
        contenido_main = 'casos';
        console.log('contenido main esta en: ' + contenido_main)
        const texto = 'reforcemos tus conocimientos mediante un caso hipotético. puedes seleccionar: urgencias, atención telefónica o atención presencial';
        leerTexto(texto);
        activo = 1;
        console. log('activo = 0')
      }
    }
    for (let i = 0; i < noclaro.length; i++) {
      if (oracion.includes(noclaro[i])) {
        animar(0, 9);
        console. log('cambiar titulo es = a 2');
        contenido_main = 'video';
        console.log('contenido main esta en: ' + contenido_main)
        mostrarContenido();
        const texto = 'El proceso de admisiones en salud se trata de recibir a los pacientes de manera efectiva y eficiente, asegurando que se registren adecuadamente, se les proporcione el nivel adecuado de atención y se cumplan todos los requisitos administrativos y médicos necesarios. Este cuenta con varios pasos. Los cuales son: Registro del paciente, apertura o actualización de historia clínica, verificación de derechos, asignación de numero de registro, información sobre derechos del paciente, asignación de habitación o área de atención, entrevista inicial, firma de documentos y en algunos casos procedimientos de emergencia para una atención inmediata, luego que termine el video puedes saber más de cada uno de estos pasos. si quieres conocerlos solo di la palabra si quiero.';
        leerTexto(texto);
      }
    }
    for (let i = 0; i < conocerlos.length; i++) {
      if (oracion.includes(conocerlos[i])) {
        const texto = 'El personal de admisiones es encargado de: Registro de datos, asignación del área de atención o habitación, verificar la documentación, validación de derechos del usuario, identificación, asignación del personal de atención, proceso de facturación, comunicación, coordinación interna, seguimiento y actualización de datos. Si quieres conocer específicamente alguno de los pasos nómbralo o si prefieres te doy un listado nuevamente para que selecciones';
        leerTexto(texto);
      }
    }    
    for (let i = 0; i < urgencia.length; i++) {
      if (oracion.includes(urgencia[i])) {
        animar(0, 2);
        const texto = 'Bienvenido al área de  urgencias. puedes empezar con la palabra iniciar';
        leerTexto(texto);
        activo = 11;
        console. log('activo esta en: ' + activo)

      }
    }
    for (let i = 0; i < externa.length; i++) {
      if (oracion.includes(externa[i])) {
        const texto = 'Bienvenido al área de consulta externa. puedes empezar con la palabra iniciar';
        leerTexto(texto);
        activo = 12;
        console. log('activo esta en: ' + activo)        
      }
    }
    for (let i = 0; i < presencial.length; i++) {
      if (oracion.includes(presencial[i])) {
        const texto = 'Bienvenido al área de consulta externa presencial. puedes empezar con la palabra iniciar';
        leerTexto(texto);
        activo = 13;
        console. log('activo esta en: ' + activo)
      }
    }    
    for (let i = 0; i < inicio.length; i++) {
      if (oracion.includes(tema[i])) {
        animar(0, 1);
        Cambiar(1);
        const texto = 'Bienvenido al inicio, ¿como puedo ayudarte, selecciona una de las siguientes opciónes? procesos de admisiones, facturación, afiliaciones, atención al usuario, PQR, casos reales o información general';
        leerTexto(texto);
        activo = 0;
        console. log('activo esta en: ' + activo)
      }
    }
  }
  if (activo === 5) { //  atencion al usuario
    const oracion = eliminarTildes(texto.toLowerCase()); // Eliminar tildes y convertir el texto a minúsculas
    const ingreso = ["quien me puede ayudar"];
    const ubicacion = ["donde presento una queja"];
    const ayuda = ["quien me puede ayudar"];
    const queja = ["donde presento una queja"];
    const caso = ["si quiero"];
    const gracia = ["gracias"];// activo = 0 
    const tema = ["cambiar tema", "cambiar el tema","cambiemos de tema","cambiar de tema","volver a inicio","volver al inicio", "regresar a inicio","regresar al inicio"]; // activo = 0 
    
    for (let i = 0; i < ingreso.length; i++) {
      if (oracion.includes(ingreso[i])) {
        const texto = 'atencion al usuario se encarga de apoyarle';
        leerTexto(texto);
      }
    }
    for (let i = 0; i < ayuda.length; i++) {
      if (oracion.includes(ayuda[i])) {
        const texto = 'La "atención al usuario en admisiones en el servicio de salud" se refiere a la gestión y atención que se brinda a los pacientes y usuarios cuando ingresan a un servicio de salud, ya sea un hospital, clínica u otro establecimiento de atención médica. Este proceso es crucial para establecer una comunicación efectiva entre el personal de salud y los pacientes desde el momento en que llegan al centro de atención. por el momento estamos trabajando e la actualizacion de mi base de datos y no te puedo dar mas información. pero puedo remitirte a un caso real si lo deseas, responde si quiero casos o no gracias';
        activo(16);
        leerTexto(texto);
      }
    }
    for (let i = 0; i < queja.length; i++) {
      if (oracion.includes(queja[i])) {
        const texto = 'El personal encargado de recibir y gestionar los PQRS puede variar según la estructura organizativa del establecimiento de salud. Sin embargo, generalmente, los PQRS en admisiones pueden ser recibidos por: Personal de Atención al Usuario o Servicio al Cliente, Recepcionistas y Personal de Admisiones, Oficina de Calidad o Departamento de Gestión de la Calidad o Comités de Ética o Comités de Calidad. por el momento estamos trabajando e la actualizacion de mi base de datos y no te puedo dar mas información. pero puedo remitirte a un caso real si lo deseas, responde si quiero casos o no gracias';
        activo(16);
        leerTexto(texto);
      }
    }   
    for (let i = 0; i < caso.length; i++) {
      if (oracion.includes(caso[i])) {
        const texto = 'biembenido a casos, por favor mensione la palabra iniciar';
        leerTexto(texto);
      }
    }      
    for (let i = 0; i < ubicacion.length; i++) {
      if (oracion.includes(ubicacion[i])) {
        const texto = 'en la recepcionle pueden ayudar';
        leerTexto(texto);
      }
    }
    for (let i = 0; i < gracia.length; i++) {
      if (oracion.includes(gracia[i])) {
        animar(0, 1);
        const texto = 'bienvenido al inicio ¿como puedo ayudarte, selecciona una de las siguientes opciónes? procesos de admisiones, facturación, afiliaciones, atención al usuario, PQR, casos reales o información general';
        leerTexto(texto);
        activo= 0;
      }
    }
    for (let i = 0; i < tema.length; i++) {
      if (oracion.includes(tema[i])) {
        Cambiar(1);
        const texto = 'Bienvenido al inicio, seleccione el nuevo tema';
        leerTexto(texto);
        activo = 0;
        console. log('activo = 0')
      }
    }    
  }
  if (activo === 6) { // mostrar pdf
    const oracion = eliminarTildes(texto.toLowerCase()); // Eliminar tildes y convertir el texto a minúsculas
    const listado = ["listado"]; 
    const admision = ["admision"]; 
    const afiliacion = ["afiliacion"]; 
    const facturacion = ["facturacion"];
    const usuario = ["usuario"];
    const tema = ["cambiar tema", "cambiar el tema", "cambiemos de tema","cambiar de tema","volver a inicio","volver al inicio", "regresar a inicio","regresar al inicio"]; // activo = 0 

    for (let i = 0; i < listado.length; i++) {
      if (oracion.includes(listado[i])) {
        const texto = 'Aquí tienes un listado de los PDF disponibles: flujo gramas de admisión, afiliación, facturación y atención al usuario. ¿Cual deseas ver?';
        leerTexto(texto);
      }
    }
    for (let i = 0; i < admision.length; i++) {
      if (oracion.includes(admision[i])) {
          //pdfNumber = 1; // Asigna el número del PDF correspondiente
          //let pdfToShow = `./docs/${pdfMapping[pdfNumber]}`; // Genera la ruta del PDF según el número actual
          //contenido.src = pdfToShow; // Actualiza el iframe con el nuevo PDF
          contenido.style.display = 'block'; // Muestra el PDF

        //const texto = `Mostrando el PDF ${pdfMapping[pdfNumber]}...`;
       // leerTexto(texto);
      }
    }
    for (let i = 0; i < facturacion.length; i++) {
      if (oracion.includes(facturacion[i])) {
        pdfNumber = 2; // Asigna el número del PDF correspondiente
        let pdfToShow = `./docs/${pdfMapping[pdfNumber]}`; // Genera la ruta del PDF según el número actual
        pdfViewer.src = pdfToShow; // Actualiza el iframe con el nuevo PDF
        pdfViewer.style.display = 'block'; // Muestra el PDF

      const texto = `Mostrando el PDF ${pdfMapping[pdfNumber]}...`;
      leerTexto(texto);      
      }
    }
    for (let i = 0; i < afiliacion.length; i++) {
      if (oracion.includes(afiliacion[i])) {
        pdfNumber = 3; // Asigna el número del PDF correspondiente
        let pdfToShow = `./docs/${pdfMapping[pdfNumber]}`; // Genera la ruta del PDF según el número actual
        pdfViewer.src = pdfToShow; // Actualiza el iframe con el nuevo PDF
        pdfViewer.style.display = 'block'; // Muestra el PDF

      const texto = `Mostrando el PDF ${pdfMapping[pdfNumber]}...`;
      leerTexto(texto);      
      }
    }
    for (let i = 0; i < usuario.length; i++) {
      if (oracion.includes(usuario[i])) {
        pdfNumber = 4; // Asigna el número del PDF correspondiente
        let pdfToShow = `./docs/${pdfMapping[pdfNumber]}`; // Genera la ruta del PDF según el número actual
        pdfViewer.src = pdfToShow; // Actualiza el iframe con el nuevo PDF
        pdfViewer.style.display = 'block'; // Muestra el PDF

      const texto = `Mostrando el PDF ${pdfMapping[pdfNumber]}...`;
      leerTexto(texto);      
      }
    }
    for (let i = 0; i < tema.length; i++) {
      if (oracion.includes(tema[i])) {
        const texto = 'Bienvenido al inicio, seleccione el nuevo tema';
      pdfViewer.style.display = 'none'; // Oculta el PDF
        leerTexto(texto);
        activo = 0;
        console. log('activo = 0')
      }
    }
  }  
  if (activo === 7) { // mostrar pdf
    const oracion = eliminarTildes(texto.toLowerCase()); // Eliminar tildes y convertir el texto a minúsculas
    const primera = ["ley 100", "ley cien"]; 
    const segunda = ["ley 1733","cuidados paleativos" ]; 
    const tercera = ["ley 1164", "talento humano en salud"]; 
    const importancia = ["importancia"]; 
    const plantea = ["relacionada","relacionado"]; 
    const gracias = ["muchas gracias"]; 
    const tema = ["cambiar tema", "cambiar el tema","cambiemos de tema","cambiar de tema","volver a inicio","volver al inicio", "regresar a inicio","regresar al inicio"]; // activo = 0 

    for (let i = 0; i < primera.length; i++) {
      if (oracion.includes(primera[i])) {
        const texto = 'mostrando PDF de ley 100 de 1993';
        leerTexto(texto);
      }
    }
    for (let i = 0; i < segunda.length; i++) {
      if (oracion.includes(segunda[i])) {
        const texto = 'mostrando PDF de ley 1733 de 2014';
        leerTexto(texto);
      }
    }
    for (let i = 0; i < tercera.length; i++) {
      if (oracion.includes(tercera[i])) {
        animar(0, 1);
        console. log('cambiar titulo es = a 2');
        contenido_main = 'pdf';
        Cambiar(2);
        console.log('contenido main esta en: ' + contenido_main)
        mostrarContenido();
        const texto = 'con gusto, aquí está un pdf con la ley 1164 de 2007';
        leerTexto(texto);
      }
    }
    for (let i = 0; i < importancia.length; i++) {
      if (oracion.includes(importancia[i])) {
        animar(0, 3);
        const texto = 'toda la norma se relaciona con el talento humano en salud, desde la planeación formación, vigilancia, control y desempeño y define unos principios con los que se rige el Talento Humano en el área de la salud';
        leerTexto(texto);
      }
    }
    for (let i = 0; i < plantea.length; i++) {
      if (oracion.includes(plantea[i])) {
        
        console. log('cambiar titulo es = a 2');
        contenido_main = 'especifico';
        console.log('contenido main esta en: ' + contenido_main)
        mostrarContenido();
        const texto = 'por supuesto, cada uno de los principios establecidos en la norma, equidad, solidaridad, calidad, ética, integridad, concertación, unidad y efectividad.  Allí se plantea la necesidad de formar talento humano competente para la prestación de servicios del sector salud.  por ejemplo: el principio de Equidad: manifiesta que la formación y el desempeño del Talento  Humano  en Salud debe orientarse a proveer servicios de salud  igual para todos los habitantes... Si quieres profundizar en el tema, té invito a consultar la norma';
        leerTexto(texto);
      }
    }
    for (let i = 0; i < gracias.length; i++) {
      if (oracion.includes(gracias[i])) {
        animar(0, 1);
        console. log('cambiar titulo es = 1');
        const texto = 'Fue un placer, ¿te puedo ayudar en algo más?';        
        leerTexto(texto);
        activo = 0;
        console. log('activo esta en: ' + activo)
      }
    }
    for (let i = 0; i < tema.length; i++) {
      if (oracion.includes(tema[i])) {
        const texto = 'Bienvenido al inicio, seleccione el nuevo tema';
        leerTexto(texto);
        activo = 0;
        console. log('activo esta en: ' + activo)
      }
    }
  }
  if (activo === 20) { //  informacion general
    const oracion = eliminarTildes(texto.toLowerCase()); // Eliminar tildes y convertir el texto a minúsculas
    const proyecto = ["este proyecto"];
    const continuemos = ["si por favor", "si quiero"];
    const invitados = ["invitados"];
    const aprendi = ["aprendices", "instructores"];
    const cristian = ["cristian", "programador"];
    const rafael = ["dinamizador"];
    const cordinacion = ["ana carolina","cordinadora misional","cordinacion de senova"];
    const regional = ["arturo medina","gerardo medina", "gerardo arturo", "director regional"];
    const diseño = ["diseñador", "ivan","ivancho","artista","diseño"];
    const ubicacion=["ubicado senova","ubicación de senova","encuentra senova"];
    const subdirec = ["director de la revista", "subdirector del centro","carlos salgar"];
    const robot=["robotica"];
    const ingeni = ["administrador en la nube"];
    const gracia = ["gracias"];
    const tema = ["cambiar tema", "cambiar el tema","cambiemos de tema","cambiar de tema","volver a inicio","volver al inicio", "regresar a inicio","regresar al inicio"]; // activo = 0 
    

    for (let i = 0; i < ubicacion.length; i++) {
      if (oracion.includes(ubicacion[i])) {
        const texto = 'en la recepcionle pueden ayudar';
        leerTexto(texto);
      }
    }
    for (let i = 0; i < cristian.length; i++) {
      if (oracion.includes(cristian[i])) {
        const texto = 'Cristian Reinoso, es mi creador, es un programador e investigador experto del área de senova'; 
        leerTexto(texto);
      }
    }
    for (let i = 0; i < cordinacion.length; i++) {
      if (oracion.includes(cordinacion[i])) {
        const texto = 'Ana Carolina Feris Córdoba Coordinadora del Grupo de Formación Integral, Gestión Educativa y Promoción y Relaciones Corporativas'
        leerTexto(texto);
      }
    }
    for (let i = 0; i < regional.length; i++) {
      if (oracion.includes(regional[i])) {
         const texto = 'Gerardo Arturo Medina Rosas es el director de la regional distrito capital'
         leerTexto(texto);
      }
    }
    for (let i = 0; i < diseño.length; i++) {
      if (oracion.includes(diseño[i])) {
        const texto = 'Iván Darío García es el encargado del arte gráfico y un investigador experto de Senoba'
        leerTexto(texto);
      }
    }
    for (let i = 0; i < proyecto.length; i++) {
      if (oracion.includes(proyecto[i])) {
        animar(0, 1);
        const texto = 'soy una IA que permite interactuar con aprendices e instructores para fortalecer los procesos administrativos en salud. ¿quieres saber que procesos administrativos se contemplan?, responde si quiero o no gracias';
        leerTexto(texto);
      }
    }  
    for (let i = 0; i < proyecto.length; i++) {
      if (oracion.includes(proyecto[i])) {
        animar(0, 1);
        const texto = 'soy una IA que permite interactuar con aprendices e instructores para fortalecer los procesos administrativos en salud. ¿quieres saber que procesos administrativos se contemplan?, responde si quiero o no gracias';
        activo(0);
        leerTexto(texto);
      }
    }  
    for (let i = 0; i < continuemos.length; i++) {
      if (oracion.includes(continuemos[i])) {
        Cambiarsubtitulo(2);
        animar(0, 1);
        console. log('cambiar titulo es = a 2');
        contenido_main = 'listado';
        console.log('contenido main esta en: ' + contenido_main)
        mostrarContenido();
        const texto = 'los procesos administrativos en salud son: Admisiones, afiliaciones, facturación, atención al usuario y casos. ¿cuál quieres abordar?';
        leerTexto(texto);
      }
    }   
    for (let i = 0; i < subdirec.length; i++) {
      if (oracion.includes(subdirec[i])) {
        const texto = 'Carlos Arturo Salgar Ramirez es el subdirector del centro de formacion de talento humano en salud y el director de la revista Reedis'
        leerTexto(texto);
      }
    }
    for (let i = 0; i < rafael.length; i++) {
      if (oracion.includes(rafael[i])) {
        const texto = 'Rafael Mesa Perez es el dinamisador Sennova y jefe del area de investigación'
        leerTexto(texto);
      }
    }
    for (let i = 0; i < robot.length; i++) {
      if (oracion.includes(robot[i])) {
        const texto = 'Yadir Leal es un aprendíz de mecatrónica que se encarga de mi programación en la parte visual y robotica para permitir que me pueda mover'
        leerTexto(texto);
      }
    }
    for (let i = 0; i < ingeni.length; i++) {
      if (oracion.includes(ingeni[i])) {
        animar(0, 2);
        const texto = 'Gabriel Alzate es un investigador Senova experto en mi base de datos en la nube'
        leerTexto(texto);
      }
    }
    for (let i = 0; i < invitados.length; i++) {
      if (oracion.includes(invitados[i])) {
        animar(0, 1);
        const texto = '¡que bien!... y, quiénes son los invitados?';
        leerTexto(texto);
      }
    }for (let i = 0; i < aprendi.length; i++) {
      if (oracion.includes(aprendi[i])) {
        animar(0, 1);
        Cambiar(1);
        const texto = '¡maravilloso!... empecemos con la demostración entonces';
        leerTexto(texto);
      }
    }
    for (let i = 0; i < gracia.length; i++) {
      if (oracion.includes(gracia[i])) {
        const texto = 'biembenido al inicio, ¿como puedo ayudarte, selecciona una de las siguientes opciónes? procesos de admisiones, facturación, afiliaciones, atención al usuario, PQR, casos reales o información general';
        leerTexto(texto);
      }
    }
    for (let i = 0; i < tema.length; i++) {
      if (oracion.includes(tema[i])) {
        const texto = 'Bienvenido al inicio, seleccione el nuevo tema';
        leerTexto(texto);
        activo = 0;
        console. log('activo = 0')
      }
    }
  }
  if (activo === 11) { // consulta por urgencias 
    const oracion = eliminarTildes(texto.toLowerCase()); // Eliminar tildes y convertir el texto a minúsculas
    const iniciar = ["iniciar"]; 
    const documento = ["documento de identidad", "identificacion","cedula"]; 
    const dolor = ["tiene", "duele"];  
    const reinicio = ["reiniciar", "reinicio"];
    const ambos = ["ambos"];
    const eps = ["eps", "adres", "address"];
    const opcion1 = ["espere en sala", "espere en la sala"];
    const nose = ["no se"];
    const tema = ['cambiar tema', 'cambiar el tema', "cambiemos de tema","cambiar de tema","volver a inicio","volver al inicio", "regresar a inicio","regresar al inicio"];

    for (let i = 0; i < iniciar.length; i++) {
      if (oracion.includes(iniciar[i])) {
        animar(0, 2);
        console. log('cambiar titulo es = a 2');
        contenido_main = 'casoUrgencias';
        console.log('contenido main esta en: ' + contenido_main)
        mostrarContenido();
        const texto = 'Usuario Felipe Monsalve llega a urgencias acercándose a admisiones para poder ser atendido. ¿Le solicitas documento de identidad o le pregunta qué le duele?';
        leerTexto(texto);
      }
    }
    for (let i = 0; i < documento.length; i++) {
      if (oracion.includes(documento[i])) {
        animar(0, 4);
        console. log('cambiar titulo es = a 2');
        const texto = '¡perfecto!. Sin importar la dolencia o urgencia del usuario es indispensable realizar un registro y validación que se debe realizar con el documento de identificación. en donde debe validar al usuario: ¿en la EPS, en la plataforma adres, o en ambos? ';
        leerTexto(texto);    
      }
    }
    for (let i = 0; i < ambos.length; i++) {
      if (oracion.includes(ambos[i])) {
        animar(0, 3);
        const texto = '¡Sigamos!. Para brindar servicios al usuario se debe realizar ambas validaciones.... El usuario Felipe Monsalve se encuentra activo en el sistema, ahora responde si o no: ¿el usuario tiene cita activa en sistema?';
        leerTexto(texto);    
      }
    }
    for (let i = 0; i < opcion1.length; i++) {
      if (oracion.includes(opcion1[i])) {
        const texto = 'el doctor realiza llamado a usuario al consultorio y procede a realizar todos los procesos asistenciales. como estoy aprendiendo este caso esta en construcción y no tengo más datos, regresaremos al inicio';
        leerTexto(texto);  
        activo = 0;
        console. log('activo esta en: ' + activo)
      }
    }
    for (let i = 0; i < eps.length; i++) {
      if (oracion.includes(eps[i])) {
        const texto = 'estas cerca pero rectifica tu respuesta y vuelve a seleccionar, porque las dos validaciones son importantes, entonces ¿Validas el usuario en sistema de la EPS, en la plataforma adres o ambos?.';
        leerTexto(texto);
      }
    }
    for (let i = 0; i < dolor.length; i++) {
      if (oracion.includes(dolor[i])) {
        animar(0, 3);
        const texto = '¡eso es incorrecto!. la persona de admisiones no es un médico u enfermero para diagnosticar a un usuario, su trabajo es: realizar el registro y verificar derechos del usuario. intenta de nuevo. ¿Le solicitas documento de identidad o le pregunta que tiene?';
        leerTexto(texto);
      }
    }
    for (let i = 0; i < nose.length; i++) {
      if (oracion.includes(nose[i])) {
        const texto = 'debes prepararte un poco mas, yo puedo guiarte con tus conocimientos pero el aprendizaje depende de tí. vamos a enpezar de nuevo';
        leerTexto(texto);
        activo = 0;
        console. log('activo esta en: ' + activo)
      }
    }
    for (let i = 0; i < tema.length; i++) {
      if (oracion.includes(tema[i])) {
        animar(0, 1);
        const texto = 'Bienvenido al inicio, seleccione el nuevo tema';
        leerTexto(texto);
        activo = 0;
        console. log('activo esta en: ' + activo)
      }
    }
  }
  if (activo === 12) { // consulta externa telefonica
    const oracion = eliminarTildes(texto.toLowerCase()); // Eliminar tildes y convertir el texto a minúsculas
    const iniciar = ["iniciar", "inicio"]; 
    const documento = ["documento de identidad", "identificacion","cédula"]; 
    const dinero = ["cuota moderadora", "dinero"];  
    const casos = ["casos"];
    const ambos = ["ambos", "los dos sistemas"];
    const eps = ["eps", "adres", "address"];
    const subsidiado = ["subsidiado"];
    const no = ["no"];
    const gobierno = ["el gobierno","el estado"];
    const nose = ["no se"];
    const tema = ["cambiar tema", "cambiar el tema","cambiemos de tema","cambiar de tema","volver a inicio","volver al inicio", "regresar a inicio","regresar al inicio"];
    
    for (let i = 0; i < iniciar.length; i++) {
      if (oracion.includes(iniciar[i])) {
        const texto = 'Un usuario se comunica vía Telefónica, Plataforma o WhatsApp con el área de Admisiones de la EPS para pedir una cita: ¿qué es lo primero que usted debe solicitar: cuota moderadora o documento de identidad?';
        leerTexto(texto);
      }
    }
    for (let i = 0; i < documento.length; i++) {
      if (oracion.includes(documento[i])) {
        const texto = '¡Muy bien!!.la solicitud del documento es importante para validar si el usuario está registrado. ahora ¿Validas el usuario en sistema de la EPS, en la plataforma adres o ambos?.';
        leerTexto(texto);    
      }
    }
    for (let i = 0; i < ambos.length; i++) {
      if (oracion.includes(ambos[i])) {
        const texto = '¡Muy bien! Para brindar servicios al usuario se debe realizar ambas validaciones.... El usuario Felipe Monsalve si se encuentra afiliado, ahora responde ¿el usuario está afiliado como usuario subsidiado o contributivo?';
        leerTexto(texto);    
      }
    }
    for (let i = 0; i < subsidiado.length; i++) {
      if (oracion.includes(subsidiado[i])) {
        const texto = '¡Muy bien!!. Si encontraste que está afiliado como subsidiado ¿quien se encarga de pagar los gastos de este usuario?';
        leerTexto(texto);    
      }
    }
    for (let i = 0; i < gobierno.length; i++) {
      if (oracion.includes(gobierno[i])) {
        const texto = 'vamos por buen camino... es importante conocer esto porque así se sabrá a qué servicios puede acceder el usuario quien cubre este servicio, haz respondido muy bien en caso, ahora puedes seleccionar otro caso con la palabra casos o regresar al inicio con la palabra cambiar tema';
        leerTexto(texto);  
        activo = 1;
        console. log('activo esta en: ' + activo)
      }
    }
    for (let i = 0; i < no.length; i++) {
      if (oracion.includes(no[i])) {
        const texto = 'Eso no es correcto, vuelve a intentar. responde si o no: ¿debes validar si está afiliado como usuario subsidiado o contributivo?';
        leerTexto(texto);    
      }
    }
    for (let i = 0; i < eps.length; i++) {
      if (oracion.includes(eps[i])) {
        const texto = 'estas cerca pero rectifica tu respuesta y vuelve a seleccionar, porque las dos validaciones son importantes, entonces ¿Validas el usuario en sistema de la EPS, en la plataforma adres o ambos?.';
        leerTexto(texto);
      }
    }
    for (let i = 0; i < dinero.length; i++) {
      if (oracion.includes(dinero[i])) {
        const texto = '¡lo siento!. Rectifica tu respuesta y vuelve a seleccionar, porque hay que hacer registro del usuario y para eso no es necesario solicitar dinero o cuotas moderadoras, entonces ¿qué es lo primero que usted debe solicitar?';
        leerTexto(texto);
      }
    }
    for (let i = 0; i < nose.length; i++) {
      if (oracion.includes(nose[i])) {
        const texto = 'debes prepararte un poco mas, yo puedo guiarte con tus conocimientos pero el aprendizaje depende de tí. vamos a enpezar de nuevo';
        leerTexto(texto);
        activo = 0;
        console. log('activo esta en: ' + activo)
      }
    }
    for (let i = 0; i < casos.length; i++) {
      if (oracion.includes(casos[i])) {
        const texto = 'puedes seleccionar una de las opciones, telefonico, urgencias o presencial';
        leerTexto(texto);
        activo = 1;
        console. log('activo esta en: ' + activo)
      }
    }
    for (let i = 0; i < tema.length; i++) {
      if (oracion.includes(tema[i])) {
        const texto = 'Bienvenido al inicio, seleccione el nuevo tema';
        leerTexto(texto);
        activo = 0;
        console. log('activo esta en: ' + activo)
      }
    }
  } 
  if (activo === 13) { // consulta externa presencial
    const oracion = eliminarTildes(texto.toLowerCase()); // Eliminar tildes y convertir el texto a minúsculas
    const iniciar = ["iniciar", "inicio"]; 
    const documento = ["documento de identidad", "identificacion","cedula"]; 
    const dinero = ["cuota moderadora"];  
    const ambos = ["ambos"];
    const eps = ["eps", "adres", "address"];
    const si = ["si"];
    const no = ["no"];
    const opcion1 = ["espere en sala", "espere en la sala"];
    const nose = ["no se"];
    const tema = ['cambiar tema',"cambiar el tema","cambiemos de tema","cambiar de tema","volver a inicio","volver al inicio", "regresar a inicio","regresar al inicio"];

    for (let i = 0; i < iniciar.length; i++) {
      if (oracion.includes(iniciar[i])) {
        const texto = 'El usuario ingresa en admisiones de consulta externa para ser atendido en la cita que solicito anteriormente con funcionario de admisiones. ¿Le solicitas documento de identidad o cuota moderadora?';
        leerTexto(texto);
      }
    }
    for (let i = 0; i < documento.length; i++) {
      if (oracion.includes(documento[i])) {
        const texto = '¡Muy bien!!.la solicitud del documento es importante para validar si el usuario está registrado. ahora ¿Validas el usuario en sistema de la EPS, en la plataforma adres o ambos?. ';
        leerTexto(texto);    
      }
    }
    for (let i = 0; i < ambos.length; i++) {
      if (oracion.includes(ambos[i])) {
        const texto = '¡Sigamos!. Para brindar servicios al usuario se debe realizar ambas validaciones.... El usuario Felipe Monsalve se encuentra activo en el sistema, ahora responde si o no: ¿el usuario tiene cita activa en sistema?';
        leerTexto(texto);    
      }
    }
    for (let i = 0; i < si.length; i++) {
      if (oracion.includes(si[i])) {
        const texto = '¡Muy bien!. En este momento activa la cita, anúncialo y pídele que espere en sala mientras lo llama el profesional.';
        leerTexto(texto);    
      }
    }
    for (let i = 0; i < opcion1.length; i++) {
      if (oracion.includes(opcion1[i])) {
        const texto = 'el doctor realiza llamado a usuario al consultorio y procede a realizar todos los procesos asistenciales, el doctor remite interconsulta a urgencias al usuario por posible sospecha de apendicitis entregando ordenes medicas e historia clínica y el usuario se traslada a urgencias. En este caso ya termina el proceso de admisionpor consulta externa, puedes seleccionar otro caso, puede ser consulta externa telefónica o consulta por urgencias. También puedes seleccionar cambiar de tema';
        leerTexto(texto);  
        activo = 1;
        console. log('activo esta en: ' + activo)
      }
    }
    for (let i = 0; i < no.length; i++) {
      if (oracion.includes(no[i])) {
        const texto = 'digita correctamente los datos del usuario y confirme nuevamente. ¿Evidencias que la cita médica está activa en sistema?';
        leerTexto(texto);    
      }
    }
    for (let i = 0; i < eps.length; i++) {
      if (oracion.includes(eps[i])) {
        const texto = 'estas cerca pero rectifica tu respuesta y vuelve a seleccionar, porque las dos validaciones son importantes, entonces ¿Validas el usuario en sistema de la EPS, en la plataforma adres o ambos?.';
        leerTexto(texto);
      }
    }
    for (let i = 0; i < dinero.length; i++) {
      if (oracion.includes(dinero[i])) {
        const texto = '¡lo siento!. Rectifica tu respuesta y vuelve a seleccionar, porque hay que hacer registro del usuario y para eso no es necesario solicitar dinero o cuotas moderadoras, entonces ¿qué es lo primero que usted debe solicitar?';
        leerTexto(texto);
      }
    }
    for (let i = 0; i < nose.length; i++) {
      if (oracion.includes(nose[i])) {
        const texto = 'debes prepararte un poco mas, yo puedo guiarte con tus conocimientos pero el aprendizaje depende de tí. vamos a enpezar de nuevo';
        leerTexto(texto);
        activo = 0;
        console. log('activo esta en: ' + activo)
      }
    }
    for (let i = 0; i < tema.length; i++) {
      if (oracion.includes(tema[i])) {
        const texto = 'Bienvenido al inicio, seleccione el nuevo tema';
        leerTexto(texto);
        activo = 0;
        console. log('activo esta en: ' + activo)
      }
    }
  }
  if (activo === 14) { // historia clinica
    //esta es la historia clinica
        const oracion = eliminarTildes(texto.toLowerCase()); // Eliminar tildes y convertir el texto a minúsculas
        const iniciar = ["iniciar", "inicio"]; 
        const apertura = ["abir historia", "apertura de historia"];     
        const pasar = ["hacerlo pasar", "que pase", "que siga", "medico"];  
        const siconozco = ["si la conozco"];
        const noconozco = ["no la conozco"];
        const nose = ["no se", "fecha de naciemiento"];
        const sitengo = ["si tengo conocimiento"];
        const notengo = ["no tengo conocimiento", "espacios en blanco"];
        const borrar = ["borrar"];
        const registro = ["nuevo registro"];
        const identifica = ["identificar", "ingresar"];
        const ambos = ["ambos","los dos"];
        const revisa = ["documentacion","revisar"];
        const remite = ["remitir","remitirlo"];
        const nombre = ["aleatorio"];
        const desconocido = ["nomen","nescio"];
        const adres = ["adres","eps"];
        const juntos = ["las dos",];
        const paga = ["pago", "dinero"];
        const poliza = ["poliza"];
        const tema = ["cambiar tema", "cambiar el tema","cambiemos de tema","cambiar de tema","volver a inicio","volver al inicio", "regresar a inicio","regresar al inicio"];
        
        for (let i = 0; i < iniciar.length; i++) {
          if (oracion.includes(iniciar[i])) {
            const texto = 'El usuario se acerca al Prestador de Servicios de Salud para acudir a la cita médica, el funcionario le solicita el tipo y número de documento de identidad para verificar si reposa historia clínica en el archivo de gestión de la prestadora de servicios de salud. Este usuario es atendido por primera vez, que se debe hacer: ¿apertura de historia clínica o hacerlo pasar con el médico pra que lo haga él?'    
            leerTexto(texto);
          }
        }
        for (let i = 0; i < apertura.length; i++) {
          if (oracion.includes(apertura[i])) {
            const texto = 'Una historia clínica se abre con el propósito principal de documentar y mantener un registro completo y organizado de la información médica y de salud de un paciente a lo largo del tiempo. Esta información es esencial para proporcionar atención médica de alta calidad y segura. ¿Conoces la información que se registra en una historia clínica?  Responde si la conozco o no la conozco';
            leerTexto(texto);    
          }
        }
        for (let i = 0; i < pasar.length; i++) {
          if (oracion.includes(pasar[i])) {
            const texto = '¡lo siento eso es incorrecto! Para brindar servicios al usuario por primera vez se debe abrir una historia clínica. intenta de nuevo, se debe abrir historia clínica o hacer pasar con el medico?';
            leerTexto(texto);    
          }
        }
        for (let i = 0; i < siconozco.length; i++) {
          if (oracion.includes(siconozco[i])) {
            const texto = '¡Perfecto! Para asegurarme de ello voy a listar la información y me dirás cual hace falta, los datos que se requieren son: tipo y número de identificación, apellidos y nombres completos, Estado civil, Edad, Sexo, Ocupación, dirección, teléfono, lugar de residencia, Aseguradora o EPS y el Tipo de vinculación Cotizante, beneficiario o vinculado si aciertas podremos seguir, si no, solo di no la conozco';
            leerTexto(texto);    
          }
        }
        for (let i = 0; i < noconozco.length; i++) {
          if (oracion.includes(noconozco[i])) {
            const texto = 'Se deben tener en cuenta los siguientes datos tipo y número de identificación, apellidos y nombres completos, Estado civil, fecha de nacimiento, Edad, Sexo, Ocupación, dirección, teléfono, lugar de residencia, Aseguradora o EPS y el Tipo de vinculación Cotizante, beneficiario o vinculado. El usuario viene con un acompañante ¿sabes que datos se deben solicitar? Responde: si sé o no sé';
            leerTexto(texto);  
          }
        }
        for (let i = 0; i < nose.length; i++) {
          if (oracion.includes(nose[i])) {
            const texto = 'Los datos que se deben solicitar son Nombre completo del acompañante, Teléfono, Parentesco de la persona, Grado de consanguinidad, de afinidad o civil. tienes conocimiento de ¿cuáles son los aspectos claves a tener en cuenta para diligenciar la historia clínica? Responde Si tengo conocimiento o no tengo conocimiento';
            leerTexto(texto);    
          }
        }    
        for (let i = 0; i < sitengo.length; i++) {
          if (oracion.includes(sitengo[i])) {
            const texto = 'Para estar seguros te daré un listado y me dirás cual hace falta. Se debe tener en cuenta los siguientes aspectos: Diligenciamiento en forma clara, legible, sin intercalaciones, no utilizar siglas, Hora y fecha en la que se realiza el diligenciamiento, Nombre completo y firma del autor del diligenciamiento.  sí aciertas seguimos, de lo contrario responde no tengo conocimiento.';
            leerTexto(texto);
          }
        }
        for (let i = 0; i < notengo.length; i++) {
          if (oracion.includes(notengo[i])) {
            const texto = 'Es importante tener cuenta los siguientes aspectos: Diligenciamiento en forma clara, legible, sin intercalaciones, no dejar espacios en blanco y sin utilizar siglas, Hora y fecha en la que se realiza el diligenciamiento, Nombre completo y firma del autor del diligenciamiento. ¿Cuándo se encuentra un error de diligenciamiento en la historia clínico el funcionario debe borrar y corregir o hacer un nuevo registro con la corrección?';
            leerTexto(texto);
          }
        }
        for (let i = 0; i < borrar.length; i++) {
          if (oracion.includes(borrar[i])) {
            const texto = 'Eso es incorrecto. Si se encuentra un error por ningun motivo se debe borrar un registro en la historia clinica intenta de nuevo.';
            leerTexto(texto);
          }
        }
        for (let i = 0; i < registro.length; i++) {
          if (oracion.includes(registro[i])) {
            const texto = 'El funcionario debe agregar en el registro de modificación la fecha, hora, nombre e identificación de quien hizo la corrección y haciendo referencia al error que se subsana. El funcionario verifica la documentación aportada por los colaboradores, para saber qué tipo de procedimiento médico se realizó. Si es una nota médica que debe hacer Identificar el registro específico, ingresar la información contenida o ambos';
            leerTexto(texto);
          }
        }
        for (let i = 0; i < identifica.length; i++) {
          if (oracion.includes(identifica[i])) {
            const texto = 'eso es incorrecto inténtalo de nuevo Si es una nota médica que debe hacer Identificar el registro específico, ingresar la información contenida o ambos';
            leerTexto(texto);
          }
        } 
        for (let i = 0; i < ambos.length; i++) {
          if (oracion.includes(ambos[i])) {
            const texto = '¡Muy bien! No solamente para las notas medicas se debe hacer este procedimiento, también se usa para nota de enfermería, resultado médico obtenido por un procedimiento de laboratorio clínico o un resultado médico obtenido por un procedimiento de ayuda diagnóstica, si llega un usuario por urgencias al prestador de Servicios de Salud donde tiene habilitado el servicio, el funcionario verifica las condiciones iniciales de salud y encuentra que está inconsciente, ¿qué debe hacer remitirlo inmediatamente a valoración clínica preliminar o revisar su documentación?';
            leerTexto(texto);
          }
        }
        for (let i = 0; i < revisa.length; i++) {
          if (oracion.includes(revisa[i])) {
            const texto = 'eso es incorrecto si el paciente está inconsciente se debe hacer una rápida valoración, intenta de nuevo ¿qué debe hacer remitirlo inmediatamente a valoración clínica preliminar o revisar su documentación?';
            leerTexto(texto);
          }
        }
        for (let i = 0; i < remite.length; i++) {
          if (oracion.includes(remite[i])) {
            const texto = 'Cuando un paciente llega inconsciente se debe remitir lo más pronto posible para valoración clínica Preliminar ya que esto puede hacer la diferencia entre la vida y la muerte del paciente. la valoración es superior a TRIAGE II se debe ingresar inmediatamente a sala de Observación o Sala de Cirugía luego de hacer revisión de las pertenencias del paciente no se encontró documentación que se debe hacer continuar el ingreso con un nombre aleatorio o registrarlo como Nomen Nescio';
            leerTexto(texto);
          }
        }
        for (let i = 0; i < nombre.length; i++) {
          if (oracion.includes(nombre[i])) {
            const texto = 'Eso es incorrecto, el funcionario no puede inventar nombres a un usuario intenta de nuevo, que se debe hacer continuar el ingreso con un nombre aleatorio o registrarlo como Nomen Nescio';
            leerTexto(texto);
          }
        }
        for (let i = 0; i < desconocido.length; i++) {
          if (oracion.includes(desconocido[i])) {
            const texto = 'El usuario será registrado como Nomen Nescio (Nombre desconocido) en la base de datos de la Prestadora de Servicios de Salud y se registrarán los procedimientos médicos realizados se iniciará el protocolo de identificación del paciente y se informará a la entidad encargada Departamental, Distrital o Municipal de la situación presentada. Si el usuario cuenta con documento de identidad que se debe hacer consultar en la plataforma ADRES en la EPS o en las dos';
            leerTexto(texto);
          }
        }
        for (let i = 0; i < adres.length; i++) {
          if (oracion.includes(adres[i])) {
            const texto = 'Eso es incorrecto intenta de nuevo se debe hacer consultar en la plataforma ADRES en la EPS o en las dos';
            leerTexto(texto);
          }
        }
        for (let i = 0; i < juntos.length; i++) {
          if (oracion.includes(juntos[i])) {
            const texto = 'Se debe consultar con el tipo y número documento de identidad del usuario en ADRES y el sistema de la institución para hacer verificación de derechos y determinar el tipo de afiliación. Luego de hacer la verificación se encuentra que el usuario no está activo en el sistema porque es un turista extranjero ¿qué se debe hacer solicitar el pago de todos los servicios al usuario o se verifica si cuenta con una póliza?';
            leerTexto(texto);
          }
        }
        for (let i = 0; i < paga.length; i++) {
          if (oracion.includes(paga[i])) {
            const texto = 'Eso es incorrecto verifica tu respuesta, ¿qué se debe hacer solicitar el pago de todos los servicios al usuario o se verifica si cuenta con una póliza?';
            leerTexto(texto);
          }
        }
        for (let i = 0; i < poliza.length; i++) {
          if (oracion.includes(poliza[i])) {
            const texto = 'Se debe consultar al usuario si cuenta con una póliza se le garantiza la atención inicial de urgencia, al tenor de los principios éticos y las normas que determinan las acciones y el comportamiento del personal de salud se realizan el proceso de egreso, valoración médica, estancia, entre otras y se realiza la solicitud de cobro del servicio prestado a la asegurada contratada por el turista extranjero y asi termina la atención del usuario y la apertura de la historia clínica. ahora puede cambiar de tema';
            leerTexto(texto);
          }
        }
        for (let i = 0; i < tema.length; i++) {
          if (oracion.includes(tema[i])) {
            const texto = 'Bienvenido al inicio, seleccione el nuevo tema';
            leerTexto(texto);
            activo = 0;
            console. log('activo esta en: ' + activo)
          }
        }
  } 
  if (activo === 15) { // consulta externa neonatal
        const oracion = eliminarTildes(texto.toLowerCase()); // Eliminar tildes y convertir el texto a minúsculas
        const iniciar = ["iniciar", "inicio"]; 
        const documento = ["documento de identidad", "identificacion","cedula"]; 
        const dinero = ["cuota moderadora"];  
        const ambos = ["ambos"];
        const eps = ["eps", "adres", "address"];
        const control = ["verifica", "verificar", "control de rutina"];
        const sala = ["espere en sala", "espere en la sala"];
        const doctor = ["llama al doctor", "llamar al doctor"];
        const espera = ["espero", "esperar"];
        const report = ["reporta", "reportar", "reporto"];
        const termina = ["deja la gestion", "dejar la gestion"];
        const tema = ['cambiar tema',"cambiar el tema","cambiemos de tema","cambiar de tema","volver a inicio","volver al inicio", "regresar a inicio","regresar al inicio"];
    
        for (let i = 0; i < iniciar.length; i++) {
          if (oracion.includes(iniciar[i])) {
            const texto = 'Empecemos con este caso donde usuaria Amelia Castañeda llega al Hospital Universitario Barrios Unidos por un control rutinario neonatal del programa especial Mamá Canguro que tiene con su bebe. 	¿Le solicitas documento de identidad o cuota moderadora?';
            leerTexto(texto);
          }
        }
        for (let i = 0; i < documento.length; i++) {
          if (oracion.includes(documento[i])) {
            const texto = '¡Muy bien!!.la solicitud del documento es muy importante. Debes validar si el usuario esta registrado en sistema ¿Validas al usuario en el sistema de la EPS, ADRESS o ambos? ';
            leerTexto(texto);    
          }
        }
        for (let i = 0; i < dinero.length; i++) {
          if (oracion.includes(dinero[i])) {
            const texto = '¡lo siento!. Rectifica tu respuesta y vuelve a seleccionar, porque hay que hacer registro del usuario y para eso no es necesario solicitar dinero o cuotas moderadoras, rectifica en tu conocimiento y vuelve a seleccionar.	¿Le solicitas documento de identidad o cuota moderadora?';
            leerTexto(texto);
          }
        }
        for (let i = 0; i < ambos.length; i++) {
          if (oracion.includes(ambos[i])) {
            const texto = '¡Sigamos!. Para brindar servicios al usuario se debe realizar ambas validaciones.luego que encuentras que sí está registrado la usuaria Amelia Castañeda con su bebe, cuéntame ¿Verificas si tiene su control de rutina o la envías a sala de espera?';
            leerTexto(texto);    
          }
        }
        for (let i = 0; i < eps.length; i++) {
          if (oracion.includes(eps[i])) {
            const texto = 'estas cerca pero rectifica tu respuesta y vuelve a seleccionar, porque las dos validaciones son importantes, entonces ¿Validas el usuario en sistema de la EPS, en la plataforma adres o ambos?.';
            leerTexto(texto);
          }
        }
        for (let i = 0; i < control.length; i++) {
          if (oracion.includes(control[i])) {
            const texto = '¡Muy bien!. antes de hacer esperar al usuario se debe confirmar si tiene o no control programado. 	Después que la usuaria Amelia termina su control rutinario neonatal con los signos vitales bien de su bebe, sale a la sala de llamados en espera del pediatra cuando el bebe empieza a presentar una tonalidad morada y amarilla en la piel ¿Esperas a que llegue un asistencial o haces llamado al doctor más cercano?';
            leerTexto(texto);    
          }
        }
        for (let i = 0; i < sala.length; i++) {
          if (oracion.includes(sala[i])) {
            const texto = 'no debes hacer esperar en sala a un usuario que no tenga cita programada porque no lo atenderán y solo le hará perder su tiempo. vuelve a intentar.¿Verificas si tiene su control de rutina o la envías a sala de espera?';
            leerTexto(texto); 
          }
        }
        for (let i = 0; i < doctor.length; i++) {
          if (oracion.includes(doctor[i])) {
            const texto = '¡vas muy bien! en ese momento debes pedir la sistencia del doctor más cercano porque esto podría salvar la vida de una persona. despues de que llego el doctor y a pesar de los intentos de primeros auxilios por parte del personal capacitado, el bebe entra en un estado de paro cardio-respiratorio y fallece ¿Usted empieza protocolo para reporte por fallecimiento neonatal o deja la gestión hasta el momento?';
            leerTexto(texto);    
          }
        }
        for (let i = 0; i < espera.length; i++) {
          if (oracion.includes(espera[i])) {
            const texto = 'te equivocas, porque de eso dependerá la vida de una persona, intentalo de nuevo ¿Esperas a que llegue un asistencial o haces llamado al doctor más cercano?';
            leerTexto(texto);
          }
        }
        for (let i = 0; i < report.length; i++) {
          if (oracion.includes(report[i])) {
            const texto = 'excelente aún cuando el usuario fallece es importante que inicie el protocolo de fallecimineto para ya que en ese momento es usted la persona con los datos necesarios para ello... has teminado el caso correctamente ahora ya puedes cambiar de tema';
            leerTexto(texto);
          }
        }
        for (let i = 0; i < termina.length; i++) {
          if (oracion.includes(termina[i])) {
            const texto = 'lo siento rectifica tu respuesta, porque en ese momento el usuario hizo registro de ingreso con usted, asi que ¿Usted empieza protocolo para reporte por fallecimiento neonatal o deja la gestión hasta el momento?';
            leerTexto(texto);
          }
        }
        for (let i = 0; i < tema.length; i++) {
          if (oracion.includes(tema[i])) {
            const texto = 'Bienvenido al inicio, seleccione el nuevo tema';
            leerTexto(texto);
            activo = 0;
            console. log('activo esta en: ' + activo)
          }
        }
  }
  if (activo === 16) { // PQRSD
        const oracion = eliminarTildes(texto.toLowerCase()); // Eliminar tildes y convertir el texto a minúsculas
        const iniciar = ["iniciar", "inicio"]; 
        const documento = ["documento"];
        const historia = ["historia clinica"];
        const cuota = ["cuota moderadora"];
        const ambas = ["ambos"];
        const adress= ["adres","eps"];
        const control = ["control medico"];
        const formatos = ["formato"];
        const espera = ["espera", "espero", "esperar"];
        const cerar = ["cierra", "cierro", "cerrar"];
        const verif = ["verifica", "verificar"];
        const remite= ["remite", "remitir"];
        const veinte = ["20 dias"];
        const quince = ["15 dias"];
        const envia = ["enviar", "envia"];
        const afecta = ["area afectada"];
        const b= ["remite", "remitir"];
        const c = ["20 dias"];
        const d = ["15 dias"];
        const e = ["consulta por urgencias"];
        const tema = ["cambiar tema", "cambiar el tema","cambiemos de tema","cambiar de tema","volver a inicio","volver al inicio", "regresar a inicio","regresar al inicio"]; // activo = 0 

        for (let i = 0; i < iniciar.length; i++) {
          if (oracion.includes(iniciar[i])) {
            const texto = 'El señor Alberto Ortiz cae desde su altura y se lastima la rodilla, al llegar a urgencias le realizan una radiografía de la rodilla como apoyo diagnóstico, al ver que no hay fractura le dan medicamentos y lo envían a casa; él no estando de acuerdo solicita una ecografía de rodilla, pero se la niegan y se retira a su casa. Días después vuelve al médico a interponer una queja presencial, ya que fue a un médico particular donde le practicaron la ecografía de rodilla como apoyo diagnóstico y le encuentran una bursitis que es operada y tratada ya que por la falta de profesionalismo pudo haber perdido su miembro inferior.usted como colaborador de la salud usted atiende al señor Alberto, que debes solicitar para iniciar la atencion documento de identidad o la historia clínica?';
            leerTexto(texto);
          }
        }
        for (let i = 0; i < cuota.length; i++) {
          if (oracion.includes(cuota[i])) {
            const texto = 'rectifica en tu conocimiento y vuelve a seleccionar.¿Le solicitas documento de identidad o cuota moderadora?';
            leerTexto(texto);
          }
        }
        for (let i = 0; i < documento.length; i++) {
          if (oracion.includes(documento[i])) {
            const texto = 'Muy bien. Con documento de identidad el auxiliar puede verificar derechos del usuario. ¿en donde debe validar si el usuario esta registrado en sistema en la EPS, ADRESS o AMBOS?';
            leerTexto(texto);
          }
        }
        for (let i = 0; i < historia.length; i++) {
          if (oracion.includes(historia[i])) {
            const texto = 'rectifica tu conocimiento antes de brindar atencióna un usuario, es muy importante identeficarlo. vuelve a seleccionar.¿Le solicitas documento de identidad o cuota moderadora?';
            leerTexto(texto);
          }
        }
        for (let i = 0; i < ambas.length; i++) {
          if (oracion.includes(ambas[i])) {
            const texto = 'Muy bien, Después de obtener la validación de la información, Encuentras que sí está registrado el usuario Alberto Ortiz, cuéntame ¿Verificas si tiene control médico o le entregas formato de PQRSD?';
            leerTexto(texto);
          }
        }  
        for (let i = 0; i < adress.length; i++) {
          if (oracion.includes(adress[i])) {
            const texto = 'Rectifica en tu conocimiento y vuelve a seleccionar. ¿Validas al usuario en el sistema de la EPS, ADRESS o AMBOS?';
            leerTexto(texto);
          }
        }  
        for (let i = 0; i < formatos.length; i++) {
          if (oracion.includes(formatos[i])) {
            const texto = 'Muy bien. como anteriormente escuchamos de que se trata la atención al señor Alberto, ya sabemos que el tramite que debe realizar es un PQRSD. a continuación el funcionario abre un caso de solicitud de PQRSD en el sistema y le indica al usuario diligenciar el formato con todos los detalles de su inconformidad y lo entregue para anexarlo al caso ¿Esperas el formato de PQRSD del usuario o cierras el caso?';
            leerTexto(texto);
          }
        }   
        for (let i = 0; i < control.length; i++) {
          if (oracion.includes(control[i])) {
            const texto = 'Rectifica en tu conocimiento y vuelve a seleccionar. ¿Verificas si tiene control médico o le entregas formato de PQRSD?';
            leerTexto(texto);
          }
        }   
        for (let i = 0; i < espera.length; i++) {
          if (oracion.includes(espera[i])) {
            const texto = 'Muy bien, Después de unos minutos el señor Alberto Ortiz se acerca nuevamente para entregar el formato cuando usted recibe el formato, lo verifica y lo agrega al caso lo remite al área especializada?';
            leerTexto(texto);
          }
        }    
        for (let i = 0; i < cerar.length; i++) {
          if (oracion.includes(cerar[i])) {
            const texto = 'Rectifica en tu conocimiento y vuelve a seleccionar. ¿Esperas el formato de PQRSD del usuario o cierras el caso?';
            leerTexto(texto);
          }
        }   
        for (let i = 0; i < verif.length; i++) {
          if (oracion.includes(verif[i])) {
            const texto = 'Muy bien, 	Después de esto usted como funcionario le entrega el radicado de la solicitud PQRSD, el usuario pregunta en cuanto tiempo le dan respuesta, usted le contesta, ¿en 20 días hábiles o 15 días hábiles?';
            leerTexto(texto);
          }
        }  
        for (let i = 0; i < remite.length; i++) {
          if (oracion.includes(remite[i])) {
            const texto = 'Rectifica en tu conocimiento y vuelve a seleccionar.cuanto tiempo le dan respuesta, usted le contesta, ¿en 20 días hábiles o 15 días hábiles?';
            leerTexto(texto);
          }
        }   
        for (let i = 0; i < quince.length; i++) {
          if (oracion.includes(quince[i])) {
            const texto = 'Muy bien, El usuario se retira y usted que realiza con el caso ¿lo envía al área correspondiente para verificación o lo deja abierto sin asignación de área?';
            leerTexto(texto);
          }
        }  
        for (let i = 0; i < veinte.length; i++) {
          if (oracion.includes(veinte[i])) {
            const texto = 'Rectifica en tu conocimiento y vuelve a seleccionar.cuanto tiempo le dan respuesta, usted le contesta, ¿en 20 días hábiles o 15 días hábiles?';
            leerTexto(texto);
          }
        }
        for (let i = 0; i < envia.length; i++) {
          if (oracion.includes(envia[i])) {
            const texto = 'Muy bien, Si después de unos días el señor Alberto Ortiz se acerca nuevamente para averiguar el proceso de su solicitud de PQRSD ¿usted como revisa el caso, con el numero de la cedula del usuario o con el radicado de la solicitud?';
            leerTexto(texto);
          }
        }   
        for (let i = 0; i < afecta.length; i++) {
          if (oracion.includes(afecta[i])) {
            const texto = 'Rectifica en tu conocimiento y vuelve a seleccionar. una PQRSD debe tramitarse lo antes posible por eso no debes perder tiempo, ¿lo envía al área correspondiente para verificación o espera que área afectada venga por el caso?';
            leerTexto(texto);
          }
        }    
        for (let i = 0; i < tema.length; i++) {
          if (oracion.includes(tema[i])) {
            const texto = 'Bienvenido al inicio, seleccione el nuevo tema';
            leerTexto(texto);
            activo = 0;
            console. log('activo esta en: ' + activo)
          }
        }
  }
  if (activo === 17){
        const oracion = eliminarTildes(texto.toLowerCase()); // Eliminar tildes y convertir el texto a minúsculas
        const iniciar = ["iniciar"];
        const tipo = ["tipo de documento"];
        const tarejeta = ["tarjeta bancaria", "nombre completo"];
        const correc = ["correcta","correcto"];
        const incorr = ["incorrecto"];
        const pertenece = ["grupo"];
        const ejecutar = ["ejecutar factura"];
        const ingreso = ["ingreso base", "base de cotizacion"];
        const magnit = ["magnitud del servicio"];
        const primcopago = ["610227", "304583"];
        const errprim = ["546799", "272924"];
        const segucopago = ["2440909", "1220455"];
        const errseg = ["2187195", "1093597"];
        const urgencias = ["consulta por urgencias"];
        const tema = ["cambiar tema", "cambiar el tema","cambiemos de tema","cambiar de tema","volver a inicio","volver al inicio", "regresar a inicio","regresar al inicio"]; // activo = 0 
    
        for (let i = 0; i < iniciar.length; i++) {
          if (oracion.includes(iniciar[i])) {
            const texto = 'El 05 de MAYO de 2023, el auxiliar administrativo del HOSPITAL ENGATIVA atiende a la Sra. Nancy Silva González la cual expresa tener una cita médica de odontología programada a las 8:30 AM con el Dr. Sebastián Rodríguez De conformidad con lo anterior ¿Qué información es pertinente solicitar para proceder con la atención?. tipo de documento, tarjeta bancaria o nombre completo';        leerTexto(texto);
          }
        }
        for (let i = 0; i < tarejeta.length; i++) {
          if (oracion.includes(tarejeta[i])) {
            const texto = 'rectifica en tu conocimiento y vuelve a seleccionar.¿Qué información es pertinente solicitar para proceder con la atención?. tipo de documento, tarjeta bancaria o nombre completo';
            leerTexto(texto);
          }
        }
        for (let i = 0; i < tipo.length; i++) {
          if (oracion.includes(tipo[i])) {
            const texto = 'Muy bien. ⮚	Obtenido el tipo de documento el auxiliar debe ingresar el número de identificación en la base de datos de la entidad para confirmar y realizar la validación de la información, ¿la anterior afirmación es correcta?';
            leerTexto(texto);
          }
        }
        for (let i = 0; i < correc.length; i++) {
          if (oracion.includes(correc[i])) {
            const texto = 'Muy bien, Después de obtener la validación de la información, Si el usuario pertenece al régimen contributivo ¿que se procederá a realizar el auxiliar? identificación al grupo que pertenece, sea afiliado o beneficiario o ejecutar la factura';
            leerTexto(texto);
          }
        }    
        for (let i = 0; i < incorr.length; i++) {
          if (oracion.includes(incorr[i])) {
            const texto = 'Rectifica en tu conocimiento y vuelve a seleccionar. ¿la anterior afirmación es correcta?';
            leerTexto(texto);
          }
        }    
        for (let i = 0; i < pertenece.length; i++) {
          if (oracion.includes(pertenece[i])) {
            const texto = 'Muy bien. Si el usuario paciente pertenece al régimen contributivo. El cobro del Copago varía según el ingreso base de cotización IBC o la magnitud del servicio';
            leerTexto(texto);
          }
        }    
        for (let i = 0; i < ejecutar.length; i++) {
          if (oracion.includes(ejecutar[i])) {
            const texto = 'Rectifica en tu conocimiento y vuelve a seleccionar. ¿que se procederá a realizar el auxiliar? identificación al grupo que pertenece, sea afiliado o beneficiario o ejecutar la factura';
            leerTexto(texto);
          }
        }    
        for (let i = 0; i < ingreso.length; i++) {
          if (oracion.includes(ingreso[i])) {
            const texto = 'Muy bien, En caso de que el usuario Nancy Silva Gonzales perteneciera al régimen contributivo y tenga un rango de ingresos menor a 2 Salarios Mínimos Mínimo Legal Mensual Vigente ¿cuánto será el tope de copago por año y por evento? $610227 por año y $304583 por evento, $546799 por año y 272924 por evento';
            leerTexto(texto);
          }
        }   
        for (let i = 0; i < magnit.length; i++) {
          if (oracion.includes(magnit[i])) {
            const texto = 'Rectifica en tu conocimiento y vuelve a seleccionar. El ingreso base de cotización IBC o la magnitud del servicio';
            leerTexto(texto);
          }
        }   
        for (let i = 0; i < primcopago.length; i++) {
          if (oracion.includes(primcopago[i])) {
            const texto = 'Muy bien, En caso de que el usuario Nancy Silva Gonzales perteneciera al régimen contributivo tenga un rango de ingresos entre 2 y 5 Salarios Mínimos Mínimo Legales Mensuales Vigentes ¿cuánto será el tope de copago por año y por evento?';
            leerTexto(texto);
          }
        }   
        for (let i = 0; i < errprim.length; i++) {
          if (oracion.includes(errprim[i])) {
            const texto = 'Rectifica en tu conocimiento y vuelve a seleccionar.¿cuánto será el tope de copago por año y por evento?';
            leerTexto(texto);
          }
        }   
        for (let i = 0; i < segucopago.length; i++) {
          if (oracion.includes(segucopago[i])) {
            const texto = 'Muy bien, En caso de que el usuario Nancy Silva Gonzales pertenezca al régimen contributivo tenga un rango de ingresos mayor a 5 Salarios Mínimos Mínimo Legales Mensuales Vigentes ¿cuánto será el tope de copago por año y por evento?';
            leerTexto(texto);
          }
        }   
        for (let i = 0; i < errseg.length; i++) {
          if (oracion.includes(errseg[i])) {
            const texto = 'Rectifica en tu conocimiento y vuelve a seleccionar.¿cuánto será el tope de copago por año y por evento?';
            leerTexto(texto);
          }
        }
        for (let i = 0; i < tema.length; i++) {
          if (oracion.includes(tema[i])) {
            const texto = 'Bienvenido al inicio, seleccione el nuevo tema';
            leerTexto(texto);
            activo = 0;
            console. log('activo esta en: ' + activo)
          }
        }    
  }
}