//<div class="card" draggable="true"> <div class="status todo"></div> <div class="content">Dinamicamente.</div></div>
const data = {
  "Gerência": { "func": ["Ana Carolina", "Janete", "Laiz"], "atv": ["atv1", "atv2", "atv3"] },
  "Certificado Digital": {"func":["Ana Leticia"]},
  "Pessoal": {"func":["Barbara", "Nara"]},
  "Fiscal": {"func":["Edimarcos", "Marilía"]},
  "Suporte T.I.": {"func":["Gabriel"]},
  "Legalização de empresas": {"func":["Guilherme", "Lucas"]},
  "Financeiro": {"func":["Jéssica"]},
  "Secretaria": {"func":["Luísa"]},
  "Contabil": {"func":["Mariana", "Michele", "Natália"]}
}

const formTask = document.getElementById('addTask');
const task = document.getElementById('task');

formTask.addEventListener('submit', (event) => {
  if (task.value != '') {
    addCard(task.value);
    task.value = '';
  }
  event.preventDefault();
})

// QUando o usuário clica no botão de +
function addCard(value) {
  // Transformando o objeto 'data' em um Map
  const depto = Object.keys(data);
  
  // Gerando as opções para o select dos departamentos
  const options = depto.map(d => {
    return `<option value="${d}">${d}</option>`;
  }).join('');  // Junta todas as opções em uma única string

  const todo = document.querySelector('#todo');
  const newCard = document.createElement("div");
  newCard.classList.add('card');
  newCard.draggable = true;
  
  // HTML inicial do card
  newCard.innerHTML = `
    <div class="status todo"></div>
    <div class="content"><p>${value}</p></div>
    <hr>
    <div class="dropdown-container">
      <label for="task-options">Departamento:</label>
      <select id="task-options" name="task-options">
        <option value="*">Não escolhido</option>
        ${options}
      </select>
    </div>
    <div class="employee-dropdown">
      <label for="employee-options">Funcionário:</label>
      <select id="employee-options" name="employee-options">
        <option value="*">Nenhum</option>
      </select>
    </div>
    <div class="activity-dropdown">
      <label for="activity-options">Atividade:</label>
      <select id="activity-options" name="activity-options">
        <option value="*">Nenhuma</option>
      </select>
    </div>
  `;

  // Adicionando o evento 'change' no select do departamento para atualizar a lista de funcionários e atividades
  const selectDept = newCard.querySelector('#task-options');
  const selectEmployee = newCard.querySelector('#employee-options');
  const selectActivity = newCard.querySelector('#activity-options');
  
  selectDept.addEventListener('change', (event) => {
    const dept = event.target.value;  // O departamento selecionado
    updateEmployeeDropdown(dept, selectEmployee);  // Atualiza a lista de funcionários no dropdown
    updateActivityDropdown(dept, selectActivity);  // Atualiza a lista de atividades no dropdown
  });

  // Adicionando os eventos de arrastar (drag)
  newCard.addEventListener('dragstart', dragStart);
  newCard.addEventListener('drag', drag);
  newCard.addEventListener('dragend', dragEnd);

  todo.appendChild(newCard);
}

// Função para atualizar o dropdown de funcionários
function updateEmployeeDropdown(department, selectEmployee) {
  // Limpa as opções anteriores
  selectEmployee.innerHTML = '<option value="*">Nenhum</option>';

  // Verifica se o departamento foi selecionado e adiciona os funcionários
  if (department !== '*' && data[department]) {
    const employees = data[department].func;
    employees.forEach(employee => {
      const option = document.createElement('option');
      option.value = employee;
      option.textContent = employee;
      selectEmployee.appendChild(option);
    });
  }
}

// Função para atualizar o dropdown de atividades
function updateActivityDropdown(department, selectActivity) {
  // Limpa as opções anteriores
  selectActivity.innerHTML = '<option value="*">Nenhuma</option>';

  // Verifica se o departamento foi selecionado e adiciona as atividades
  if (department !== '*' && data[department] && data[department].atv) {
    const activities = data[department].atv;
    activities.forEach(activity => {
      const option = document.createElement('option');
      option.value = activity;
      option.textContent = activity;
      selectActivity.appendChild(option);
    });
  }
}


const cards = document.querySelectorAll('.card');
const dropZones = document.querySelectorAll('.dropZone');

cards.forEach((card) => {
  card.addEventListener('dragstart', dragStart);
  card.addEventListener('drag', drag);
  card.addEventListener('dragend', dragEnd);
})

function dragStart() {
  dropZones.forEach(dropZone => dropZone.classList.add('highlight'));
  this.classList.add('dragging');

  switch (this.parentElement.id) {
    case 'todo':
      this.firstElementChild.classList.remove('todo');
      break;
    case 'doing':
      this.firstElementChild.classList.remove('doing');
      break;
    case 'done':
      this.firstElementChild.classList.remove('done');
      break;
    case 'garbage':
      this.firstElementChild.classList.remove('todo');
      break;
    default:
      break;
  }
}

function drag() {

}

function dragEnd() {
  dropZones.forEach(dropZone => dropZone.classList.remove('highlight'));
  this.classList.remove('dragging');

  switch (this.parentElement.id) {
    case 'todo':
      this.firstElementChild.classList.add('todo');
      break;
    case 'doing':
      this.firstElementChild.classList.add('doing');
      break;
    case 'done':
      this.firstElementChild.classList.add('done');
      break;
    case 'garbage':
      this.parentElement.removeChild(this);
      break;
    default:
      break;
  }
}

dropZones.forEach(dropZone => {
  dropZone.addEventListener('dragenter', dragEnter);
  dropZone.addEventListener('dragover', dragOver);
  dropZone.addEventListener('dragleave', dragLeave);
  dropZone.addEventListener('drop', drop);
})

function dragEnter() {

}

function dragOver() {
  this.classList.add('over');

  const cardBeingDragged = document.querySelector('.dragging');

  this.appendChild(cardBeingDragged);
}

function dragLeave() {
  this.classList.remove('over');
}

function drop() {
  this.classList.remove('over');
}