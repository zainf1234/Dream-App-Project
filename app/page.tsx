'use client';
import { useState } from 'react';

type Page = 'todo' | 'reminders' | 'goals';

// Update these paths to your actual image files in public folder
const todoImage = '/images/Todo.webp';
const reminderImage = '/images/Reminder.jpg';
const goalsImage = '/images/Goals.webp';

export default function Home() {
  const [page, setPage] = useState<Page>('todo');

  const breadcrumbLabels: Record<Page, string> = {
    todo: 'To Do List',
    reminders: 'Reminders',
    goals: 'Goal Tracker',
  };

  return (
    <>
      <nav
        style={{
          position: 'sticky',
          top: 0,
          backgroundColor: 'blue',
          color: 'white',
          padding: '1rem',
          zIndex: 1000,
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
          gap: '1rem',
          fontSize: 'clamp(1rem, 1.5vw, 1.25rem)',
        }}
      >
        {(['todo', 'reminders', 'goals'] as Page[]).map((p) => (
          <button
            key={p}
            onClick={() => setPage(p)}
            style={{
              padding: '0.25rem 0.75rem',
              borderRadius: '0.375rem',
              backgroundColor: page === p ? '#2563eb' : 'transparent',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
            }}
            aria-current={page === p ? 'page' : undefined}
          >
            {breadcrumbLabels[p]}
          </button>
        ))}
      </nav>

      <main
        style={{
          minHeight: '100vh',
          backgroundColor: '#111827',
          color: 'white',
          padding: 'clamp(1rem, 2vw, 3rem)',
          maxWidth: 'calc(100vw - 2rem)',
          margin: 'auto',
          marginTop: '2rem',
          fontFamily: 'sans-serif',
        }}
      >
        <h1
          style={{
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: '1rem',
            fontSize: 'clamp(1.5rem, 4vw, 3rem)',
          }}
        >
          My Productivity Tools
        </h1>

        {page === 'todo' && <ToDoList />}
        {page === 'reminders' && <Reminders />}
        {page === 'goals' && <GoalTracker />}
      </main>
    </>
  );
}

// --------- ToDoList ---------
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
      style={{
        backgroundColor: 'white',
        color: 'black',
        padding: 'clamp(1rem, 1.5vw, 2rem)',
        borderRadius: '1rem',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      }}
    >
      <h2 style={{ fontSize: 'clamp(1.25rem, 2vw, 1.75rem)', marginBottom: '1rem' }}>
        To Do List
      </h2>
      <ul style={{ marginBottom: '1rem', fontSize: 'clamp(0.9rem, 1vw, 1.1rem)' }}>
        {tasks.map((task, idx) => (
          <li
            key={idx}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              marginBottom: '0.5rem',
            }}
          >
            <label style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <input
                  type="checkbox"
                  checked={task.done}
                  onChange={() => toggleDone(idx)}
                />
                <span style={{ textDecoration: task.done ? 'line-through' : 'none' }}>
                  {task.text}
                </span>
              </div>
              {task.due && (
                <span style={{ fontSize: '0.85rem', color: '#4b5563' }}>
                  Due: {task.due}
                </span>
              )}
            </label>
            <button
              onClick={() => removeTask(idx)}
              style={{ color: '#dc2626', fontSize: '1.25rem', border: 'none', background: 'none', cursor: 'pointer' }}
              aria-label={`Remove task ${task.text}`}
            >
              ✕
            </button>
          </li>
        ))}
      </ul>

      {error && <p style={{ color: '#dc2626', marginBottom: '1rem' }}>{error}</p>}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="New task"
          style={{
            padding: 'clamp(0.5rem, 1vw, 0.75rem)',
            fontSize: 'clamp(1rem, 1vw, 1.2rem)',
            borderRadius: '0.375rem',
            border: '1px solid #d1d5db',
          }}
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          style={{
            padding: 'clamp(0.5rem, 1vw, 0.75rem)',
            fontSize: 'clamp(1rem, 1vw, 1.2rem)',
            borderRadius: '0.375rem',
            border: '1px solid #d1d5db',
          }}
        />
        <button
          onClick={addTask}
          style={{
            backgroundColor: '#2563eb',
            color: 'white',
            padding: '0.5rem',
            borderRadius: '0.375rem',
            fontSize: 'clamp(1rem, 1vw, 1.2rem)',
            border: 'none',
            cursor: 'pointer',
          }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#1e40af')}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#2563eb')}
        >
          Add Task
        </button>
      </div>

      {/* Image at bottom */}
      <div style={{ marginTop: '2rem', textAlign: 'center' }}>
        <img
          src="/images/Todo.webp"
          alt="To Do List Illustration"
          style={{
            maxWidth: '300px',
            width: '80%',
            height: 'auto',
            borderRadius: '0.75rem',
            boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
            margin: 'auto',
          }}
        />
      </div>
    </div>
  );
}

