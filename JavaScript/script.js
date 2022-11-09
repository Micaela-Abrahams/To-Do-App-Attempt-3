
// INITIAL JAVASCRIPT BELOW

// // Adding an event listener for the Load Event
//     window.addEventListener('load', () => { 
//     todos = JSON.parse(localStorage.getItem('todos')) || [];

//     // querySelector('todo-form')
//     const newTodoForm = document.querySelector('#new-todo-form');

//     newTodoForm.addEventListener('submit', e => {
//         e.preventDefault();

//         const todo = {
//             content: e.target.elements.content.value, //This is to display the list items the user created.//
//             done: false,//Item will be displayed as incomplete.//
//             date: e.target.elements.date.value, //This will display the date input the user has selected.//
//             createdAt: new Date().getTime()//This will show when the to do item was created in the local storage.//
//         }

//         //This adds the newly created todo list item to the "Things To Do" list.//
//         todos.push(todo);

//         //Newly created todo item will get saved to the Local Storage.//
//         localStorage.setItem('todos', JSON.stringify(todos));

//         //Reset input field when new todo gets added.//
//         e.target.reset();
//     })
//         displayTaskElement()
// })


// //The below function will display the created todo list items.//
// function displayTaskElement() { 
//     const todoList = document.querySelector('#todo-list');
//     todoList.innerHTML = "";

// // Array section of the script
//     todos.forEach(todo => {
//         const todoItem = document.createElement('div');
//         todoItem.classList.add('todo-item');

//         const label = document.createElement('label');
//         const input = document.createElement('input');
//         const span = document.createElement('span');
//         const content = document.createElement('div');
//         const date = document.createElement('div'); //Display of date the user selected
//         const actions = document.createElement('div');
//         const edit = document.createElement('button');//New button created = edit
//         const deleteButton = document.createElement('button');//New button created = delete

//         input.type = 'checkbox';
//         input.checked = todo.done;
//         //Once all the above has been executed the class of strike-through.
//         span.classList.add('checkthrough');

//         date.classList.add('todo-date');
//         content.classList.add('todo-content');
//         actions.classList.add('actions');
//         edit.classList.add('edit');
//         deleteButton.classList.add('delete');

//         //Where the date the user input will be displayed as 'readonly', this cannot be changed or edited
//         date.innerHTML = `<input type="date" value="${todo.date}" readonly`;
//         content.innerHTML = `<input type="text" value="${todo.content}" readonly`;
//         //Edit button created fpr users to edit their todo items.
//         edit.innerHTML = "Edit";
//         //Delete button created for users to delete the todo's they no longer want to be displayed.
//         deleteButton.innerHTML = "Delete";


//         label.appendChild(input);
//         label.appendChild(span);
//         actions.appendChild(edit);
//         actions.appendChild(deleteButton);
//         todoItem.appendChild(label);
//         todoItem.appendChild(content);
//         todoItem.appendChild(date);
//         todoItem.appendChild(actions);
//         todoItem.appendChild(todoItem);

//     if (todo.done){
//         todoItem.classList.add('done');
//     }

//     input.addEventListener('change', (e) =>{
//         todo.done = e.target.checked;
//         localStorage.setItem('todos', JSON.stringify(todos));

//         if(todo.done){
//             todoItem.classList.add("done");
//         } else{
//             todoItem.classList.remove("done");
//         }

//         displayTaskElement()
//     })

//     //Functionality for users to edit their todo list items.

//     // Edit Button
//     edit.addEventListener('click', (e) => {
//         const input = content.querySelector('input');
//         input.removeAttribute('readonly');
//         input.focus();
//         input.addEventListener('blur', (e) => {
//             input.setAttribute('readonly', true);
//             todo.content = e.target.value;
//             localStorage.setItem('todos', JSON.stringify(todos));
//             displayTaskElement()
//          })
// })
//     // Delete Button
//     deleteButton.addEventListener('click', (e) => {
//         todos = todos.filter(t => t != todo);
//         localStorage.setItem('todos', JSON.stringify(todos));
//         displayTaskElement()
//         })
//     })
// }

// //Below is the code to sort the todo list items in alphabetical order
// function sortAlphabetically() {
//     var list, i, switching, listitems, shouldSwitch;
//     list = document.getElementById('todo-list');
//     switching = true;

//     while(switching){
//         switching = false;
//         listitems = list.getElementsByClassName('todo-item');

//         for(i = 0; i < (listitems.length - 1); i++) {
//             shouldSwitch = false;
//             if (listitems[i].innerHTML.toLowerCase() > listitems [i + 1].innerHTML.toLocaleLowerCase()){
//                 shouldSwitch = true;
//                 break;
//             }
//         }
//         if (shouldSwitch){
//             listitems [i].parentNode.insertBefore(listitems [i + 1], listitems[i]);
//             switching = true;
//         }
//     }
// }
