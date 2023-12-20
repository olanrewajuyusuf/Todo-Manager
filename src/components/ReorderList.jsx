import { MdDeleteOutline } from "react-icons/md";

const ReorderList = ({reorder, handleDrop, handleDragOver, deleteReorderList}) => {

  return (
    <div onDrop={handleDrop} onDragOver={handleDragOver} className="reorder-list">
      <div className="container">
        <h2 style={{color: 'rgb(0, 153, 255)'}}>Reorder List</h2>
        <p>Drag and drop your task here for reorder...</p>
        <ul className="list">
            {reorder.length === 0 && <small>Re-order List is empty...</small>}
            {reorder.map((data, index) => (
                <li key={index} style={{color: 'white'}}>
                    <span>{data}</span>
                    <span className="del-btn"><MdDeleteOutline onClick={() => deleteReorderList(index)} /></span>
                </li>
            ))}
        </ul>
      </div>
    </div>
  )
}

export default ReorderList