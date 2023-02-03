import { useState } from "react";

const AddTask = ({ onAdd }) => {
  const [text, setText] = useState("");
  const [day, setDate] = useState("");
  const [reminder, setReminder] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();

    if (!text) {
      alert("Please add task");
      return;
    } else if (!day) {
      alert("Please pick date");
      return;
    }

    await onAdd({ text, day, reminder });

    // initialization fields
    setText("");
    setDate("");
    setReminder(false);
  };

  return (
    <form className="add-form" onSubmit={onSubmit}>
      <div className="form-control">
        <label>Task</label>
        <input
          type="text"
          placeholder="Add task title"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <div className="form-control">
        <label>Day & Time</label>
        <input
          type="datetime-local"
          // type={text}
          // placeholder="Add day & time"
          value={day}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      <div className="form-control form-control-check ">
        <label>Set Reminder</label>
        <input
          type="checkbox"
          checked={reminder}
          value={reminder}
          onChange={(e) => setReminder(e.currentTarget.checked)}
        />
      </div>
      <input className="btn btn-block" type="submit" value="Save Task" />
    </form>
  );
};

export default AddTask;
