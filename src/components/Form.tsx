import React from "react";
import { uid } from "uid";
import { TaskModel } from "../task.model";

interface FormProps {
  tasks: {}
  createTask: (task: TaskModel) => void
}

export const Form: React.FC<FormProps> = ({ createTask }) => {

  const onHandleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form as HTMLFormElement);

    let creationDate = formData.get('dueDate');
    if (formData.get("dueDate") === "") {
      let options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
      let today = new Date();
      creationDate = String(today.toLocaleString('fr-BE', options));
    }

    const newTask = {
      id: uid(),
      name: formData.get('taskName'),
      dueDate: creationDate,
      isDone: false,
    };

    createTask(newTask as TaskModel);
    (form as HTMLFormElement).reset();
  };

  return (
    <form
      className="
        w-full 
        bg-white 
        px-6 
        pb-6
      "
      method="post"
      onSubmit={onHandleSubmit}
    >
      <div>
        <div
          className="
            flex
            flex-row
            align-items
            gap-3
          "
        >
          <input
            className="
              w-1/2 
              p-2 
              mb-4 
              border 
              rounded-md
            "
            type="text"
            name="taskName"
            placeholder="Task name"
            required
          />
          <input
            className="
            w-1/2 
            p-2 
            mb-4 
            border 
            rounded-md
          "
            type="date"
            name="dueDate"
          />
        </div>
        <button
          type="submit"
          className="
            bg-blue-500 
            rounded-md 
            px-4 
            py-2 
            text-white 
            text-base 
            hover:bg-blue-600
          "
        >
          Create task
        </button>
      </div>
    </form>
  )
}

export default Form;