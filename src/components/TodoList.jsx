import NewTodoForm from "./NewTodoForm"
import Navbar from "./Navbar";
import AllTasks from "./AllTasks"
import CompletedTask from "./CompletedTasks"
import ActiveTask from "./ActiveTasks";
import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import EditForm from "./EditForm";
import AddSubTaskForm from "./AddSubtaskForm";

const TodoList = ({data, setData, handleDrag}) => {
    const [showSubtasks, setShowSubtasks] = useState({});
    const [arrowRotation, setArrowRotation] = useState({});

    // <====== GETTING SPECIFIC DATE FOR EACH TASK ======>
    const getSpecificDay = (dateString) => {
        const currentDate = new Date();
        const specificDate = new Date(dateString);

        if (
            currentDate.getFullYear() === specificDate.getFullYear() &&
            currentDate.getMonth() === specificDate.getMonth() &&
            currentDate.getDate() === specificDate.getDate()
            ) {
                return 'Today';
            } else {
            const yesterday = new Date(currentDate);
            yesterday.setDate(currentDate.getDate() - 1);
      
            if (
                yesterday.getFullYear() === specificDate.getFullYear() &&
                yesterday.getMonth() === specificDate.getMonth() &&
                yesterday.getDate() === specificDate.getDate()
            ) {
                return 'Yesterday';
            } else {
                const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                return daysOfWeek[specificDate.getDay()];
            }
        }
    } 

    // <====== SHOW SUBTASKS FUNCTION HANDLER ======>
    const handleShowSubtasks = (taskId) => {
        setShowSubtasks((prev) => ({
            ...prev,
            [taskId]: !prev[taskId],
        }));

        setArrowRotation((prev) => ({
            ...prev,
            [taskId]: !prev[taskId],
        }));
    }

    // <====== UPDATE TASKS FUNCTION ======>
    const handleTaskUpdate = (id) => {
        const updatedTasks = data.map(item => {
            if (item.id === id) {
                return {...item, completed: !item.completed}
            }
            if (item.subtasks) {
                const updatedSubTasks = item.subtasks.map(subTask => {
                    if (subTask.id === id) {
                        return { ...subTask, completed: !subTask.completed };
                    }
                    return subTask;
                });
                return { ...item, subtasks: updatedSubTasks };
            }
            
            return item;
        })

        console.log("Item Updated");
        setData(updatedTasks);
    }

    const handleTaskDelete = (id) => {
        const deleteMainTask = data.filter(item => item.id !== id);

        const deleteTask = data.map(item => {
            let sub = ''
            if(item.subtasks) {
               sub = item.subtasks.filter(item => item.id !== id);
            }
            return {...item, subtasks: sub}
        })

        // Getting the main task
        const x = data.find(y => y.id === id)
        setData(x && x.id === id ? deleteMainTask : deleteTask);
    }
    
    return (
        <div className="task-container">
            <NewTodoForm setData={setData}/>
            <Navbar data={data}/>
            <Routes>
                <Route path="/" element={
                    <AllTasks 
                        data={data} 
                        getSpecificDay={getSpecificDay} 
                        handleShowSubtasks={handleShowSubtasks}
                        showSubtasks={showSubtasks}
                        arrowRotation={arrowRotation}
                        handleTaskUpdate={handleTaskUpdate}
                        handleTaskDelete={handleTaskDelete}
                        handleDrag={handleDrag}
                   />
                } />
                <Route path="/active" element={
                    <ActiveTask 
                        data={data} 
                        getSpecificDay={getSpecificDay} 
                        handleShowSubtasks={handleShowSubtasks}
                        showSubtasks={showSubtasks}
                        arrowRotation={arrowRotation}
                        handleTaskUpdate={handleTaskUpdate}
                        handleTaskDelete={handleTaskDelete}
                        handleDrag={handleDrag}
                   />
                } />
                <Route path="/completed" element={
                    <CompletedTask 
                        data={data} 
                        getSpecificDay={getSpecificDay} 
                        handleShowSubtasks={handleShowSubtasks}
                        showSubtasks={showSubtasks}
                        arrowRotation={arrowRotation}
                        handleTaskUpdate={handleTaskUpdate}
                        handleTaskDelete={handleTaskDelete}
                        handleDrag={handleDrag}
                   />
                } />
                <Route path="/edit/:id" element={
                    <EditForm 
                        data={data} 
                        setData={setData} 
                   />
                } />
                <Route path="/add/:id" element={
                    <AddSubTaskForm 
                        data={data} 
                        setData={setData} 
                   />
                } />
            </Routes>
        </div>
    )
}

export default TodoList