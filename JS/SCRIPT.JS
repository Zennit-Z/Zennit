function getGreeting(){

  const hour = new Date().getHours();

  if(hour >= 5 && hour < 12){
    return "Buenos días";
  }

  else if(hour >= 12 && hour < 18){
    return "Buenas tardes";
  }

  else{
    return "Buenas noches";
  }

}

const modal = document.getElementById("serviceModal");

const serviceTitle = document.getElementById("serviceTitle");

const whatsappBtn = document.getElementById("whatsappBtn");

/* NUMERO */

const number = "50672616806";

/* MODAL SERVICIOS */

function openService(service){

  serviceTitle.innerText = service;

  const greeting = getGreeting();

const message =
`Hola, ${greeting}. 
Me pongo en contacto con ustedes ya que estoy interesado(a) en obtener información más detallada sobre el servicio de ${service}.
Me gustaría conocer más acerca del proceso de trabajo, beneficios, tiempos estimados y las distintas opciones disponibles para implementar una solución profesional adaptada a mis necesidades.
Quedo atento(a) a su respuesta. Muchas gracias por su atención.
`;

  const url =
`https://wa.me/${number}?text=${encodeURIComponent(message)}`;

  whatsappBtn.href = url;

  modal.classList.add("active");
}

function closeModal(){
  modal.classList.remove("active");
}

window.addEventListener("click",(e)=>{
  if(e.target === modal){
    closeModal();
  }
});

/* FORMULARIO CONTACTO */

const form = document.getElementById("contactForm");

form.addEventListener("submit",function(e){

  e.preventDefault();

  const nombre =
  document.getElementById("nombre").value;

  const correo =
  document.getElementById("correo").value;

  const mensaje =
  document.getElementById("mensaje").value;

  const text =
`Hola, buenas.

Mi nombre es: ${nombre}

Correo: ${correo}

Consulta:
${mensaje}`;

  const whatsappURL =
`https://wa.me/${number}?text=${encodeURIComponent(text)}`;

  window.open(whatsappURL,"_blank");

});

/* ===== PARTICULAS FUTURISTAS ===== */

particlesJS("particles-js", {

  particles: {

    number: {
      value: 65
    },

    color: {
      value: "#ff003c"
    },

    shape: {
      type: "circle"
    },

    opacity: {
      value: 0.4
    },

    size: {
      value: 3
    },

    line_linked: {
      enable: true,
      distance: 140,
      color: "#ff003c",
      opacity: 0.15,
      width: 1
    },

    move: {
      enable: true,
      speed: 1.2
    }

  },

  interactivity: {

    events: {

      onhover: {
        enable: true,
        mode: "grab"
      }

    }

  },

  retina_detect: true

});

/* ========================= */
/* SPACE BATTLE SYSTEM */
/* ========================= */

const canvas =
document.getElementById("spaceBattle");

const ctx =
canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

/* ========================= */
/* IMAGENES */
/* ========================= */

const shipImages = [

  "img/fighter1.png",
  "img/fighter2.png",
  "img/fighter3.png"

];

/* ========================= */
/* NAVES */
/* ========================= */

const ships = [];
const lasers = [];
const explosions = [];

class Ship{

  constructor(){

    this.reset();

  }

  reset(){

    this.image = new Image();

    this.image.src =
    shipImages[
      Math.floor(Math.random()*shipImages.length)
    ];

   this.size =
   45 + Math.random()*20;

    this.side =
    Math.random() > 0.5 ? "left" : "right";

    this.x =
    this.side === "left"
    ? -100
    : canvas.width + 100;

    this.y =
    Math.random()*canvas.height;

   this.speed =
   4 + Math.random()*4;

/* DIRECCION ALEATORIA */

this.angle =
Math.random() * Math.PI * 2;

    this.destroyed = false;

  }

  draw(){

    ctx.save();

    ctx.translate(this.x,this.y);

    ctx.rotate(this.angle);

    ctx.drawImage(
      this.image,
      -this.size/2,
      -this.size/2,
      this.size,
      this.size
    );

    ctx.restore();

  }

  update(){

    if(this.destroyed) return;

  /* MOVIMIENTO DINAMICO */

  this.x += Math.cos(this.angle) * this.speed;

  this.y += Math.sin(this.angle) * this.speed;

  /* MOVIMIENTO ALEATORIO */

  this.angle +=
  (Math.random() - 0.5) * 0.08;

  /* VELOCIDAD */

  this.speed +=
  (Math.random() - 0.5) * 0.05;

  /* LIMITES */

  if(this.speed < 2){
    this.speed = 2;
  }

  if(this.speed > 8){
    this.speed = 8;
  }

  /* REAPARECER */

  if(

    this.x > canvas.width + 200 ||
    this.x < -200 ||

    this.y > canvas.height + 200 ||
    this.y < -200

  ){

    this.reset();


    }

  }

}

