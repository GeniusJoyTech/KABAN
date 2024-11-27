//<div class="card" draggable="true"> <div class="status todo"></div> <div class="content">Dinamicamente.</div></div>

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
  const todo = document.querySelector('#todo');
  const newCard = document.createElement("div");
  newCard.classList.add('card');
  newCard.draggable = true;
  newCard.innerHTML = `
    <div class="status todo"></div>
    <div class="content"><p>${value}</p></div>
    <hr>
    <div class="dropdown-container">
      <label for="task-options">Departamento:</label>
      <select id="task-options" name="task-options">
        <option value="*">Não escolhido</option>
        <option value="Fiscal">Fiscal</option>
        <option value="Contábil">Contábil</option>
        <option value="Pessoal">Pessoal</option>
        <option value="Escrita">Escrita</option>
        <option value="Supervisão">Supervisão</option>
        <option value="Suporte">Suporte</option>
      </select>
    </div>
    <div class="dropdown-container">
    
      <label for="task-options1">Responsável:</label>
      <select id="task-options1" name="task-options">
        <option value="*">Não escolhido</option>
        <option value="Ana Carolina">Ana Carolina</option>
        <option value="Ana Leticia">Ana Leticia</option>
        <option value="Barbara">Barbara</option>
        <option value="Edimarcos">Edimarcos</option>
        <option value="Gabriel">Gabriel</option>
        <option value="Guilherme">Guilherme</option>
        <option value="Janete">Janete</option>
        <option value="Jéssica">Jéssica</option>
        <option value="Laiz">Laiz</option>
        <option value="Lucas">Lucas</option>
        <option value="Luísa">Luísa</option>
        <option value="Mariana">Mariana</option>
        <option value="Marilía">Marilía</option>
        <option value="Nara">Nara</option>
      </select>
      </div>
      <div class="dropdown-container">

      <label for="task-options2">Atividade:</label>
      <select id="task-options" name="task-options">
        <option value="*">Não escolhido</option>
        <option value="opcao2">Atividade1</option>
        <option value="opcao2">Atividade2</option>
        <option value="opcao2">Atividade3</option>
      </select>
      </div>
  `;
  newCard.addEventListener('dragstart', dragStart);
  newCard.addEventListener('drag', drag);
  newCard.addEventListener('dragend', dragEnd);
  todo.appendChild(newCard);
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