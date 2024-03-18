import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState(() => {
    const storedTasks = localStorage.getItem('tasks');
    return storedTasks ? JSON.parse(storedTasks) : [];
  });
  const [newTask, setNewTask] = useState('');
  const [completedTasks, setCompletedTasks] = useState([]);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, { text: newTask, editable: false, complete: false }]);
      setNewTask(''); 
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddTask();
    }
  };

  const handleDeleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const handleEditTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].editable = true;
    setTasks(updatedTasks);
  };

  const handleSaveTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].editable = false;
    setTasks(updatedTasks);
  };

  const handleChangeTask = (e, index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].text = e.target.value;
    setTasks(updatedTasks);
  };

  const handleCompleteChange = (index) => {
    const updatedTasks = [...tasks];
    const taskToComplete = updatedTasks[index];
    taskToComplete.complete = !taskToComplete.complete;
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
    setCompletedTasks([...completedTasks, taskToComplete]);
  };

  const handleMoveToTasks = (index) => {
    const updatedCompletedTasks = [...completedTasks];
    const taskToMove = updatedCompletedTasks[index];
    taskToMove.complete = !taskToMove.complete;
    updatedCompletedTasks.splice(index, 1);
    setCompletedTasks(updatedCompletedTasks);
    setTasks([...tasks, taskToMove]);
  };

  return (
    <div className='container'>
      <h1 className='title'>To Do List</h1>
      <div className='inputBox'>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Add a Task..."
          className='textInput'
        />
        <button className='addButton' onClick={handleAddTask}>Add</button>
      </div>
      <div className='taskContainer'>
        <div className='taskBox'>
          <h2 className='boxTitle'>Tasks</h2>
          {tasks.map((task, index) => (
            <div className='addedTask' key={index}>
              <input
                type="checkbox"
                checked={task.complete}
                onChange={() => handleCompleteChange(index)}
                className='taskCheckbox'
              />
              {task.editable ? (
                <div className='editInputBox'>
                  <input
                    type="text"
                    value={task.text}
                    onChange={(e) => handleChangeTask(e, index)}
                  />
                  <button className='editSaveButton' onClick={() => handleSaveTask(index)}>Save</button>
                </div>
              ) : (
                <>
                  <span>{task.text}</span>
                  <button className='editSaveButton' onClick={() => handleEditTask(index)}>Edit</button>
                </>
              )}
                <button className='deleteButton' onClick={() => handleDeleteTask(index)}>Delete</button>
              </div>
          ))}
        </div>
        <div className='completedTaskContainer'>
          <h2 className='boxTitle'>Completed Tasks</h2>      
            {completedTasks.map((task, index) => (
              <div className='addedTask' key={index}>
                <input
                  type="checkbox"
                  checked={task.complete}
                  onChange={() => handleMoveToTasks(index)}
                  className='taskCheckbox'
                />
                <span>{task.text}</span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;