/* ========================= */
/* LASERS */
/* ========================= */

class Laser{

  constructor(ship,target){

    this.x = ship.x;
    this.y = ship.y;

    this.targetX = target.x;
    this.targetY = target.y;

    this.speed = 15;

    const dx =
    this.targetX - this.x;

    const dy =
    this.targetY - this.y;

    const angle =
    Math.atan2(dy,dx);

    this.vx =
    Math.cos(angle)*this.speed;

    this.vy =
    Math.sin(angle)*this.speed;

    this.target = target;

  }

  draw(){

    ctx.beginPath();

    ctx.moveTo(this.x,this.y);

    ctx.lineTo(
      this.x - this.vx*4,
      this.y - this.vy*4
    );

    ctx.strokeStyle =
    "rgba(255,0,60,0.8)";

    ctx.lineWidth = 2;

    ctx.shadowBlur = 10;

    ctx.shadowColor =
    "#ff003c";

    ctx.stroke();

  }

  update(){

    this.x += this.vx;
    this.y += this.vy;

    const dx =
    this.target.x - this.x;

    const dy =
    this.target.y - this.y;

    const dist =
    Math.sqrt(dx*dx + dy*dy);

    if(dist < 40){

      this.target.destroyed = true;

      explosions.push({
        x:this.target.x,
        y:this.target.y,
        radius:0
      });

      setTimeout(()=>{

        this.target.reset();

      },1200);

    }

  }

}

/* ========================= */
/* CREAR NAVES */
/* ========================= */

for(let i=0;i<7;i++){

  ships.push(new Ship());

}

/* ========================= */
/* DISPAROS */
/* ========================= */

setInterval(()=>{

  const aliveShips =
  ships.filter(ship=>!ship.destroyed);

  if(aliveShips.length < 2) return;

  const shooter =
  aliveShips[
    Math.floor(Math.random()*aliveShips.length)
  ];

  let target =
  aliveShips[
    Math.floor(Math.random()*aliveShips.length)
  ];

  while(target === shooter){

    target =
    aliveShips[
      Math.floor(Math.random()*aliveShips.length)
    ];

  }

  lasers.push(
    new Laser(shooter,target)
  );

},700);

/* ========================= */
/* EXPLOSIONES */
/* ========================= */

function drawExplosions(){

  explosions.forEach((exp,index)=>{

    ctx.beginPath();

    ctx.arc(
      exp.x,
      exp.y,
      exp.radius,
      0,
      Math.PI*2
    );

    ctx.fillStyle =
    `rgba(255,80,0,${
      1-exp.radius/30
    })`;

    ctx.fill();

    exp.radius += 2;

    if(exp.radius > 30){

      explosions.splice(index,1);

    }

  });

}

/* ========================= */
/* LOOP */
/* ========================= */

function animateBattle(){

  ctx.clearRect(
    0,
    0,
    canvas.width,
    canvas.height
  );

  ships.forEach(ship=>{

  if(!ship.destroyed){

    ship.update();
    ship.draw();

  }

});

/* ========================= */
/* COLISIONES ENTRE NAVES */
/* ========================= */

for(let i = 0; i < ships.length; i++){

  for(let j = i + 1; j < ships.length; j++){

    const shipA = ships[i];
    const shipB = ships[j];

    if(
      shipA.destroyed ||
      shipB.destroyed
    ) continue;

    const dx =
    shipA.x - shipB.x;

    const dy =
    shipA.y - shipB.y;

    const distance =
    Math.sqrt(dx * dx + dy * dy);

    /* DETECTAR CHOQUE */

    if(distance < 50){

      shipA.destroyed = true;
      shipB.destroyed = true;

      /* EXPLOSIONES */

      explosions.push({

        x: shipA.x,
        y: shipA.y,
        radius: 0

      });

      explosions.push({

        x: shipB.x,
        y: shipB.y,
        radius: 0

      });

      /* REAPARECER */

      setTimeout(()=>{

        shipA.reset();
        shipB.reset();

      },1200);

    }

  }

}

  lasers.forEach((laser,index)=>{

    laser.update();
    laser.draw();

    if(
      laser.x < 0 ||
      laser.x > canvas.width ||
      laser.y < 0 ||
      laser.y > canvas.height
    ){

      lasers.splice(index,1);

    }

  });

  drawExplosions();

  requestAnimationFrame(
    animateBattle
  );

}

animateBattle();

/* ========================= */
/* RESIZE */
/* ========================= */

window.addEventListener(
  "resize",
  ()=>{

    canvas.width =
    window.innerWidth;

    canvas.height =
    window.innerHeight;

  }
);