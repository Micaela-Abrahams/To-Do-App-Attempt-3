window.addEventListener('load', () => {
	//get tasks from local storage and declare tasks array
    tasks = JSON.parse(localStorage.getItem('tasks')) || [];
	const newTaskForm = document.querySelector('#newTaskForm');
	const sortBtn = document.querySelector('#sortBtn');

	//Submit form when 'Add' button clicked
	newTaskForm.addEventListener('submit', e => {
		e.preventDefault();

		//Task Object
		const task = {
    	content: e.target.elements.taskInput.value,
    	date: e.target.elements.dueDate.value,
    	done: false,
    	createdAt: new Date().getTime()
  		};

		//New tasks to be stored - Array
		tasks.push(task);

		// Task array to be stored to Local Storage
		localStorage.setItem('tasks', JSON.stringify(tasks));

		// Append the new task to the task list
		const taskItem = document.createElement('div');
		taskItem.classList.add('taskItem');

		taskList.appendChild(taskItem);

		// Reset the form
		e.target.reset();

		displayTasks()
	})
	displayTasks()
})

//Display Tasks entered in DOM
function displayTasks () {
	const taskList = document.querySelector('#taskList');
	const completedList = document.querySelector('#completedList');

	taskList.innerHTML = '';
	completedList.innerHTML = '';

	const completedListH3 = document.createElement('h3');
	completedListH3.innerHTML = 'Completed Tasks:';
	completedList.appendChild(completedListH3);

	tasks.forEach(task => {
		const taskItem = document.createElement('div');
		taskItem.classList.add('taskItem');

		const label = document.createElement('label');
		const input = document.createElement('input');
		const span = document.createElement('span');
		const content = document.createElement('div');
		const actions = document.createElement('div');
		const edit = document.createElement('button');
		const deleteButton = document.createElement('button');
		const date = document.createElement('div');
		
		input.type = 'checkbox';
		input.checked = task.done;
		
		content.classList.add('taskContent');
		date.classList.add('taskDate');
		actions.classList.add('actions');
		edit.classList.add('edit');
		deleteButton.classList.add('delete');
		
		content.innerHTML = `<input type="text" value="${task.content}" readonly>`;
		date.innerHTML = `<input type="date" value="${task.date}" readonly>`;
		edit.innerHTML = 'Edit';
		deleteButton.innerHTML = 'Delete';
		
		label.appendChild(input);
		label.appendChild(span);
		
		actions.appendChild(edit);
			
		taskItem.appendChild(label);
		taskItem.appendChild(content);
		taskItem.appendChild(date);
		taskItem.appendChild(actions);
		
		
		input.addEventListener('change', () => {
			if (input.checked) {
			  content.classList.add('completed');
			  actions.removeChild(edit);
			  label.removeChild(input);
			  label.removeChild(span);
			  taskItem.appendChild(deleteButton);
			  completedList.appendChild(taskItem);
			  task.movedToCompleted = true;
			} else {
			  content.classList.remove('completed');
			  content.classList.add('completed');
			  actions.removeChild(edit);
			  label.removeChild(input);
			  label.removeChild(span);
			  taskItem.appendChild(deleteButton);
			  completedList.appendChild(taskItem);
			  task.movedToCompleted = false;

			//   if (task.movedToCompleted) {
			// 	taskItem.appendChild(edit);
			// 	taskList.appendChild(taskItem);
			// 	task.movedToCompleted = true;
			//   }
			}
		  })

		// if (task.date == '') {
		// 	date.classList.add('taskDateBlank');
		// }
		
		// if (task.done) {
		// 			taskItem.classList.add('done');
		// 		}
				
		// 		input.addEventListener('change', (e) => {
		// 			task.done = e.target.checked;
		// 			localStorage.setItem('tasks', JSON.stringify(tasks));

		// 			if (task.done) {
		// 				taskItem.classList.add('done');
		// 			} else {
		// 				taskItem.classList.remove('done');
		// 			}

		// 			displayTasks()

		// 		})

		// edit.addEventListener('click', (e) => {
		// 	const input = content.querySelector('input');
		// 	input.removeAttribute('readonly');
		// 	input.focus();
			
		// 	input.addEventListener('blur', (e) => {
		// 		input.setAttribute('readonly', true);
		// 		task.content = e.target.value;
		// 		localStorage.setItem('tasks', JSON.stringify(tasks));
		// 		displayTasks()
		// 	})
		// })

		edit.addEventListener('click', () => {
			content.innerHTML = `<input type="text" value="${task.content}">`;
			date.innerHTML = `<input type="date" value="${task.date}">`;
			edit.innerHTML = 'Save';

		});

		// edit.addEventListener('click', (e) => {
			
		// 	const dateInput = content.querySelector('dueDate');
		// 	dateInput.removeAttribute('readonly');
		// 	dateInput.focus();
			
		// 	dateInput.addEventListener('blur', (e) => {
		// 		dateInput.setAttribute('readonly', true);
		// 		task.date = e.target.value;
		// 		localStorage.setItem('tasks', JSON.stringify(tasks));
		// 		displayTasks()
		// 	})
		// }) 

		edit.addEventListener('click', () => {
			task.content = content.querySelector('input').value;
			task.date = date.querySelector('input').value;
			content.innerHTML = `<input type="text" value="${task.content}" readonly>`;
			date.innerHTML = `<input type="date" value="${task.date}" readonly>`;
			edit.innerHTML = 'Edit';
			localStorage.setItem('tasks', JSON.stringify(tasks));
		  });
		
		//Functionality for 'Delete' Button
		// deleteButton.addEventListener('click', (e) => {
		// 	tasks = tasks.filter(t => t != task);
		// 	localStorage.setItem('tasks', JSON.stringify(tasks));
		// 	displayTasks()
		// })

		deleteButton.addEventListener('click', () => {
			tasks.splice(tasks.indexOf(task), 1);
			localStorage.setItem('tasks', JSON.stringify(tasks));
			completedList.removeChild(taskItem);
		  });
		  


		  if (task.done) {
			content.classList.add('completed');
			actions.removeChild(edit);
			label.removeChild(input);
			label.removeChild(span);
			taskItem.appendChild(deleteButton);
			completedList.appendChild(taskItem);
		  } else {
			taskList.appendChild(taskItem);
		  }
			});

}

//Listen for sort button being clicked
sortBtn.addEventListener('click', (e,)=> {
	//Sort task objects in tasks array alphabetically
	tasks.sort((a, b) => {
		let ca = a.content.toLowerCase(),
			cb = b.content.toLowerCase();
	
		if (ca < cb) {
			return -1;
		}
		if (ca > cb) {
			return 1;
		}
		return 0;
	});
	//Store re-ordered tasks to local storage
	localStorage.setItem('tasks', JSON.stringify(tasks));		
	displayTasks();
})

