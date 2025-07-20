'use client';
import { useState } from 'react';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-900 text-white p-6 space-y-10">
      <h1 className="text-4xl font-bold text-center">My Productivity Tools</h1>
      <div className="grid md:grid-cols-3 gap-8">
        <ToDoList />
        <Reminders />
        <GoalTracker />
      </div>
    </main>
  );
}

// ---------------- To Do List ----------------

function ToDoList() {
  const [tasks, setTasks] = useState([{ text: 'Finish homework', done: false }]);
  const [newTask, setNewTask] = useState('');

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { text: newTask, done: false }]);
      setNewTask('');
    }
  };

  const toggleTask = (i: number) => {
    const updated = [...tasks];
    updated[i].done = !updated[i].done;
    setTasks(updated);
  };

  const removeTask = (i: number) => {
    setTasks(tasks.filter((_, idx) => idx !== i));
  };

  return (
    <div className="bg-white text-black p-5 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">To Do List</h2>
      <div className="space-y-3">
        {tasks.map((task, i) => (
          <div key={i} className="flex items-center justify-between">
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={task.done} onChange={() => toggleTask(i)} />
              <span className={task.done ? 'line-through' : ''}>{task.text}</span>
            </label>
            <button onClick={() => removeTask(i)} className="text-red-600">✕</button>
          </div>
        ))}
        <div className="flex gap-2 mt-2">
          <input
            className="flex-grow px-3 py-2 border rounded"
            placeholder="New task"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={addTask}>
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

// ---------------- Reminders ----------------

function Reminders() {
  const [reminders, setReminders] = useState([
    { text: 'Call Alex', time: '2025-07-21T15:30' },
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

  const removeReminder = (i: number) => {
    setReminders(reminders.filter((_, idx) => idx !== i));
  };

  return (
    <div className="bg-white text-black p-5 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">Reminders</h2>
      <div className="space-y-3">
        {reminders.map((r, i) => (
          <div key={i} className="flex justify-between items-center">
            <div>
              <p>{r.text}</p>
              <p className="text-sm text-gray-600">🕒 {new Date(r.time).toLocaleString()}</p>
            </div>
            <button onClick={() => removeReminder(i)} className="text-red-600">✕</button>
          </div>
        ))}
        <div className="space-y-2 mt-2">
          <input
            className="w-full px-3 py-2 border rounded"
            placeholder="Reminder text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <input
            type="datetime-local"
            className="w-full px-3 py-2 border rounded"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
          <button className="w-full bg-blue-600 text-white py-2 rounded" onClick={addReminder}>
            Add Reminder
          </button>
        </div>
      </div>
    </div>
  );
}

// ---------------- Goal Tracker ----------------

function GoalTracker() {
  const [goals, setGoals] = useState([
    { text: 'Read 10 books', progress: 20 },
    { text: 'Learn React', progress: 50 },
  ]);
  const [text, setText] = useState('');
  const [progress, setProgress] = useState(0);

  const addGoal = () => {
    if (text.trim()) {
      setGoals([...goals, { text, progress: Number(progress) }]);
      setText('');
      setProgress(0);
    }
  };

  const removeGoal = (i: number) => {
    setGoals(goals.filter((_, idx) => idx !== i));
  };

  const updateProgress = (i: number, value: number) => {
    const updated = [...goals];
    updated[i].progress = Math.max(0, Math.min(100, value));
    setGoals(updated);
  };

  return (
    <div className="bg-white text-black p-5 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">Goal Tracker</h2>
      <div className="space-y-4">
        {goals.map((g, i) => (
          <div key={i}>
            <div className="flex justify-between items-center mb-1">
              <span>{g.text}</span>
              <button onClick={() => removeGoal(i)} className="text-red-600">✕</button>
            </div>
            <div className="w-full bg-gray-200 rounded h-3 overflow-hidden mb-2">
              <div
                className="bg-green-500 h-3"
                style={{ width: `${g.progress}%` }}
              />
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={g.progress}
              onChange={(e) => updateProgress(i, Number(e.target.value))}
              className="w-full"
            />
          </div>
        ))}
        <div className="space-y-2 pt-2">
          <input
            className="w-full px-3 py-2 border rounded"
            placeholder="New goal"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <input
            type="number"
            min={0}
            max={100}
            className="w-full px-3 py-2 border rounded"
            placeholder="Progress %"
            value={progress}
            onChange={(e) => setProgress(Number(e.target.value))}
          />
          <button onClick={addGoal} className="w-full bg-blue-600 text-white py-2 rounded">
            Add Goal
          </button>
        </div>
      </div>
    </div>
  );
}
