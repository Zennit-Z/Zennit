const users = [

  {
    user:"Isaac",
    pass:"zennit20"
  },

  {
    user:"Taylor",
    pass:"zennit20"
  },

  {
    user:"Kevin",
    pass:"zennit20"
  }

];

/* LOGIN */

function login(){

  const username =
  document.getElementById("username").value;

  const password =
  document.getElementById("password").value;

  const validUser =
  users.find(u =>
    u.user === username &&
    u.pass === password
  );

  if(validUser){

    document
    .getElementById("loginBox")
    .style.display = "none";

    document
    .getElementById("adminPanel")
    .style.display = "flex";

  }

  else{

    document
    .getElementById("error")
    .innerText =
    "Usuario o contraseña incorrectos";

  }

}

/* SECTIONS */

function showSection(sectionId){

  document
  .querySelectorAll(".admin-section")
  .forEach(section => {

    section.classList.remove("active");

  });

  document
  .getElementById(sectionId)
  .classList.add("active");

}

/* PROYECTOS */

let projects = [];

function addProject(){

  const name =
  document.getElementById("projectName").value;

  const link =
  document.getElementById("projectLink").value;

  const image =
  document.getElementById("projectImage").value;

  const project = {

    name,
    link,
    image

  };

  projects.push(project);

  renderProjects();

}

/* RENDER */

function renderProjects(){

  const container =
  document.getElementById("projectsList");

  container.innerHTML = "";

  projects.forEach(project => {

    container.innerHTML += `

      <div class="project-admin-card">

        <h3>${project.name}</h3>

        <p>${project.link}</p>

        <img src="${project.image}"
          width="200">

      </div>

    `;

  });

}