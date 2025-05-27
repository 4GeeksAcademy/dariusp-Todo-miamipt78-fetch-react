import React, {useState,useEffect} from "react"


const TodoHeader = () => {
    const [newTodo, setNewTodo] = useState("")
    const [counter, setCounter] = useState(0)
    const [todos, setTodos] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    //function to fetch the data from a user's todos
    useEffect(() => {
        function fetchData(){
            fetch('https://playground.4geeks.com/todo/users/Darius')
            .then(response => {if (!response.ok) {throw new Error(response.status)}return response.json()})
            .then(data => setTodos(data.todos))
            .catch(error => {console.log('There is a problem', error)})
        }
        fetchData()
    }, [])


    //validate Input, if nothing is entered alert!, if validation passes add the task
    const validateInput = () => {
        if (!newTodo || newTodo === "" || newTodo === undefined) {
            alert("Please enter a value")}
            else {console.log("newTodo text validated!");
            addTask()
            }
        }
    
        //Add the new Task, first POST to get ID's then if i get a response add the new task to the array and clear the input box
const addTask = async () => {
  try {
    const newTodoObj = {
      label: newTodo.trim()
    };

    const response = await fetch("https://playground.4geeks.com/todo/todos/Darius", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTodoObj)
    });

    if (!response.ok) throw new Error('Failed to create todo');

    const createdTodo = await response.json();

    setTodos(prev => [...prev, createdTodo]);
    setNewTodo("");

  } catch (error) {
    console.error('Error adding todo:', error);
  }
};




//Clear List of tasks
    const clearTask = async () => {

        try {
        const deleteAlltask  =  todos.map(todo => fetch(`https://playground.4geeks.com/todo/todos/${todo.id}`, {
        method: 'DELETE'
    })
)
 const responses = await Promise.all(deleteAlltask);

        const allSuccessful = responses.every(r => r.ok);
        if (!allSuccessful) {
            const failedResponses = responses.filter(failedResponse => !failedResponse.ok);
            throw new Error(`${failedResponses.length} deletions failed`);
        }
        setTodos([])
        
        console.log('All tasks deleted successfully');
    } catch (error) {
        console.error('Error deleting tasks:', error);
        throw error;
    }
}



//Delete the Task
const todoRemove = async(todoRemove) => {
    const response = await fetch(`https://playground.4geeks.com/todo/todos/${todoRemove.id}`, {
        method: 'DELETE',
        body: JSON.stringify({ force: true }),
        headers: {
        'Content-Type': 'application/json',
        }
    })
    if (!response.ok) {
        const errorData = await response.json();
        console.error('Full error response:', errorData);
      throw new Error(`HTTP error! status: ${response.status}`);
    }
        setTodos(todos.filter(todo => todo.id !== todoRemove.id));
        console.log('Task deleted successfully')
}

       
//Display the quantity of tasks remaining
const tasksRemainder = 
     todos.length > 1 || todos.length === 0 ? "Tasks Left" : "Task Left"

    return (
        <>

            <div className="container">
            <header className="todo-header text-center">
            <h1>To-do List</h1>
                <input 
                type="text"
                className="new-todo"
                placeholder="Enter a new task"
                value={newTodo}
                onChange={event => setNewTodo(event.target.value)}/>

                <button
                    className="add-task"
                    onClick={validateInput}
                    disabled={isLoading}>
                    {isLoading ? 'Adding...' : 'Add Task'}
                </button>
                
                <ol>
                    {todos.map((todo) => (
                        <li key={todo.id}>

                                <>
                                    {todo.label}
                                    <button 
                                        className="removeTask"
                                        onClick={() => todoRemove(todo)}
                                        disabled={isLoading}>
                                        X
                                    </button>

                                </>
                            
                        </li>
                    ))}
                </ol>

                <button
                    className="removeAlltasks"
                    onClick={clearTask}>
                    Clear ALL Tasks
                </button>
            <footer>{todos.length} {tasksRemainder}</footer>
            </header>
            </div>
        </>
    )
}





export default TodoHeader;