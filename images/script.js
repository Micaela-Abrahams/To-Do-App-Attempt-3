// Adding an event listener for the Load Event
window.addEventListener('load',() => {
    todos =JSON.parse(localStorage.getItem('todos')) || [];
    const newTodoForm = document.querySelector('#todo-form');

    newTodoForm.addEventListener('submit', e => {
        e.preventDefault();

        const todo = {
            content: e.target.elements.content.value, //This is to display the list items the user created.//
            done: false,//Item will be displayed as incomplete.//
            date: e.target.elements.date.value, //This will display the date input the user has selected.//
            createdAt: new Date().getTime()//This will show when the to do item was created in the local storage.//
        }

        //This adds the newly created todo list item to the "Things To Do" list.//
        todos.push(todo);

        //Newly created todo item will get saved to the Local Storage.//
        localStorage.setItem('todos', JSON.stringify(todos));

        //Reset input field when new todo gets added.//
        e.target.reset();
        displayTaskElement()
    })
})