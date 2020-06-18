let todoList = {
  todos : [],
  displayTodos : function () { 
    let length = this.todos.length; 
        
    if (length === 0) {
      console.log('Your todo list is empty!');
    } else {
      console.log('My todos:');
      for (let i = 0; i < length; i++) {
        if (this.todos[i].completed) {
          console.log('(x)', this.todos[i].todoText);          
        } else {
          console.log('( )', this.todos[i].todoText);
        }   
      }
    }
  },
  addTodo : function (todoText) {
    this.todos.push({
      todoText : todoText,
      completed : false,
    });
    this.displayTodos();    
  },
  changeTodo : function (position, todoText) {
    this.todos[position].todoText = todoText;
    this.displayTodos();
  },
  deleteTodo : function (position) {
    this.todos.splice(position, 1);
    this.displayTodos();
  },
  toggleCompleted : function (position) {
    let todo = this.todos[position];
    todo.completed = !todo.completed;
    this.displayTodos();
  },
  toggleAll : function () {
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
    this.displayTodos();
  }
};

let handlers = {
  displayTodos : () => todoList.displayTodos(),
  
  toggleAll : () => todoList.toggleAll(),
  
  addTodo : () => {
    let addTodoTextInput = document.getElementById('addTodoTextInput');
    todoList.addTodo(addTodoTextInput.value);
    addTodoTextInput.value = '';
  },

  changeTodo : () => {
    let changeTodoPositionInput = document.getElementById('changeTodoPositionInput');
    let changeTodoTextInput = document.getElementById('changeTodoTextInput');
    todoList.changeTodo(changeTodoPositionInput.valueAsNumber, changeTodoTextInput.value);
    changeTodoPositionInput.value = '';
    changeTodoTextInput.value = '';
  }
};