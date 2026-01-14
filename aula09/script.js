// Lista de cursos (poderia vir de uma API real)
const courses = [
  { id: 1, title: "HTML e CSS Básico", level: "Básico", duration: "Curta" },
  { id: 2, title: "JavaScript Intermediário", level: "Intermediário", duration: "Média" },
  { id: 3, title: "React para Iniciantes", level: "Intermediário", duration: "Longa" },
  { id: 4, title: "Bootstrap na Prática", level: "Básico", duration: "Curta" },
  { id: 5, title: "Node.js Avançado", level: "Avançado", duration: "Longa" }
];

const coursesContainer = document.getElementById("coursesContainer");
const searchInput = document.getElementById("searchInput");
const levelFilters = document.querySelectorAll(".filter-level");
const durationFilters = document.querySelectorAll(".filter-duration");

// Função para renderizar os cursos na tela
function renderCourses(filteredCourses) {
  coursesContainer.innerHTML = "";

  if (filteredCourses.length === 0) {
    coursesContainer.innerHTML = '<div id="no-results">Nenhum curso encontrado.</div>';
    return;
  }

  filteredCourses.forEach(course => {
    const div = document.createElement("div");
    div.className = "col-12 col-md-6 col-lg-4 fade-in";

    div.innerHTML = `
      <div class="card course-card h-100">
        <div class="card-body">
          <h5 class="card-title">${course.title}</h5>
          <p class="card-text">Nível: ${course.level}</p>
          <p class="card-text">Duração: ${course.duration}</p>
        </div>
      </div>
    `;

    coursesContainer.appendChild(div);
  });
}

// Função para aplicar filtros e busca
function filterCourses() {
  const searchValue = searchInput.value.toLowerCase();

  const selectedLevels = Array.from(levelFilters)
    .filter(input => input.checked)
    .map(input => input.value);

  const selectedDurations = Array.from(durationFilters)
    .filter(input => input.checked)
    .map(input => input.value);

  const filtered = courses.filter(course => {
    const matchSearch = course.title.toLowerCase().includes(searchValue);
    const matchLevel = selectedLevels.length ? selectedLevels.includes(course.level) : true;
    const matchDuration = selectedDurations.length ? selectedDurations.includes(course.duration) : true;
    return matchSearch && matchLevel && matchDuration;
  });

  renderCourses(filtered);
}

// Eventos para interatividade
searchInput.addEventListener("input", filterCourses);

levelFilters.forEach(input => input.addEventListener("change", filterCourses));
durationFilters.forEach(input => input.addEventListener("change", filterCourses));

// Ao carregar a página renderizamos todos os cursos
renderCourses(courses);
