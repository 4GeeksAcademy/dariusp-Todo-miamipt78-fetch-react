import React, {useState} from "react"



const TodoHeader = ({todos, setTodos}) => {
    const [newTodo, setNewTodo] = useState("")
    const [counter, setCounter] = useState(0)

    
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
                todo: newTodo
            }

            //setTodos({...todos,newTodoObj})
            const appendedArray = [...todos, newTodoObj]
            setTodos(appendedArray)
            setNewTodo("")
            console.log(appendedArray)
            setCounter(counter + 1)
        }

//Clear List
    const clearTask = () => {
        setTodos(todos.filter(todos => todos.id !== todos.id))
        
    
    const appendedArray = [...todos]
        setTodos(todos.pop())
        setCounter(counter - 1)
    }
//Remove one Task

    
const todoRemove = (itemToRemove) => {

    setTodos(todos.filter(todos => todos.id !== itemToRemove.id))
}

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
                        <li key={todos.id}>{todos.todo}<button className="removeTask"onClick={()=> todoRemove(todos)}>X</button></li>
                    ))}
                </ul>

                <button
                    className="remove-task"
                    onClick={clearTask}>
                    Clear ALL Tasks
                </button>
            <footer >{tasksRemainder} {todos.length}</footer>
            </header>
            </div>

        </>
    )
}





export default TodoHeader;