/*
Given an API returning a list of todos, we want to display the list in a performant way.

Here are the functional requirements:
- Initially, display the first 20 todos. 
- On the top of the page, display the total number of loaded todos.
- Display a "Load More" button, and every time the user clicks on it, fetch and display 20 more todos.
- When the total number of loaded todos reaches 100, the "Load More" button should be hidden.

Use this endpoint URL to get the todos: https://dummyjson.com/todos?limit=20&skip=0.

You may change the skip and limit query params to load new todos. The endpoint will return the following structure with a total of 20 todos:
{
  "todos": [
    {
      "id": 1,
      "todo": "Do something nice for someone I care about",
      "completed": true,
      "userId": 26
    },
  ],
}
*/

const state = {
  cursor: 0
};

function formURL() {
  return `https://dummyjson.com/todos?limit=20&skip=${state.cursor}`;
}

const list = document.getElementById('todo-list');
const counter = document.getElementById('total-loaded');

async function loadMoreTodos() {
  console.log(`Loading TODOS from ${state.cursor} to ${state.cursor + 20}`);
  
  const res = await fetch(formURL());
  if(!res.ok) {
    // catch the error
  }
  
  const { todos } = await res.json();
  state.cursor += 20;
  counter.innerHTML = state.cursor;
  // append todos to the list
  const elements = todos.forEach(todo => {
    const node = document.createElement('li');
    node.innerText = todo.todo;
    list.appendChild(node)
  })
  
  if(state.cursor == 100) {
    button.remove();
  }
}

const button = document.getElementById('load');
button.addEventListener('click', loadMoreTodos);

loadMoreTodos();
