                           /* 
                             */

/*

*/


                                //const LOCAL_STORAGE_KEY = 'todoApp.todos'
                                //const [editingId, setEditingId] = useState(null);
                            /*
                            const toggleEditMode = (id) => {
                                setEditingId(editingId === id ? null : id);
                            };
                            
                            const handleEditChange = (id, newValue) => {
                                setTodos(prevTodos => 
                                    prevTodos.map(todo => 
                                        todo.id === id ? { ...todo, editLabel: newValue } : todo
                                    )
                                );
                            };
                            */
                            //load todos from local storage and set the counter
                             /*   useEffect(() => {
                                    const todoList = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
                                    if (todoList && todoList.length > 0) {setTodos(todoList)
                                        const maxID = todoList.reduce((max,todo) => Math.max(max, todo.id), 0)
                                    setCounter(maxID + 1)
                                    }
                                }, [])
                            */
                                

                                
//Save changes in todos to local storage
     /*   useEffect(() => {
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
        }, [todos])
*/
//Update Todo Task
/*
const updateTask = async (todoToUpdate, newLabel) => {

            const updatedTodo = {...todoToUpdate, label: newLabel}
            const response = await fetch(`https://playground.4geeks.com/todo/todos/${todoToUpdate.id}`, {
                method: "PUT",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(updatedTodo)})
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`)
                }
                setTodos(prevTodos => 
                    prevTodos.map(todo => 
                        todo.id === todoToUpdate.id ? updatedTodo : todo
                    )
                );
                console.log('Task updated successfully');
            }
*/