'use client';
import { useState } from 'react';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-900 text-white p-6 space-y-10">
      <h1 className="text-4xl font-bold text-center mb-8">My Productivity Hub</h1>
      <div className="grid md:grid-cols-3 gap-8">
        <ToDoList />
        <Reminders />
        <GoalTracker />
      </div>
    </main>
  );
}

// ---------------- TO DO LIST ----------------
function ToDoList() {
  const [tasks, setTasks] = useState([
    { text: 'Finish project', done: false },
    { text: 'Study for math test', done: false },
  ]);
  const [newTask, setNewTask] = useState('');

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, { text: newTask, done: false }]);
      setNewTask('');
    }
  };

  const toggleTask = (index: number) => {
    const updated = [...tasks];
    updated[index].done = !updated[index].done;
    setTasks(updated);
  };

  const removeTask = (index: number) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-white text-black p-5 rounded-xl shadow-md">
      <h2 className="text-2xl font-semibold mb-4">To Do List</h2>
      <ul className="space-y-2 mb-4">
        {tasks.map((task, idx) => (
          <li key={idx} className="flex justify-between items-center">
            <label className="flex gap-2 items-center">
              <input type="checkbox" checked={task.done} onChange={() => toggleTask(idx)} />
              <span className={task.done ? 'line-through' : ''}>{task.text}</span>
            </label>
            <button onClick={() => removeTask(idx)} className="text-red-600">✕</button>
          </li>
        ))}
      </ul>
      <div className="flex gap-2">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="New task"
          className="flex-grow px-3 py-2 border rounded-md"
        />
        <button onClick={addTask} className="bg-blue-600 text-white px-4 py-2 rounded-md">
          Add
        </button>
      </div>
    </div>
  );
}

// ---------------- REMINDERS ----------------
function Reminders() {
  const [reminders, setReminders] = useState([
    { text: 'Doctor appointment', time: '2025-07-20T15:00' },
    { text: 'Call grandma', time: '2025-07-21T18:30' },
  ]);
  const [text, setText] = useState('');
  const [time, setTime] = useState('');

  const addReminder = () => {
    if (text.trim() && time) {
      setReminders([...reminders, { text, time }]);
      setText('');
      setTime('');
    }
  };

  const removeReminder = (index: number) => {
    setReminders(reminders.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-white text-black p-5 rounded-xl shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Reminders</h2>
      <ul className="space-y-2 mb-4">
        {reminders.map((r, idx) => (
          <li key={idx} className="flex justify-between items-center">
            <div>
              <p>{r.text}</p>
              <p className="text-sm text-gray-600">🕒 {new Date(r.time).toLocaleString()}</p>
            </div>
            <button onClick={() => removeReminder(idx)} className="text-red-600">✕</button>
          </li>
        ))}
      </ul>
      <div className="space-y-2">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Reminder"
          className="w-full px-3 py-2 border rounded-md"
        />
        <input
          type="datetime-local"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
        />
        <button
          onClick={addReminder}
          className="w-full bg-blue-600 text-white py-2 rounded-md"
        >
          Add Reminder
        </button>
      </div>
    </div>
  );
}

// ---------------- GOAL TRACKER ----------------
function GoalTracker() {
  const [goals, setGoals] = useState([
    { text: 'Learn 100 French words', progress: 30 },
    { text: 'Run 5km', progress: 50 },
  ]);
  const [newGoal, setNewGoal] = useState('');
