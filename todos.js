let todoList = {
  todos : [],
  addTodo : function(todoText) {
    this.todos.push({
      todoText : todoText,
      completed : false,
    });    
  },
  changeTodo : function(position, todoText) {
    this.todos[position].todoText = todoText;
  },
  deleteTodo : function(position) {
    this.todos.splice(position, 1);
  },
  toggleCompleted : function(position) {
    let todo = this.todos[position];
    todo.completed = !todo.completed;
  },
  toggleAll : function() {
    let totalTodos = this.todos.length;
    let completedTodos = 0;

    // Get number of total todos
    for (let i = 0; i < totalTodos; i++) {
      if (this.todos[i].completed) {
        completedTodos++;
      }
    }

    // Case 1: If everything's true, make everything false.
    if (completedTodos === totalTodos) {
      for (let i = 0; i < totalTodos; i++) {
        this.todos[i].completed = false;
      }
    // Case 2: Otherwise, make everything true.
    } else {
      for (let i = 0; i < totalTodos; i++) {
        this.todos[i].completed = true;
      }
    }
  }
};

let handlers = {
  addTodo : function() {
    let addTodoTextInput = document.getElementById('addTodoTextInput');
    todoList.addTodo(addTodoTextInput.value);
    addTodoTextInput.value = '';
    view.displayTodos();
  },

  changeTodo : function() {
    let changeTodoPositionInput = document.getElementById('changeTodoPositionInput');
    let changeTodoTextInput = document.getElementById('changeTodoTextInput');
    todoList.changeTodo(changeTodoPositionInput.valueAsNumber, changeTodoTextInput.value);
    changeTodoPositionInput.value = '';
    changeTodoTextInput.value = '';
    view.displayTodos();
  },

  deleteTodo : function(position) {
    todoList.deleteTodo(position);
    view.displayTodos();
  },

  toggleCompleted : function() {
    let toggleCompletedPositionInput = document.getElementById('toggleCompletedPositionInput');
    todoList.toggleCompleted(toggleCompletedPositionInput.valueAsNumber);
    toggleCompletedPositionInput.value = '';
    view.displayTodos();
  },

  toggleAll : function() {
    todoList.toggleAll()
    view.displayTodos();
  }
};

let view = {
  displayTodos: function() {
    let todosUl = document.querySelector('ul');
    todosUl.innerHTML = '';
    
    let length = todoList.todos.length;
    for (let i = 0; i < length; i++) {
      let todosLi = document.createElement('li');
      let todo = todoList.todos[i];
      let todoTextWithCompletion = '';
      
      if (todo.completed) {
        todoTextWithCompletion = '(x) ' + todo.todoText;
      } else {
        todoTextWithCompletion = '( ) ' + todo.todoText;
      }

      todosLi.id = i;
      todosLi.textContent = todoTextWithCompletion;
      todosLi.appendChild(this.createDeleteButton());
      todosUl.appendChild(todosLi);
    }
  },
  createDeleteButton : function() {
    let deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'deleteButton';
    return deleteButton;
  },
  setUpEventListeners : function() {
    let todosUL = document.querySelector('ul');
    todosUL.addEventListener('click', function(event) {

      // Get element that was clicked on.
      let elementClicked = event.target;

      // Check if elementClicked is a delete button.
      if (elementClicked.className == 'deleteButton') {
        handlers.deleteTodo(parseInt(elementClicked.parentNode.id));
      }
    });
  }
};

document.addEventListener('DOMContentLoaded', view.setUpEventListeners());
