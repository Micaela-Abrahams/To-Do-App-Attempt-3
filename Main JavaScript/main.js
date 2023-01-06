window.addEventListener('load', () => {
	//get tasks from local storage and declare tasks array
    tasks = JSON.parse(localStorage.getItem('tasks')) || [];
	const newTaskForm = document.querySelector('#newTaskForm');
	const sortBtn = document.querySelector('#sortBtn');

	// To-Do items are sorted alphabetically after the session has been refreshed
	tasks.sort((a, b) => a.content.localeCompare(b.content));


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

	//H3 element created to display "Completed Task title"
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

		// An event listener is added to the input element to listen for a change event (when the checkbox is checked or unchecked)
		// If checkbox is checked the task is done - moved to completed list
		//If checkbox is unchecked the task remains "Incompleted"
		input.addEventListener('change', () => {
		task.done = input.checked;
		localStorage.setItem('tasks', JSON.stringify(tasks));
		displayTasks();
		  });
		
		content.classList.add('taskContent');
		date.classList.add('taskDate');
		actions.classList.add('actions');
		edit.classList.add('edit');

		deleteButton.classList.add('delete');
		
		content.innerHTML = `<input type="text" value="${task.content}">`;
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

		
    // Append the task item to the task list
    	taskList.appendChild(taskItem);
	
		
		// edit.addEventListener('click', () => {
		// 	content.innerHTML = `<input type="text" value="${task.content}">`;
		// 	date.innerHTML = `<input type="date" value="${task.date}">`;
		// 	edit.innerHTML = 'Save';

		// });

		// Event Listeners for the Edit & Save Buttons
		edit.addEventListener('click', () => {
			// Clear the contents of the input field
			content.innerHTML = '';
		  
			// Create a new input field for editing the task
			const editInput = document.createElement('input');
			editInput.type = 'text';

			// Clear the text in the input field
  			editInput.value = '';
  			content.appendChild(editInput);

		  	// Set the focus on the input field when edit button is clicked
			editInput.focus();
		  
			// Create a save button
			const saveButton = document.createElement('button');
			saveButton.innerHTML = 'Save';
			saveButton.classList.add('save-button');//Class added to the save button
			content.appendChild(saveButton);

			// Hide the edit button after the edit button is clicked
  			edit.style.display = 'none';
		  
			// Add a click event listener to the save button
			saveButton.addEventListener('click', () => {
			  // Update the task's content
			  task.content = editInput.value;
		  
			  // Update the task in local storage
			  localStorage.setItem('tasks', JSON.stringify(tasks));
		  
			  // Re-render the task list
			  displayTasks();

			  // Show the edit button again after the save button is clicked
    		 edit.style.display = 'inline-block';
			});
		  });
		  
		//Functionality for 'Delete' Button
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

