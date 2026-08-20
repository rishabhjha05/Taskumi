const goals = JSON.parse(localStorage.getItem('data')) || {};
let completedGoals = Object.values(goals).filter(
  (task) => task.completed,
).length;

const progValue = document.querySelector('.progress-value');
const progQuote = document.querySelector('.progress-quote');
function changeProgQuote(num,noOfTask) {
  if (num === 0)
    progQuote.innerText = 'Raise the bar by completing your goals!';
  else if (num === 1) progQuote.innerText = 'Well begun, is half done';
  else if (num === 2) progQuote.innerText = `You are nailing it!`;
  else if (num === 3 && noOfTask>3) progQuote.innerText = `Just few step away, keep going...`;
  else if (num == 4) progQuote.innerText = `Don't give up u are almost there!`;
  else progQuote.innerText = `whooo! you've killed it all`;
}
function changeProgress() {
  completedGoals = Object.values(goals).filter((task) => task.completed).length;
  if(completedGoals==0)
    progValue.innerHTML = `<span></span>`;
  else 
    progValue.innerHTML = `<span>${completedGoals}/${noOfTask} completed</span>`;
  progValue.style.width = `${(completedGoals / noOfTask) * 100}%`;
  changeProgQuote(completedGoals,noOfTask);
}
function addtask(id) {
  const task = document.createElement('div');
  task.classList.add('task');
  const customCheckBox = document.createElement('div');
  customCheckBox.classList.add('custom-checkBox');
  const checkImg = document.createElement('img');
  checkImg.src = './media/check.svg';
  customCheckBox.append(checkImg);
  const input = document.createElement('input');
  input.setAttribute('type', 'text');
  input.setAttribute('placeholder', 'Add new goal...');
  input.setAttribute('id', `task${id}`);

  task.append(customCheckBox);
  task.append(input);
  console.log(task);
  document.querySelector('.task-container').append(task);
  update();
}
let noOfTask = 3;
let mx = 3;
for (const key in goals) {
  mx = Math.max(mx, +key[4]);
}
while (noOfTask < mx) {
  noOfTask++;
  addtask(noOfTask);
}

console.dir(progQuote);
progValue.style.width = `${(completedGoals / 3) * 100}%`;
progValue.innerHTML = `<span>${completedGoals}/3 completed</span>`;
changeProgQuote(completedGoals);
function updateCustomCheckBox() {
  const checkbox = document.querySelectorAll('.custom-checkBox');
  console.log(checkbox);
  checkbox.forEach((box) => {
    box.addEventListener('click', () => {
      const inputFields = [...document.querySelectorAll('.task input')];
      console.log(inputFields);
      const isAllFieldFilled = inputFields.every((input) => {
        return input.value;
      });
      if (isAllFieldFilled) {
        box.closest('.task').classList.toggle('task-completed');

        inputId = box.parentElement.querySelector('input').id;
        goals[inputId].completed = !goals[inputId].completed;
        changeProgress();
        localStorage.setItem('data', JSON.stringify(goals));
      } else document.querySelector('.error-msg').classList.add('throw-error');
    });
  });
}
function update() {
  const inputFields = [...document.querySelectorAll('.task input')];
  inputFields.forEach((input) => {
    input.addEventListener('focus', () => {
      document.querySelector('.error-msg').classList.remove('throw-error');
      const error = document.querySelector('.sec-error');
      error.classList.remove('throw-error');
    });
    if (goals[input.id]) {
      input.value = goals[input.id].goal;
      if (goals[input.id].completed)
        input.parentElement.classList.add('task-completed');
    }
    input.addEventListener('input', (e) => {
      if (goals[input.id] && goals[input.id].completed) {
        input.value = goals[input.id].goal;
        return;
      }
      goals[input.id] = {
        goal: input.value,
        completed: false,
      };
      localStorage.setItem('data', JSON.stringify(goals));
      console.log(JSON.stringify(goals));
    });
  });
}

update();
updateCustomCheckBox();
changeProgress()

let taskCount = 3;
const addTask = document.querySelector('.add-task');
addTask.addEventListener('click', (e) => {
  if (noOfTask < 5) {
    noOfTask++;
    addtask(noOfTask);
    const box = document
      .querySelector(`#task${noOfTask}`)
      .parentElement.querySelector('.custom-checkBox');
    box.addEventListener('click', () => {
      const inputFields = [...document.querySelectorAll('.task input')];
      console.log(inputFields);
      const isAllFieldFilled = inputFields.every((input) => {
        return input.value;
      });
      if (isAllFieldFilled) {
        console.log(box.parentElement);
        box.parentElement.classList.toggle('task-completed');
        inputId = box.parentElement.querySelector('input').id;
        goals[inputId].completed = !goals[inputId].completed;
        changeProgress();
        localStorage.setItem('data', JSON.stringify(goals));
      } else document.querySelector('.error-msg').classList.add('throw-error');
    });
    changeProgress();

  } else {
    const error = document.querySelector('.sec-error');
    error.classList.add('throw-error');
  }
});

const clearBtn = document.querySelector('.clear-all');
clearBtn.addEventListener('click', (e) => {
  localStorage.clear();
  [...document.querySelectorAll('.task')].forEach((task) => {
    console.log(task.querySelector('input').id);
    task.querySelector('input').value = '';
    task.classList.remove('task-completed');
    goals[task.querySelector('input').id] = {
      goal: '',
      completed: false,
    };
    completedGoals=0;
    changeProgress();
  });
});
