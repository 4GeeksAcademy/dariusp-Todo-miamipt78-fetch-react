import React, {useState} from "react";
import Todo from "./Todo"
import TodoBody from "./TodoBody"
import TodoFooter from "./TodoFooter"
import TodoHeader from "./TodoHeader"
//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";
import { render } from "react-dom";


//create your first component





const Home = () => {

	const [todos, setTodos] = useState([]);
/*	
	return (
		<>
		 <div className="text-center">
            <input type="text" id="todoinput" placeholder="Enter list item">
			</input>
				<button>Submit
				</button>
			<h1 className="text-center mt-5">To do List</h1>
			<h1 className="text-center mt-5"></h1>
		</div>
		</>
	);
};
*/
return (
	<>
	<TodoHeader todos={todos} setTodos={setTodos}/>
	</>
)
}

export default Home;