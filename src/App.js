import React, { useState, useRef, useEffect } from "react";
//import { nanoid } from "nanoid";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import Todo from "./components/Todo";

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}
var tasks = [{"id":"todo-0","name":"Eat","completed":true},{"id":"todo-1","name":"Sleep","completed":false},{"id":"todo-2","name":"Repeat","completed":false}]
const FILTER_MAP = {
  All: () => true,
  Active: (task) => !task.completed,
  Completed: (task) => task.completed
};

const FILTER_NAMES = Object.keys(FILTER_MAP);
const str = JSON.stringify(FILTER_MAP);

function App(props) {
  const [tasks, setTasks] = useState(props.tasks);
  console.log("8************"+JSON.stringify(tasks))
console.log('------------'+ str);

  const [filter, setFilter] = useState('All');

  function addTask(name) {
    //const newTask = { id: `todo-${nanoid()}`, name, completed: false };
    const newTask = { id: '1', name, completed: false };
    setTasks([...tasks, newTask]);
    console.log("$$$$$$$$$$"+tasks)
  }

  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map((task) => {
      // if this task has the same ID as the edited task
      if (id === task.id) {
        // use object spread to make a new object
        // whose `completed` prop has been inverted
        return { ...task, completed: !task.completed }
      }
      return task;
    });
    setTasks(updatedTasks);
    console.log("Completed -------"+updatedTasks)
  }

  function deleteTask(id) {
    const remainingTasks = tasks.filter((task) => id !== task.id);
    setTasks(remainingTasks);
  }

  function editTask(id, newName) {
    console.log("Start     --"+JSON.stringify(tasks));
    const editedTaskList = tasks.map((task) => {
      // if this task has the same ID as the edited task
      if (id === task.id) {
        //
        return { ...task, name: newName }
      }
      return task;
    });
    setTasks(editedTaskList);
  }

  //tasks = [{"id":"todo-0","name":"Eat","completed":true},{"id":"todo-1","name":"Sleep","completed":false},{"id":"todo-2","name":"Repeat","completed":false}]
  console.log("Above     --"+JSON.stringify(tasks));
//filter(FILTER_MAP['All'])
const testTasks =[ {"id":"todo-0","name":"Eat","completed":true},{"id":"todo-1","name":"Sleep","completed":false},{"id":"todo-2","name":"Repeat","completed":false}]
  const taskList = 
  testTasks.map((task) => (
      <Todo
        id={task.id}
        name={task.name}
        completed={task.completed}
        key={task.id}
        toggleTaskCompleted={toggleTaskCompleted}
        //deleteTask={deleteTask}
        //editTask={editTask}
      />
    ));

  const filterList = FILTER_NAMES.map((name) => (
    <FilterButton
      key={name}
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ));

  const tasksNoun = taskList.length !== 1 ? 'tasks' : 'task';
  const headingText = `${taskList.length} ${tasksNoun} remaining`;
  const listHeadingRef = useRef(null);
  const prevTaskLength = usePrevious(testTasks.length);

  useEffect(() => {
    if (testTasks.length - prevTaskLength === -1) {
      listHeadingRef.current.focus();
    }
  }, [testTasks.length, prevTaskLength]);  


  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form addTask={addTask} />
      <div className="filters btn-group stack-exception">
        {filterList}
      </div>
      <h2 id="list-heading" tabIndex="-1" ref={listHeadingRef}>
        {headingText}
      </h2>

      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {taskList}
      </ul>
    </div>
  );
}

export default App;