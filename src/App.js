import { useState, useEffect } from "react";
/* useState for frontend
   useEffect fro backend (update db.json) */
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import About from "./components/About";
import AddTask from "./components/AddTask";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import TaskDetails from "./components/TaskDetails";

// Opthion A - Components
function App() {
  const [showAddTask, setShowAddTask] = useState(false);

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      const taskFromServer = await fetchTasks();
      setTasks(taskFromServer);
    };
    getTasks();
  }, []);

  //Fetch tasks (from bd.json/ from server)
  const fetchTasks = async () => {
    const res = await fetch("http://localhost:5000/tasks");
    return res.json();
  };

  //Fetch task by ID
  const fetchTaskById = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`);
    return res.json();
  };

  //Add new task function
  const addTask = async (newTask) => {
    // const id = Math.floor(Math.random() * 1000) + 1;
    // setTasks([...tasks, { id, ...newTask }]);

    newTask.day = dateFormat(newTask.day);

    const res = await fetch(`http://localhost:5000/tasks/`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(newTask),
    });

    const data = await res.json();

    setTasks([...tasks, data]);
  };

  const dateFormat = (date) => {
    const split = date.split("-");
    const year = split[0];
    const month = split[1];
    const dayAndTime = split[2].split("T");
    const day = dayAndTime[0];
    const time = dayAndTime[1].split(":");
    const hours = time[0];
    const minuts = time[1];

    return `${day}/${month}/${year} at ${hours}:${minuts}`;
  };

  // Delete task function
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, { method: "DELETE" });

    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Toggle Reminder function
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTaskById(id);
    const updateTask = { ...taskToToggle, reminder: !taskToToggle.reminder };

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(updateTask),
    });

    const data = await res.json();

    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: !data.reminder } : task
      )
    );
  };

  return (
    <Router>
      <div className="container">
        <Header
          onAdd={() => setShowAddTask(!showAddTask)}
          showAddState={showAddTask}
        />
        <Routes>
          <Route
            path="/"
            element={
              <>
                {showAddTask && <AddTask onAdd={addTask} />}
                {tasks.length > 0 ? (
                  <Tasks
                    tasksList={tasks}
                    onDelete={deleteTask}
                    onToggle={toggleReminder}
                  />
                ) : (
                  <p className="semi-title">No Tasks To Show</p>
                )}
              </>
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="/task/:id" element={<TaskDetails />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

/* --- --- --- --- --- --- --- --- --- --- --- --- --- --- --- */

// Opthion B - Classes & extends React.Component

// import React from "react";

// class App extends React.Component {
//   render() {
//     return <h1>Hello</h1>;
//   }
// }
// export default App;
