import React from 'react';
import { FiCheck, FiTrash } from 'react-icons/fi';
import { TaskModel } from '../task.model';

interface TaskProps {
  data: { id: string, name: string, dueDate: string, isDone: boolean };
  updateTask: (task: TaskModel) => void;
  removeTask: (id: string) => void;
}

const Task: React.FC<TaskProps> = ({ data, updateTask, removeTask }) => {
  const { id, name, dueDate, isDone } = data;

  const updateStatus = () => {
    const newData = data;
    newData.isDone = !newData.isDone;
    updateTask(newData);
  };

  return (
    <li className="mt-1">
      <label
        htmlFor={id}
        className="
          w-full 
          flex 
          items-center 
          justify-between 
          cursor-pointer
        "
      >
        <input
          id={id}
          className="absolute hidden"
          type="checkbox"
          onChange={updateStatus}
        />
        <div className="flex items-center">
          <span
            className={`
              rounded-full
              p-2
              mr-4
              ${isDone ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-400'}
            `
            }>
            <FiCheck size={16} className="w-4 h-4" />
          </span>
          <div>
            <h3 className="
              w-full
              font-medium
              text-base
              text-gray-950"
            >
              {name}
            </h3>
            <span className="text-sm text-gray-500">
              {`Scheduled: ${dueDate}`}
            </span>
          </div>
        </div>
        <button
          type="button"
          onClick={removeTask.bind(null, id)}
        >
          <FiTrash
            className="
              text-gray-400
              hover:text-red-500
            "
            size={14}
          />
        </button>
      </label>
    </li>
  );
}

export default Task;
