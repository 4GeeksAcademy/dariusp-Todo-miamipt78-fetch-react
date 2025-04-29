import React, {useState,useEffect} from "react"


const TodoHeader = () => {
    const [newTodo, setNewTodo] = useState("")
    const [counter, setCounter] = useState(0)
    const [todos, setTodos] = useState([])
    const LOCAL_STORAGE_KEY = 'todoApp.todos'

//load todos from local storage and set the counter
    useEffect(() => {
        const todoList = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
        if (todoList && todoList.length > 0) {setTodos(todoList)
            const maxID = todoList.reduce((max,todo) => Math.max(max, todo.id), 0)
        setCounter(maxID + 1)
        }
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
                id: counter,
                todo: newTodo.trim()
            }

            const appendedArray = [...todos, newTodoObj]
            setTodos(appendedArray)
            setNewTodo("")
            console.log(appendedArray)
            setCounter(counter + 1)
        }

//Save changes in todos to local storage
        useEffect(() => {
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
        }, [todos])
        


//Clear List
    const clearTask = () => {
        setTodos([])
        console.log('Tasks cleared')
    }
//Remove one Task

const todoRemove = (itemToRemove) => {
    setTodos(todos.filter(todos => todos.id !== itemToRemove.id))
    console.log('A task was cleared')
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
                <ul>
                 {todos.map((todos) => (
                        <li key={todos.id}>{todos.todo}
                        <button className="removeTask"onClick={()=> todoRemove(todos)}>
                            X</button>
                            </li>
                    ))}
                </ul>

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