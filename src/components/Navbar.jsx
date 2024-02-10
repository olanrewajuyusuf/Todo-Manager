import { NavLink } from "react-router-dom"

const Navbar = ({ data }) => {
    const subtask = data.filter(task => task.subtasks).map(ele => ele.subtasks.length);
    let subtaskLength = 0;
    for(let i = 0; i < subtask.length; i++){
        subtaskLength += subtask[i]
    }

    const taskUnmarked = data.filter(task => !task.completed);
    const activeSubtask = taskUnmarked.filter(task => task.subtasks).map(ele => ele.subtasks.length);
    let activeSubtaskLength = 0;
    for(let i = 0; i < activeSubtask.length; i++){
        activeSubtaskLength += activeSubtask[i]
    }

    const taskMarked = data.filter(task => task.completed);
    const completeSubtask = taskMarked.filter(task => task.subtasks).map(ele => ele.subtasks.length);
    let completeSubtaskLength = 0;
    for(let i = 0; i < completeSubtask.length; i++){
        completeSubtaskLength += completeSubtask[i]
    }

  return (
    <>
    <nav className="desktop-nav">
        <NavLink to='/'>ALL TASK <span>{data.length + subtaskLength}</span></NavLink>
        <NavLink to='/active'>ACTIVE TASK <span>{taskUnmarked.length + activeSubtaskLength}</span></NavLink>
        <NavLink to='/completed'>COMPLETED TASKS <span>{taskMarked.length + completeSubtaskLength}</span></NavLink>
    </nav>
    <nav className="mobile-nav">
        <NavLink to='/'>ALL <span>{data.length + subtaskLength}</span></NavLink>
        <NavLink to='/active'>ACTIVE <span>{taskUnmarked.length + activeSubtaskLength}</span></NavLink>
        <NavLink to='/completed'>COMPLETED <span>{taskMarked.length + completeSubtaskLength}</span></NavLink>
    </nav>
    </>
  )
}

export default Navbar