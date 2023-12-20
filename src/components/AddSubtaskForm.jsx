import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom"

const AddSubTaskForm = ({ data, setData }) => {
    const [title, setTitle] = useState("");
    const { id } = useParams();
    const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const updatedTasks = data.map(item => {
      if (item.id === id) {
        const subtasks = item.subtasks ? [...item.subtasks, { title, id: crypto.randomUUID(), completed: false }] : [{ title, id: crypto.randomUUID(), completed: false }];
        return { ...item, subtasks };
      }
      return item;
    });
    console.log("Item Added");
    setData(updatedTasks);
  
    setTitle('');
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit} className="modal">
        <h3>Add SubTask to id no:</h3>
        <h4>{id}</h4>
        <input type="text" value={title} id={id} onChange={(e) => setTitle(e.target.value)} />
        <button>Add Subtask</button>
    </form>
  )
}

export default AddSubTaskForm;