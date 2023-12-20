import TodoList from "./components/TodoList";
import ReorderList from "./components/ReorderList";
import { useState, useEffect } from 'react';
import './App.scss';

const App = () => {
  const [ data, setData ] = useState(() => {
    const localValue = localStorage.getItem('ITEMS');
    if (localValue == null) return [];

    return JSON.parse(localValue);
  });
  const [ reorder, setReorder ] = useState(() => {
    const localValue = localStorage.getItem("REORDER")
    if (localValue == null) return []

    return JSON.parse(localValue)
  })

  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(data))
  }, [data])

  // <====== REORDER LIST USING LOCALSTORAGE FUNCTION ======>
  useEffect(() => {
    localStorage.setItem("REORDER", JSON.stringify(reorder))
  }, [reorder])

  useEffect(() => {
      const storedData = localStorage.getItem("REORDER");
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        setReorder(parsedData);
      }
  }, []);
  
  const deleteReorderList = (index) => {
      const updatedList = [...reorder];
      updatedList.splice(index, 1);
      setReorder(updatedList);

      localStorage.setItem("yourKey", JSON.stringify(updatedList));
  };

  // <====== DRAG AND DROP FUNCTION =====>
  const handleDrag = (e, dataType) => {
    e.dataTransfer.setData('dataType', dataType);
  }

  const handleDrop = (e) => {
      const dataType = e.dataTransfer.getData('dataType');
      console.log("Data", dataType);
      setReorder([...reorder, dataType]);
  }

  const handleDragOver = (e) => {
      e.preventDefault();
  }

  return (
    <div className="app">
      <div className="todo-list">
        <TodoList data={data} setData={setData} handleDrag={handleDrag} />
      </div>
      <ReorderList handleDrop={handleDrop} handleDragOver={handleDragOver} reorder={reorder} deleteReorderList={deleteReorderList} />
    </div>
  );
};

export default App;
