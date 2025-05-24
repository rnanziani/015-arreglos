// Tareas iniciales
let tasks = [
];

const taskList = document.getElementById('task-list');
const totalTasks = document.getElementById('total-tasks');
const completedTasks = document.getElementById('completed-tasks');
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');

// Renderizar tareas
function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach(task => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${task.id}</td>
      <td>${task.description}</td>
      <td>
        <input type="checkbox" ${task.completed ? 'checked' : ''} aria-label="Marcar como completada" onchange="toggleTask(${task.id})">
      </td>
      <td>
        <button aria-label="Eliminar tarea" onclick="deleteTask(${task.id})">❌</button>
      </td>
    `;
    taskList.appendChild(row);
  });
  totalTasks.textContent = tasks.length;
  completedTasks.textContent = tasks.filter(t => t.completed).length;
}

// Agregar tarea
taskForm.onsubmit = function(e) {
  e.preventDefault();
  const description = taskInput.value.trim();
  if (description) {
    const newTask = {
      id: Date.now(),
      description,
      completed: false
    };
    tasks.push(newTask);
    taskInput.value = '';
    renderTasks();
  }
};

// Eliminar tarea
window.deleteTask = function(id) {
  tasks = tasks.filter(task => task.id !== id);
  renderTasks();
};

// Cambiar estado de completada
window.toggleTask = function(id) {
  const task = tasks.find(task => task.id === id);
  if (task) {
    task.completed = !task.completed;
    renderTasks();
  }
};

// Inicializar
renderTasks();
