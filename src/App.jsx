import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { faSave } from '@fortawesome/free-solid-svg-icons'
import './App.css';

function App() {
  const [tasks, setTasks] = useState(() => {
    const storedTasks = localStorage.getItem('tasks');
    return storedTasks ? JSON.parse(storedTasks) : [];
  });
  const [newTask, setNewTask] = useState('');
  const [completedTasks, setCompletedTasks] = useState(() => {  
    const storedCompletedTasks = localStorage.getItem('completedTasks');
    return storedCompletedTasks ? JSON.parse(storedCompletedTasks) : [];
  });
  const [showCompletedTasks, setShowCompletedTasks] = useState(false);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
  }, [completedTasks]);

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

  const toggleShowCompletedTasks = () => {``
    setShowCompletedTasks(!showCompletedTasks);
  };

  const completedTasksCount = completedTasks.length;

  const currentDate = new Date();
  const options = { weekday: 'long', month: 'long', day: 'numeric' };
  const formattedDate = currentDate.toLocaleDateString('en-US', options);


  return(
    <div className='body'>
      <div className='bodyContent'>
        <div className='iconContainer'>
          <div className='titleDate'>
            <span className='myDayText'>My Day</span>
            <span className='dateText'>{formattedDate}</span>
          </div>
          <img 
              src="./src/assets/icon1.png"
              className='todoLogo'
          />
        </div>  
        <div className='masterContainer'>
          <div className='createdCompletedContainer'>
            <div className='createdTaskBox'>
              <h3>Tasks</h3>
              {
                tasks.map((task, index) => (
                  <div className='addedTask'>
                        {task.editable ? (
                          <div className='editContainer'>
                            <input
                              type="text"
                              value={task.text}
                              onChange={(e) => handleChangeTask(e, index)}
                            />
                              <button className='editSaveButton' onClick={() => handleSaveTask(index)}>
                                <FontAwesomeIcon icon={faSave} />
                              </button>
                          </div>
                          ) : (
                            <>
                            <div className='textCheckBoxContainer'>
                            <input
                              type="checkbox"
                              checked={task.complete}
                              onChange={() => handleCompleteChange(index)}
                              className='taskCheckbox'
                            />
                              {task.text}
                            </div>
                          <div className='buttonsContainer'>
                            <button className='editSaveButton' onClick={() => handleEditTask(index)}>
                              <FontAwesomeIcon icon={faEdit} />
                            </button>
                            <button className='deleteButton' onClick={() => handleDeleteTask(index)}>
                              <FontAwesomeIcon icon={faTrash} />
                            </button>
                          </div> 
                          </>
                          )
                        }
                  </div>
                ))
              }
            </div>
            <div className='completedTaskBox'>
              <div className='ecButtonContainer'>
                <button className='expandCollapseButton' onClick={toggleShowCompletedTasks}>
                  {showCompletedTasks ? "▼" : "►"}
                  <span className='taskCount'> Completed ({completedTasksCount})</span>
                </button>
              </div>
              {showCompletedTasks && (
                completedTasks.map((task, index) => (
                  <div className='addedTask'>
                    <div className='textCheckBoxContainer'>
                      <input
                        type="checkbox"
                        checked={task.complete}
                        onChange={() => handleMoveToTasks(index)}
                        className='taskCheckbox'
                      />
                      {task.text}
                    </div>
                  </div>
                )))
              }
            </div>
          </div>  
          <div className='inputBox'>
            <input 
              type='text'
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder='Add a Task..'
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
