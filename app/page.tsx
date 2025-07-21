'use client';
import { useState } from 'react';

export default function Home() {
  return (
    <main
      className="min-h-screen bg-gray-900 text-white space-y-10 max-w-[calc(100vw-2rem)] mx-auto"
      style={{ padding: 'clamp(1rem, 2vw, 3rem)' }}
    >
      <h1
        className="font-bold text-center mb-4"
        style={{ fontSize: 'clamp(1.5rem, 4vw, 3rem)' }}
      >
        My Productivity Tools
      </h1>
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
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
    { text: 'Finish homework', done: false, due: '2025-07-22' },
  ]);
  const [newTask, setNewTask] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [error, setError] = useState('');

  const addTask = () => {
    if (newTask.trim() === '') {
      setError('Task name is required.');
      return;
    }
    setTasks([...tasks, { text: newTask, done: false, due: dueDate }]);
    setNewTask('');
    setDueDate('');
    setError('');
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
    <div
      className="bg-white text-black p-5 rounded-xl shadow-md"
      style={{ padding: 'clamp(1rem, 1.5vw, 2rem)' }}
    >
      <h2 className="text-2xl font-semibold mb-3" style={{ fontSize: 'clamp(1.25rem, 2vw, 1.75rem)' }}>
        To Do List
      </h2>
      <ul className="space-y-2">
        {tasks.map((task, idx) => (
          <li key={idx} className="flex items-start justify-between">
            <label className="flex flex-col gap-1" style={{ fontSize: 'clamp(0.9rem, 1vw, 1.1rem)' }}>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={task.done}
                  onChange={() => toggleDone(idx)}
                />
                <span className={task.done ? 'line-through' : ''}>{task.text}</span>
              </div>
              {task.due && (
                <span className="text-sm text-gray-600">Due: {task.due}</span>
              )}
            </label>
            <button onClick={() => removeTask(idx)} className="text-red-600 text-xl">✕</button>
          </li>
        ))}
      </ul>
      {error && <p className="text-red-600 mt-2">{error}</p>}
      <div className="mt-4 space-y-2">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
          placeholder="New task"
          style={{ fontSize: 'clamp(1rem, 1vw, 1.2rem)', padding: 'clamp(0.5rem, 1vw, 0.75rem)' }}
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
          style={{ fontSize: 'clamp(1rem, 1vw, 1.2rem)', padding: 'clamp(0.5rem, 1vw, 0.75rem)' }}
        />
        <button
          onClick={addTask}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          style={{ fontSize: 'clamp(1rem, 1vw, 1.2rem)' }}
        >
          Add Task
        </button>
      </div>
    </div>
  );
}

// ---------------- REMINDERS ----------------
function Reminders() {
  const [reminders, setReminders] = useState([
    { text: 'Dentist appointment', time: '2025-07-21T10:00' },
  ]);
  const [text, setText] = useState('');
  const [time, setTime] = useState('');
  const [error, setError] = useState('');

  const addReminder = () => {
    if (text.trim() === '' || !time) {
      setError('Reminder and time are required.');
      return;
    }
    setReminders([...reminders, { text, time }]);
    setText('');
    setTime('');
    setError('');
  };

  const removeReminder = (index: number) => {
    setReminders(reminders.filter((_, i) => i !== index));
  };

  return (
    <div
      className="bg-white text-black p-5 rounded-xl shadow-md"
      style={{ padding: 'clamp(1rem, 1.5vw, 2rem)' }}
    >
      <h2 className="text-2xl font-semibold mb-3" style={{ fontSize: 'clamp(1.25rem, 2vw, 1.75rem)' }}>
        Reminders
      </h2>
      <ul className="space-y-2" style={{ fontSize: 'clamp(0.9rem, 1vw, 1.1rem)' }}>
        {reminders.map((r, idx) => (
          <li key={idx} className="flex justify-between items-center">
            <div>
              <p>{r.text}</p>
              <p className="text-sm text-gray-600">🕒 {new Date(r.time).toLocaleString()}</p>
            </div>
            <button onClick={() => removeReminder(idx)} className="text-red-600 text-xl">✕</button>
          </li>
        ))}
      </ul>
      {error && <p className="text-red-600 mt-2">{error}</p>}
      <div className="mt-4 space-y-2">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Reminder"
          className="w-full px-3 py-2 border rounded-md"
          style={{ fontSize: 'clamp(1rem, 1vw, 1.2rem)', padding: 'clamp(0.5rem, 1vw, 0.75rem)' }}
        />
        <input
          type="datetime-local"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
          style={{ fontSize: 'clamp(1rem, 1vw, 1.2rem)', padding: 'clamp(0.5rem, 1vw, 0.75rem)' }}
        />
        <button
          onClick={addReminder}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          style={{ fontSize: 'clamp(1rem, 1vw, 1.2rem)' }}
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
    { name: 'Run 5km', progress: 60, due: '2025-08-01' },
  ]);
  const [newGoal, setNewGoal] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [error, setError] = useState('');

  const addGoal = () => {
    if (newGoal.trim() === '') {
      setError('Goal name is required.');
      return;
    }
    setGoals([...goals, { name: newGoal, progress: 0, due: dueDate }]);
    setNewGoal('');
    setDueDate('');
    setError('');
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
    <div
      className="bg-white text-black p-5 rounded-xl shadow-md"
      style={{ padding: 'clamp(1rem, 1.5vw, 2rem)' }}
    >
      <h2 className="text-2xl font-semibold mb-3" style={{ fontSize: 'clamp(1.25rem, 2vw, 1.75rem)' }}>
        Goal Tracker
      </h2>
      <ul className="space-y-4" style={{ fontSize: 'clamp(0.9rem, 1vw, 1.1rem)' }}>
        {goals.map((goal, idx) => (
          <li key={idx}>
            <div className="flex justify-between items-center mb-1">
              <span>{goal.name}</span>
              <button onClick={() => removeGoal(idx)} className="text-red-600 text-xl">✕</button>
            </div>
            {goal.due && (
              <p className="text-sm text-gray-600 mb-1">Due: {goal.due}</p>
            )}
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
      {error && <p className="text-red-600 mt-2">{error}</p>}
      <div className="mt-4 space-y-2">
        <input
          type="text"
          value={newGoal}
          onChange={(e) => setNewGoal(e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
          placeholder="New goal"
          style={{ fontSize: 'clamp(1rem, 1vw, 1.2rem)', padding: 'clamp(0.5rem, 1vw, 0.75rem)' }}
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
          style={{ fontSize: 'clamp(1rem, 1vw, 1.2rem)', padding: 'clamp(0.5rem, 1vw, 0.75rem)' }}
        />
        <button
          onClick={addGoal}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          style={{ fontSize: 'clamp(1rem, 1vw, 1.2rem)' }}
        >
          Add Goal
        </button>
      </div>
    </div>
  );
}
