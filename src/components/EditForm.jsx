import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom"

const EditForm = ({ data, setData }) => {
    const [value, setValue] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    const handleSubmit = (e) => {
        e.preventDefault();

        const updatedTasks = data.map(item => {
            if (item.id === id) {
                return { ...item, title: value };
            }

            // Check if the task has subtasks and update them accordingly
            if (item.subtasks) {
                const updatedSubTasks = item.subtasks.map(subTask => {
                    if (subTask.id === id) {
                        return { ...subTask, title: value };
                    }
                    return subTask;
                });
                return { ...item, subtasks: updatedSubTasks };
            }

            return item;
        });

        console.log(updatedTasks);
        setData(updatedTasks);

        navigate('/');
    }

  return (
    <form onSubmit={handleSubmit} className="modal">
        <h3>Edit Task with id no:</h3>
        <h4>{id}</h4>
        <input type="text" value={value} id={id} onChange={(e) => setValue(e.target.value)} />
        <button>Edit</button>
    </form>
  )
}

export default EditForm