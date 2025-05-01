import React, {useState,useEffect} from "react"


const TodoHeader = () => {
    const [newTodo, setNewTodo] = useState("")
    const [counter, setCounter] = useState(0)
    const [todos, setTodos] = useState([])
    //const LOCAL_STORAGE_KEY = 'todoApp.todos'
    

//load todos from local storage and set the counter
 /*   useEffect(() => {
        const todoList = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
        if (todoList && todoList.length > 0) {setTodos(todoList)
            const maxID = todoList.reduce((max,todo) => Math.max(max, todo.id), 0)
        setCounter(maxID + 1)
        }
    }, [])
*/
    
    //a function to fetch the data from a user's todos
    useEffect(() => {
        function fetchData(){
            fetch('https://playground.4geeks.com/todo/users/Darius')
            .then(response => {if (!response.ok) {throw new Error(response.status)}return response.json()})
            .then(data => setTodos(data.todos))
            .catch(error => {console.log('There is a problem', error)})
        }
        fetchData()
    }, [])


    //validate Input, if nothing is entered alert!
    const validateInput = () => {
        if (!newTodo || newTodo === "" || newTodo === undefined) {
            alert("Please enter a value")}
            else {console.log("newTodo text validated!");
            addTask()
            }
        }
    
        //create the object in the todo list
        const addTask = () => {
            let newTodoObj = {
                label: newTodo.trim(),
                id: ''
            }

            const appendedArray = [...todos, newTodoObj]
            setTodos(appendedArray)
            setNewTodo("")
            console.log(appendedArray)
            setCounter(counter + 1)
            postNewTask(newTodoObj)
        }

        const postNewTask = async (todoObject) => {
            const response = await fetch("https://playground.4geeks.com/todo/todos/Darius",{
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(todoObject)
        })
    if (response.ok)
        postNewTask()
    .catch(error => {console.log('There is a problem', error)})

        }

//Save changes in todos to local storage
     /*   useEffect(() => {
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
        }, [todos])
*/

//Clear List
    const clearTask = () => {
        setTodos([])
        console.log('Tasks cleared')
    }
//Remove one Task
/*
const todoRemove = (itemToRemove) => {
    setTodos(todos.filter(data => todos.id !== itemToRemove.id))
    console.log('A task was cleared')
}
*/

const todoRemove = async(todoRemove) => {
    const response = await fetch(`https://playground.4geeks.com/todo/todos/${todoRemove.id}`, {
        method: 'DELETE'
    })
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
    }
        setTodos(todos.filter(todo => todo.id !== todoRemove.id));
        console.log('Task deleted successfully')
}
       
//Display the quantity of tasks remaining, change to singular if 1
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
                    onClick={validateInput}>
                    Add Task
                </button>
                <ol>
                 {todos.map((todos) => (
                        <li key={todos.id}>{todos.label}
                        <button className="removeTask"onClick={()=> todoRemove(todos)}>
                            X</button>
                            </li>
                    ))}
                </ol>

                <button
                    className="remove-task"
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