// --------- Reminders ---------
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
      style={{
        backgroundColor: 'white',
        color: 'black',
        padding: 'clamp(1rem, 1.5vw, 2rem)',
        borderRadius: '1rem',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      }}
    >
      <h2 style={{ fontSize: 'clamp(1.25rem, 2vw, 1.75rem)', marginBottom: '1rem' }}>
        Reminders
      </h2>
      <ul style={{ fontSize: 'clamp(0.9rem, 1vw, 1.1rem)', marginBottom: '1rem' }}>
        {reminders.map((r, idx) => (
          <li
            key={idx}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '0.5rem',
            }}
          >
            <div>
              <p>{r.text}</p>
              <p style={{ fontSize: '0.85rem', color: '#4b5563' }}>
                🕒 {new Date(r.time).toLocaleString()}
              </p>
            </div>
            <button
              onClick={() => removeReminder(idx)}
              style={{ color: '#dc2626', fontSize: '1.25rem', border: 'none', background: 'none', cursor: 'pointer' }}
              aria-label={`Remove reminder ${r.text}`}
            >
              ✕
            </button>
          </li>
        ))}
      </ul>

      {error && <p style={{ color: '#dc2626', marginBottom: '1rem' }}>{error}</p>}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Reminder"
          style={{
            padding: 'clamp(0.5rem, 1vw, 0.75rem)',
            fontSize: 'clamp(1rem, 1vw, 1.2rem)',
            borderRadius: '0.375rem',
            border: '1px solid #d1d5db',
          }}
        />
        <input
          type="datetime-local"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          style={{
            padding: 'clamp(0.5rem, 1vw, 0.75rem)',
            fontSize: 'clamp(1rem, 1vw, 1.2rem)',
            borderRadius: '0.375rem',
            border: '1px solid #d1d5db',
          }}
        />
        <button
          onClick={addReminder}
          style={{
            backgroundColor: '#2563eb',
            color: 'white',
            padding: '0.5rem',
            borderRadius: '0.375rem',
            fontSize: 'clamp(1rem, 1vw, 1.2rem)',
            border: 'none',
            cursor: 'pointer',
          }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#1e40af')}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#2563eb')}
        >
          Add Reminder
        </button>
      </div>

      {/* Image at bottom */}
      <div style={{ marginTop: '2rem', textAlign: 'center' }}>
        <img
          src="/images/Reminder.jpg"
          alt="Reminders Illustration"
          style={{
            maxWidth: '300px',
            width: '80%',
            height: 'auto',
            borderRadius: '0.75rem',
            boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
            margin: 'auto',
          }}
        />
      </div>
    </div>
  );
}

// --------- Goal Tracker ---------
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
      style={{
        backgroundColor: 'white',
        color: 'black',
        padding: 'clamp(1rem, 1.5vw, 2rem)',
        borderRadius: '1rem',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      }}
    >
      <h2 style={{ fontSize: 'clamp(1.25rem, 2vw, 1.75rem)', marginBottom: '1rem' }}>
        Goal Tracker
      </h2>
      <ul style={{ fontSize: 'clamp(0.9rem, 1vw, 1.1rem)', marginBottom: '1rem' }}>
        {goals.map((goal, idx) => (
          <li key={idx} style={{ marginBottom: '1.5rem' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '0.5rem',
              }}
            >
              <span>{goal.name}</span>
              <button
                onClick={() => removeGoal(idx)}
                style={{ color: '#dc2626', fontSize: '1.25rem', border: 'none', background: 'none', cursor: 'pointer' }}
                aria-label={`Remove goal ${goal.name}`}
              >
                ✕
              </button>
            </div>
            {goal.due && (
              <p style={{ fontSize: '0.85rem', color: '#4b5563', marginBottom: '0.5rem' }}>
                Due: {goal.due}
              </p>
            )}
            <div
              style={{
                width: '100%',
                backgroundColor: '#e5e7eb',
                height: '0.75rem',
                borderRadius: '9999px',
                overflow: 'hidden',
                marginBottom: '0.5rem',
              }}
            >
              <div
                style={{
                  height: '100%',
                  backgroundColor: '#22c55e',
                  transition: 'width 0.3s ease',
                  width: `${goal.progress}%`,
                }}
              />
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={goal.progress}
              onChange={(e) => updateProgress(idx, parseInt(e.target.value))}
              style={{ width: '100%' }}
            />
          </li>
        ))}
      </ul>

      {error && <p style={{ color: '#dc2626', marginBottom: '1rem' }}>{error}</p>}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <input
          type="text"
          value={newGoal}
          onChange={(e) => setNewGoal(e.target.value)}
          placeholder="New goal"
          style={{
            padding: 'clamp(0.5rem, 1vw, 0.75rem)',
            fontSize: 'clamp(1rem, 1vw, 1.2rem)',
            borderRadius: '0.375rem',
            border: '1px solid #d1d5db',
          }}
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          style={{
            padding: 'clamp(0.5rem, 1vw, 0.75rem)',
            fontSize: 'clamp(1rem, 1vw, 1.2rem)',
            borderRadius: '0.375rem',
            border: '1px solid #d1d5db',
          }}
        />
        <button
          onClick={addGoal}
          style={{
            backgroundColor: '#2563eb',
            color: 'white',
            padding: '0.5rem',
            borderRadius: '0.375rem',
            fontSize: 'clamp(1rem, 1vw, 1.2rem)',
            border: 'none',
            cursor: 'pointer',
          }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#1e40af')}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#2563eb')}
        >
          Add Goal
        </button>
      </div>

      {/* Image at bottom */}
      <div style={{ marginTop: '2rem', textAlign: 'center' }}>
        <img
          src="/images/Goals.webp"
          alt="Goals Illustration"
          style={{
            maxWidth: '300px',
            width: '80%',
            height: 'auto',
            borderRadius: '0.75rem',
            boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
            margin: 'auto',
          }}
        />
      </div>
    </div>
  );
}
