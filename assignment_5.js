import { useState } from "react";
function App() {
const [text, setText] = useState("");
const [todos, setTodos] = useState([]);
function addTodo() {
if (text === "") return;
setTodos([...todos, text]);
setText("");
}
function deleteTodo(indexToDelete) {
setTodos(todos.filter((_, index) => index !== indexToDelete));
}
return (
<div style={{ padding: "20px", fontFamily: "Arial" }}>
<h1
style={{
fontFamily: "cursive Arial",
color: "#2a66ab",
textAlign: "center"
}}
>
✨ My Todo List ✨
</h1>
<div style={{ textAlign: "center" }}>
<input
type="text"

value={text}
onChange={(e) => setText(e.target.value)}

/>

<button onClick={addTodo} style={{ marginLeft: "5px" }}>
Add
</button>
</div>
<ul>
{todos.map((todo, index) => (
<li key={index}>
{todo}
<button
onClick={() => deleteTodo(index)}
style={{ marginLeft: "10px" }}
>
X
</button>
</li>
))}
</ul>
</div>
);
}
export default App;
