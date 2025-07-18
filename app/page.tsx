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

  const toggleDone = (index: number) => {
    const updated = [...tasks];
    updated[index].done = !updated[index].done;
    setTasks(updated);
  };

  const removeTask = (index: number) => {
    const updated = tasks.filter((_, i) => i !== index);
    setTasks(updated);
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

function Reminders() {
  const [reminders, setReminders] = useState([
    { text: 'Doctor appointment', time: '2025-07-20 15:00' },
    { text: 'Call grandma', time: '2025-07-18 18:30' },
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
              <p className="text-sm text-gray-600">🕒 {r.time}</p>
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

function GoalTracker() {
  const [goals, setGoals] = useState([
    'Learn 100 new French words',
    'Run 5km without stopping',
  ]);
  const [newGoal, setNewGoal] = useState('');

  const addGoal = () => {
    if (newGoal.trim() !== '') {
      setGoals([...goals, newGoal]);
      setNewGoal('');
    }
  };

  const removeGoal = (index: number) => {
    setGoals(goals.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-white text-black p-5 rounded-xl shadow-md">
      <h2 className="text-2xl font-semibold mb-3">Goal Tracker</h2>
      <ul className="space-y-2">
        {goals.map((goal, idx) => (
          <li key={idx} className="flex justify-between items-center">
            <span>{goal}</span>
            <button onClick={() => removeGoal(idx)} className="text-red-600">✕</button>
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
