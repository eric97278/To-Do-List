let taskList = document.getElementById('taskList');


// Charge les tâches sauvegardées depuis le localStorage ou initialise un tableau vide s'il n'y a pas de tâches sauvegardées.
let todo = JSON.parse(localStorage.getItem('todo')) || [];


//Cette fonction convertit le tableau de tâches en chaîne JSON et la sauvegarde dans le localStorage.
function saveTasks() {
   localStorage.setItem('todo', JSON.stringify(todo));
}

// Cette fonction vide la liste de tâches (taskList.innerHTML = '';) et recrée chaque tâche en ajoutant des boutons pour éditer et supprimer.
function renderTasks() {
   taskList.innerHTML = '';
   todo.forEach(taskText => {
      let li = document.createElement('li');
      li.textContent = taskText;

      let editButton = document.createElement('button');
      editButton.textContent = '✒️';
      editButton.addEventListener('click', function () {
         editTask(li);
      });

      let deleteButton = document.createElement('button');
      deleteButton.textContent = '❌';
      deleteButton.addEventListener('click', function () {
         deleteTask(li);
      });

      li.appendChild(editButton);
      li.appendChild(deleteButton);

      taskList.appendChild(li);
   });
}

// Ajoute une nouvelle tâche au tableau todo, sauvegarde les tâches et met à jour l'affichage.
function addTask() {
   let taskInput = document.getElementById("taskInput");
   let taskText = taskInput.value;

   if (taskText === "") {
      return;
   }

   todo.push(taskText);
   saveTasks();
   renderTasks();

   taskInput.value = "";
}

// Modifie le texte de la tâche, sauvegarde les tâches et met à jour l'affichage.
function editTask(task) {
   let taskIndex = Array.from(taskList.children).indexOf(task);
   let taskText = todo[taskIndex];

   let newTaskText = prompt('Modifier la tâche :', taskText);

   if (newTaskText === null || newTaskText === "") {
      return;
   }

   todo[taskIndex] = newTaskText;
   saveTasks();
   renderTasks();
}

//Supprime la tâche du tableau todo, sauvegarde les tâches et met à jour l'affichage.
function deleteTask(task) {
   let taskIndex = Array.from(taskList.children).indexOf(task);
   todo.splice(taskIndex, 1);
   saveTasks();
   renderTasks();
}
//Charge les tâches sauvegardées et les affiche lorsque la page est chargée
window.addEventListener('load', renderTasks);