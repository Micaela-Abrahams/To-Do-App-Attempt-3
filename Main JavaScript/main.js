window.addEventListener('load', () => {
	//get tasks from local storage and declare tasks array
    tasks = JSON.parse(localStorage.getItem('tasks')) || [];
	const newTaskForm = document.querySelector('#newTaskForm');
	const sortBtn = document.querySelector('#sortBtn');
	const inputField = document.querySelector('#inputField'); //
	
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
			date.innerHTML = `<input type="date" value="${task.date}">`;
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
	
			/*The following code block entails the following when the user clicks the 'Edit' button
			1) When user clicks the edit button, the input field will clear the previous text submitted
			2) In the now empty input field, user can update their task accordingly
			3) Beside the input field, two buttons will appear 'Save' & 'Cancel'
			4) When user clicks the 'Save' button, the updated/edited text that was input in the text field will be updated to the DOM
			5) Should user click 'Cancel', the input field will remain empty*/

			// Event Listeners for the Edit Button
			edit.addEventListener('click', () => {
			// Clear the contents of the input field
			content.innerHTML = '';
		  	const editInput = document.createElement('input'); // Create a new input field for editing the task
			editInput.type = 'text';

			editInput.value = ''; // Clear the text in the input field
  			content.appendChild(editInput);

		  	editInput.focus();// Set the focus on the input field when edit button is clicked
		  
			const saveButton = document.createElement('button'); // Create a save button
			const cancelButton = document.createElement('button') // Create a cancel button

			saveButton.innerHTML = 'Save';
			cancelButton.innerHTML = 'Cancel';

			saveButton.classList.add('save-button');//Class added to the save button
			cancelButton.classList.add('cancel-button');//Class added to the cancel button

			content.appendChild(saveButton);
			content.append(cancelButton);

			// Hide the edit button after the edit button is clicked
  			edit.style.display = 'none';
		  
			// Add a click event listener to the save button
			saveButton.addEventListener('click', () => {
			task.content = editInput.value; // Update the task's content	  	
		  	localStorage.setItem('tasks', JSON.stringify(tasks)); // Update the task in local storage
		  	displayTasks();// Re-render the task list
			edit.style.display = 'inline-block';//Display the Edit Button after the save button is clicked
			});

			//Add a click event listener to the cancel button
			cancelButton.addEventListener('click', () =>{
			cancelButton.style.display = 'none'; //Hide Cancel Button
			saveButton.style.display = 'none'; //Hide Save Button
			edit.style.display = 'inline-block'; //Display Edit Button
			})
		  });
		  
			//Add a click event listener to the delete button
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
			//Add a click event listener to the Sort button
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

