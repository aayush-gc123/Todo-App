import { useState,useEffect } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from 'react-icons/ai';

// uuidv4();

function App() {


 const [todo, setTodo] = useState("")
 const [Todos, setTodos] = useState([])
 const [showFinish, setshowFinish] = useState(true)
   
// useEffect(() => {
// let todos = JSON.parse(localStorage.getItem("todos"))
// setTodos(todos);
// }, [])

useEffect(() => {
  let todoString = localStorage.getItem("todos")
  if(todoString){
    let todos = JSON.parse(localStorage.getItem("todos"))
    setTodos(todos);
  }
 

}, [])


 const saveTodos = () => {
    localStorage.setItem("todos" , JSON.stringify(Todos))
  
 }
 
 const handleChange = (e) => {
  setTodo(e.target.value)

 }
  const handleEdit = (e,id) =>{
   console.log(id)
   let t =Todos.filter(item => item.id ==id)
   setTodo(t[0].todo)
   let newTodos = Todos.filter(item=> {
    return item.id!==id
  });
  setTodos(newTodos)
  saveTodos()
  }

  const handleDelate = (e,id) =>{

    console.log(`This is id ${id}`)
    let newTodos = Todos.filter(item=> {
      return item.id!==id
    });
    setTodos(newTodos)
    saveTodos()
  }

  

  const handleAdd = () =>{
    setTodos([...Todos , {todo , isCompleted:false ,id:uuidv4()}])
    setTodo("")
    console.log(Todos)
    saveTodos()
  }

  const handleCheckbox = (e)=>{
    let id = e.target.name
    console.log(`This is id ${id}`)
    let index = Todos.findIndex(item => {
    return item.id === id;
   
    })
   console.log(index)

    let newTodo = [...Todos];
  newTodo[index].isCompleted =!newTodo[index].isCompleted;
  setTodos(newTodo)
  console.log(newTodo)
  saveTodos()
  }

  const togglefinish = () => {
    setshowFinish(!showFinish)
  }

  
  return (
    <>
    <div className="mainContainer " >

  
       <Navbar logo = "Tasks "/> 
    <div className="container px-20 my-5 flex justify-center  min-w-96  "  >
     <div className="content  rounded-2xl bg-violet-100  p-5 min-h-[75vh] w-1/2  max-sm:w-[100vw] max-md:w-96 ">
        <div className="addTodo my-5 ">
          <h1 className="font-bold">Add todos</h1>
          <br/>
          <input onChange = {handleChange}className="  input-btn  w-[80%] p-2 max-xl:w-[70% ] max-xl:w-[40%]" type="text" value={todo } />
          <button onClick={handleAdd} disabled = {todo.length<=1} className="bg-violet-800 hover:bg-violet-950 p-3 py-1 text-white rounded-md mx-6 font-bold text-sm ">Save</button>
         
        </div>
        <input onChange = {togglefinish} type="checkbox" checked={showFinish} />Show finish
        <h1 className="font-bold">Your todos</h1>
        <div className="todos gap-5" >
          {Todos.length ==0 && <div className="m-5">No todos to display</div>}
          {Todos.map(item=> {
      
         return (showFinish || !item.isCompleted)&& <div  className="todo flex justify-between w-1/1 my-3" key={item.id}>
          <div className="flex gap-5">
          <input  onChange={handleCheckbox}  type="checkbox" name={item.id}  checked={item.isCompleted}/>
           <div className={item.isCompleted?"line-through":""} >{item.todo}</div>
           </div>
           <div className="buttons flex " >
            <button onClick={(e) => {handleEdit(e , item.id)}} className="bg-violet-800 hover:bg-violet-950 p-3 py-1 text-white rounded-md mx-1 font-bold text-sm"><FaEdit /></button>
            <button onClick={(e) => {handleDelate(e,item.id)}} className="bg-violet-800 hover:bg-violet-950 p-3 py-1 text-white rounded-md mx-1 font-bold text-sm">< AiFillDelete/></button>
           </div>

          </div>
          })}
        </div>
      
     </div>
    </div>
    </div>
    </>
  )
}

export default App
