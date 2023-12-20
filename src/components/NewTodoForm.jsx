import { useState } from "react";
import { IoIosAdd } from "react-icons/io";

const NewTodoForm = ({setData}) => {
  const [title, setTitle] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTask = { title, "id": crypto.randomUUID(), "completed": false, "set_date": new Date() };
    setData((prevItems) => {
      return [...prevItems, newTask]
    });
    setTitle('')
  };

  return (
    <form onSubmit={handleSubmit} className="new-item-form">
      <div className="form-row">
        <IoIosAdd className="add"/>
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          type="text"
          name="task"
          placeholder="Add a task"
        />
      </div>
    </form>
  )
}

export default NewTodoForm;