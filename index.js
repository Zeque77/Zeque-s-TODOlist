const addForm = document.querySelector(".add");
const tasks = document.querySelector(".tasks");
const clearAll = document.querySelector(".clear");
const msgSpan = document.querySelector(".message span");
const searchForm = document.querySelector(".search");

function updateMsg() {
  const textLenght = tasks.children.length;
  msgSpan.textContent = `You have ${textLenght} pending tasks.`;
}
updateMsg();

addForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const value = addForm.task.value.trim();

  if (value.length) {
    tasks.innerHTML += `<li class="list-group-item d-flex justify-content-between align-items-center pe-0">
                                <div class="fs-4">${value}</div>
                                <span class="btn btn-outline-secondary border py-0 delete"><i class="bi bi-check-circle fs-5"></i></span>
                            </li>`;
    addForm.reset();
    updateMsg();
  }
});

tasks.addEventListener("click", (event) => {
  if (event.target.classList.contains("delete")) {
    event.target.parentElement.remove();
  }
  updateMsg();
});

clearAll.addEventListener("click", (event) => {
  const taskItems = tasks.querySelectorAll("li");
  taskItems.forEach((item) => {
    item.remove();
  });
  updateMsg();
});

function filterTask(term) {
  Array.from(tasks.children)
    .filter((task) => {
      return !task.textContent.toLowerCase().includes(term);
    })
    .forEach((task) => {
      task.classList.remove("d-flex");
      task.classList.add("hide");
    });

  Array.from(tasks.children)
    .filter((task) => {
      return task.textContent.toLowerCase().includes(term);
    })
    .forEach((task) => {
      task.classList.add("d-flex");
      task.classList.remove("hide");
    });
}

searchForm.addEventListener("keyup", (event) => {
  const term = searchForm.task.value.trim().toLowerCase();
  filterTask(term);
});

searchForm.addEventListener("click", (event) => {
  if (event.target.classList.contains("reset")) {
    searchForm.reset();
    const term = searchForm.task.value.trim();
    filterTask(term);
  }
});
