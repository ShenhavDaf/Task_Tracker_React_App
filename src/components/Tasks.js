import TaskItem from "./TaskItem";

const Tasks = ({ tasksList, onDelete, onToggle }) => {
  return (
    <>
      <hr />

      {tasksList.map((task /*, index*/) => (
        <TaskItem
          key={task.id} /*index*/
          task={task}
          onDelete={onDelete}
          onToggle={onToggle}
        />
      ))}
    </>
  );
};

export default Tasks;
