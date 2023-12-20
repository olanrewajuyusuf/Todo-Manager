import { IoIosCheckmark, IoIosAdd, IoIosArrowUp } from "react-icons/io";
import { MdDeleteOutline, MdEditNote } from "react-icons/md";
import { GoCalendar } from "react-icons/go";
import { Link } from "react-router-dom";

const CompletedTask = ({data, handleShowSubtasks, handleTaskUpdate, arrowRotation, showSubtasks, handleTaskDelete, getSpecificDay, handleDrag}) => {

  const taskMarked = data.filter(task => task.completed);

  return (
    <div className="todo-lists">
        {taskMarked.length === 0 && <p>No Completed Task</p>}
        {taskMarked.map(task => (
          <section key={task.id} draggable onDragStart={(e) => handleDrag(e, task.title)}>
          <article className="task-label">
            <div className={`task ${task.completed ? 'completed' : ''}`}>
              <label htmlFor={task.id}>
                <input type="checkbox" id={task.id} checked={task.completed} onChange={() => handleTaskUpdate(task.id)} />
                <div className="check"><IoIosCheckmark className="check-icon"/></div>
                {task.title}
              </label>
              <div className="icons">
                <div>
                  <MdDeleteOutline onClick={() => handleTaskDelete(task.id)} className="delete icon"/>
                  <span>Delete</span>
                </div>
                <div>
                  <Link to={`/add/${task.id}`} className="icon"><IoIosAdd /></Link>
                  <span>Add Subtask</span>
                </div>
                <div>
                  <Link to={`/edit/${task.id}`} className="icon"><MdEditNote /></Link>
                  <span>Edit</span>
                </div>
              </div>

              {(task.subtasks && task.subtasks.length > 0) && (
              <IoIosArrowUp 
                className="arrow" 
                onClick={() => handleShowSubtasks(task.id)} 
                style={{rotate: arrowRotation[task.id] ? '180deg' : ''}}
              />)}
            </div>

            <div className={task.set_date && getSpecificDay(task.set_date)} style={{fontSize: 12, marginTop: 5}}>
              {task.set_date && <span style={{display: 'flex', alignItems: "center", gap: 5}}><GoCalendar /> {getSpecificDay(task.set_date)}</span>}
            </div>

          </article>

          {/* ======Subtask section====== */}
          {showSubtasks[task.id] && <section className="subtasks">
          {task.subtasks && task.subtasks.map(task => (
            <section key={task.id} className={`sub-task ${task.completed ? 'completed' : ''}`}>
              <label htmlFor={task.id}>
                <input type="checkbox" id={task.id} checked={task.completed} onChange={() => handleTaskUpdate(task.id)} />
                <div className="check"><IoIosCheckmark className="check-icon"/></div>
                {task.title}
              </label>
              <div className="icons">
                <div>
                  <MdDeleteOutline onClick={() => handleTaskDelete(task.id)} className="delete icon"/>
                  <span>Delete</span>
                </div>
                <div>
                  <Link to={`/edit/${task.id}`} className="icon"><MdEditNote /></Link>
                  <span>Edit</span>
                </div>
              </div>
            </section>
          ))}
          </section>}
        </section>
        ))}
    </div>
  )
}

export default CompletedTask
