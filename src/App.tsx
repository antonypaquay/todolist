import React, { useState, useEffect } from 'react';
import Database from "./utils/database";
import Form from "./components/Form";
import Task from './components/Task';
import { TaskModel } from './task.model';

function App() {
  const [tasks, setTasks] = useState<TaskModel[]>([]);

  useEffect(() => {
    Database.readAll().then((data) => {
      setTasks(data);
    });
  }, []);

  const createTask = (task: TaskModel) => {
    Database.update([...tasks, task]).then(() => {
      setTasks((prevState) => [...prevState, task]);
    });
  }

  const updateTask = (task: TaskModel) => {
    let prevState = tasks;
    prevState.forEach((element, index) => {
      if (element.id === task.id) {
        prevState[index] = element;
      }
    });
    setTasks([]);
    Database.update(prevState).then(() => {
      setTasks(prevState);
    });
  }

  const removeTask = (id: string) => {
    let prevState = tasks;
    prevState = prevState.filter((task) => task.id !== id);
    Database.update(prevState).then(() => {
      setTasks(prevState);
    });
  }

  let tasksList;
  if (tasks.length > 0) {
    tasksList = tasks.map((task) => {
      return (
        <Task
          key={task.id}
          data={task}
          updateTask={updateTask}
          removeTask={removeTask}
        />
      );
    });
  } else {
    tasksList = <p className="text-gray-500">No tasks at this time. Perhaps you could add some? 😊</p>;
  }

  return (
    <div className="
          flex
          flew-row
          items-center
          justify-center
          h-screen
        ">
      <div className="
        w-full
        max-w-lg
        bg-white
        shadow-2xl
        shadow-gray-400
        rounded-2xl
        overflow-scroll
      ">
        <div className="
          p-6
          bg-blue-500
          w-full
        ">
          <h2
            className="
              inline-block
              text-xl
              text-white
              font-bold
            ">
            My tasks
            <span
              className="
                relative
                z-10
                rounded-full
                bg-blue-200
                px-3
                py-1.5
                ml-2
                font-medium
                text-xs
                text-gray-600
              "
            >
              {tasks.length}
            </span>
          </h2>
        </div>
        <ul className="p-6">{tasksList}</ul>
        <Form
          tasks={tasks}
          createTask={createTask}
        />
      </div>
    </div>
  );
}

export default App;
