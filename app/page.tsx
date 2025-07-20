'use client';
import { useState } from 'react';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-900 text-white p-6 space-y-10">
      <h1 className="text-4xl font-bold text-center mb-10">My Productivity Dashboard</h1>
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
    { text: 'Finish homework', due: '', done: false },
  ]);
  const [text, setText] = useState('');
  const [due, setDue] = useState('');

  const addTask = () => {
    if (!text.trim()) return;
    setTasks([...tasks, { text, due, done: false }]);
    setText('');
    setDue('');
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
      <h2 className="text-2xl font-semibold mb-4">To Do List</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addTask();
        }}
        className="space-y-3 mb-5"
      >
        <input
          type="text"
          placeholder="New task"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full border px-3 py-2 rounded-md"
          required
        />
        <input
          type="date"
          value={due}
          onChange={(e) => setDue(e.target.value)}
          className="w-full border px-3 py-2 rounded-md"
        />
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md">
          Add Task
        </button>
      </form>
      <ul className="space-y-2">
        {tasks.map((task, idx) => (
          <li key={idx} className="flex justify-between items-center">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={task.done}
                onChange={() => toggleDone(idx)}
              />
              <span className={task.done ? 'line-through' : ''}>{task.text}</span>
              {task.due && <span className="text-sm text-gray-600 ml-2">📅 {task.due}</span>}
            </label>
            <button onClick={() => removeTask(idx)} className="text-red-600">✕</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Reminders() {
  const [reminders, setReminders] = useState([
    { title: 'Dentist appointment', time: '2025-07-22T15:30', notes: '' },
  ]);
  const [title, setTitle] = useState('');
  const [time, setTime] = useState('');
  const [notes, setNotes] = useState('');

  const addReminder = () => {
    if (!title.trim() || !time) return;
    setReminders([...reminders, { title, time, notes }]);
    setTitle('');
    setTime('');
    setNotes('');
  };

  const removeReminder = (index: number) => {
    setReminders(reminders.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-white text-black p-5 rounded-xl shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Reminders</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addReminder();
        }}
        className="space-y-3 mb-5"
      >
        <input
          type="text"
          placeholder="Reminder title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border px-3 py-2 rounded-md"
          required
        />
        <input
          type="datetime-local"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="w-full border px-3 py-2 rounded-md"
          required
        />
        <textarea
          placeholder="Optional notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full border px-3 py-2 rounded-md"
        />
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md">
          Add Reminder
        </button>
      </form>
      <ul className="space-y-2">
        {reminders.map((r, idx) => (
          <li key={idx} className="flex justify-between items-start">
            <div>
              <p className="font-medium">{r.title}</p>
              <p className="text-sm text-gray-600">🕒 {r.time.replace('T', ' ')}</p>
              {r.notes && <p className="text-sm text-gray-700">{r.notes}</p>}
            </div>
            <button onClick={() => removeReminder(idx)} className="text-red-600">✕</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function GoalTracker() {
  const [goals, setGoals] = useState([
    { goal: 'Read 5 books', target: '2025-08-01' },
  ]);
  const [goal, setGoal] = useState('');
  const [target, setTarget] = useState('');

  const addGoal = () => {
    if (!goal.trim()) return;
    setGoals([...goals, { goal, target }]);
    setGoal('');
    setTarget('');
  };

  const removeGoal = (index: number) => {
    setGoals(goals.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-white text-black p-5 rounded-xl shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Goal Tracker</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addGoal();
        }}
        className="space-y-3 mb-5"
      >
        <input
          type="text"
          placeholder="Goal"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          className="w-full border px-3 py-2 rounded-md"
          required
        />
        <input
          type="date"
          value={target}
          onChange={(e) => setTarget(e.target.value)}
          className="w-full border px-3 py-2 rounded-md"
        />
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md">
          Add Goal
        </button>
      </form>
      <ul className="space-y-2">
        {goals.map((g, idx) => (
          <li key={idx} className="flex justify-between items-center">
            <span>
              {g.goal}
              {g.target && (
                <span className="text-sm text-gray-600 ml-2">🎯 {g.target}</span>
              )}
            </span>
            <button onClick={() => removeGoal(idx)} className="text-red-600">✕</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
