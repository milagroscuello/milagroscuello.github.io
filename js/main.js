let currentLang = localStorage.getItem("language") || (navigator.language.startsWith("es") ? "es" : "en");
let currentFilter = "all";

function filterProjects(category) {
  currentFilter = category;
  
  document.querySelectorAll("#categoryTabs tab").forEach(tab => {
    tab.classList.toggle("active", tab.dataset.filter === category);
  });

  const filtered = category === "all" 
    ? projects 
    : projects.filter(p => p.categoryKey === category);

  renderProjects(filtered);
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".language-switch button").forEach(btn => {
    btn.addEventListener("click", () => setLanguage(btn.dataset.lang));
  });

  document.querySelectorAll("#categoryTabs tab").forEach(tab => {
    tab.addEventListener("click", () => {
      filterProjects(tab.dataset.filter);
    });
  });

  setLanguage(currentLang);
  filterProjects("all"); 
});

function setLanguage(lang) {
  currentLang = lang; 
  
  document.querySelectorAll("[data-es]").forEach(el => {
    el.textContent = el.dataset[lang];
  });

  document.querySelectorAll("[data-placeholder-es]").forEach(el => {
    el.placeholder = el.getAttribute(`data-placeholder-${lang}`);
  });
  
  document.querySelectorAll(".language-switch button").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.lang === lang);
  });

  localStorage.setItem("language", lang);

  filterProjects(currentFilter); 
}

function renderProjects(list) {
  const grid = document.getElementById("projectsGrid");
  if (!grid) return;
  grid.innerHTML = "";
  list.forEach(project => {
    const techArray = project.technologies[currentLang]; 
    const techHtml = techArray.map(t => `<span>${t}</span>`).join("");
    
    grid.innerHTML += `
      <div class="project-card">
        <img src="${project.image}" class="project-image" alt="${project.title[currentLang]}">
        <div class="project-content">
          <div class="project-title">${project.title[currentLang]}</div>
          <div class="project-category">${project.category[currentLang]}</div>
          <div class="project-description">
            ${project.description[currentLang]}
          </div>
          <div class="project-tech">
            ${techHtml} 
          </div>
          <div class="project-actions">
            <a href="${project.code}" target="_blank">Code</a>
            ${project.demo !== "#" ? `<a href="${project.demo}" target="_blank">Demo</a>` : ""}
          </div>
        </div>
      </div>
    `;
  });
}

const projects = [
    {
        id: 1,
        categoryKey: "c-programming",
        title: {
            es: "Pokémon: Atrápame si puedes",
            en: "Pokémon: Catch me if you can"
        },
        category: {
            es: "Programación en C",
            en: "C Programming"
        },
        description: {
            es: "Motor de juego por terminal desarrollado en C. Incluye implementaciones propias de estructuras de datos (ABB, Hash, Listas).",
            en: "Terminal-based game engine developed in C. Includes custom data structure implementations (BST, Hash, Lists)."
        },
        image: "assets/images/pokemon-demo.gif",
        technologies: {
            es: ["C", "Estructuras de Datos", "Valgrind", "Makefile"],
            en: ["C", "Data Structures", "Valgrind", "Makefile"]
        },
        code: "https://github.com/milagroscuello/AtrapameSiPuedes",
        demo: "#"
    },
];
const grid = document.getElementById("projectsGrid");