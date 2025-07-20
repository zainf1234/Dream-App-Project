'use client';
import { useState } from 'react';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-900 text-white p-6 space-y-10">
      <h1 className="text-4xl font-bold text-center mb-4">My Productivity Tools</h1>
      <div className="grid md:grid-cols-3 gap-8">
        <ToDoList />
        <Reminders />
        <GoalTracker />
      </div>
    </main>
  );
}

// -------------------- TO DO LIST --------------------
function ToDoList() {
  const [tasks, setTasks] = useState([
    { text: 'Finish homework', done: false },
    { text: 'Read 10 pages', done: true },
  ]);
  const [newTask, setNewTask] = useState('');

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, { text: newTask, done: false }]);
      setNewTask('');
    }
  };

  const toggleDone = (index: number) => {
    const updated = [...tasks];
    updated[index].done = !updated[index].done;
    setTasks(updated);
  };

  const removeTask = (index: number) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-white text-black p-5 rounded-xl shadow-md">
      <h2 className="text-2xl font-semibold mb-3">To Do List</h2>
      <ul className="space-y-2">
        {tasks.map((task, idx) => (
          <li key={idx} className="flex items-center justify-between">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={task.done}
                onChange={() => toggleDone(idx)}
              />
              <span className={task.done ? 'line-through' : ''}>{task.text}</span>
            </label>
            <button onClick={() => removeTask(idx)} className="text-red-600">✕</button>
          </li>
        ))}
      </ul>
      <div className="mt-4 flex gap-2">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="flex-grow px-3 py-2 border rounded-md"
          placeholder="New task"
        />
        <button onClick={addTask} className="bg-blue-600 text-white px-4 py-2 rounded-md">
          Add
        </button>
      </div>
    </div>
  );
}

// -------------------- REMINDERS --------------------
function Reminders() {
  const [reminders, setReminders] = useState([
    { text: 'Dentist appointment', time: '2025-07-21T10:00' },
    { text: 'Project meeting', time: '2025-07-22T14:30' },
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
      <h2 className="text-2xl font-semibold mb-3">Reminders</h2>
      <ul className="space-y-2">
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
      <div className="mt-4 space-y-2">
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

// -------------------- GOAL TRACKER --------------------
function GoalTracker() {
  const [goals, setGoals] = useState([
    { name: 'Learn 200 French words', progress: 40 },
    { name: 'Run 5km in under 30 min', progress: 70 },
  ]);
  const [newGoal, setNewGoal] = useState('');

  const addGoal = () => {
    if (newGoal.trim() !== '') {
      setGoals([...goals, { name: newGoal, progress: 0 }]);
      setNewGoal('');
    }
  };

  const removeGoal = (index: number) => {
    setGoals(goals.filter((_, i) => i !== index));
  };

  const updateProgress = (index: number, newProgress: number) => {
    const updated = [...goals];
    updated[index].progress = newProgress;
    setGoals(updated);
  };

  return (
    <div className="bg-white text-black p-5 rounded-xl shadow-md">
      <h2 className="text-2xl font-semibold mb-3">Goal Tracker</h2>
      <ul className="space-y-4">
        {goals.map((goal, idx) => (
          <li key={idx}>
            <div className="flex justify-between items-center mb-1">
              <span>{goal.name}</span>
              <button onClick={() => removeGoal(idx)} className="text-red-600">✕</button>
            </div>
            <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden mb-1">
              <div
                className="h-full bg-green-500 transition-all"
                style={{ width: `${goal.progress}%` }}
              />
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={goal.progress}
              onChange={(e) => updateProgress(idx, parseInt(e.target.value))}
              className="w-full"
            />
          </li>
        ))}
      </ul>
      <div className="mt-4 flex gap-2">
        <input
          type="text"
          value={newGoal}
          onChange={(e) => setNewGoal(e.target.value)}
          className="flex-grow px-3 py-2 border rounded-md"
          placeholder="New goal"
        />
        <button onClick={addGoal} className="bg-blue-600 text-white px-4 py-2 rounded-md">
          Add
        </button>
      </div>
    </div>
  );
}
