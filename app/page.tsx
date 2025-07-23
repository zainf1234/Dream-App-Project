'use client';
import { useState, useEffect, useRef } from 'react';

type Page = 'todo' | 'reminders' | 'goals';

function withRepoPrefix(src: string): string {
  if (typeof window !== 'undefined') {
    const host = window.location.host;
    const match = host.match(/^[^.]+\.github\.io\/([^/]+)/);
    let repo = '';
    if (match && match[1]) {
      repo = match[1];
    } else {
      const pathMatch = window.location.pathname.match(/^\/([^/]+)\//);
      if (pathMatch && pathMatch[1]) {
        repo = pathMatch[1];
      }
    }
    if (repo && !src.startsWith(`/${repo}`)) {
      return `/${repo}${src.startsWith('/') ? src : '/' + src}`;
    }
  }
  return src;
}

function RepoImage({
  src,
  alt,
  style,
}: {
  src: string;
  alt: string;
  style?: React.CSSProperties;
}) {
  const [imgSrc, setImgSrc] = useState('');

  useEffect(() => {
    setImgSrc(withRepoPrefix(src));
  }, [src]);

  if (!imgSrc) {
    return null;
  }

  return <img src={imgSrc} alt={alt} style={style} />;
}

export default function Home() {
  const [page, setPage] = useState<Page>('todo');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

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

// --- ToDoList with fade-in/fade-out animations ---
function ToDoList() {
  // We'll store tasks as objects with id for keys and extra field isFadingOut
  type Task = { id: string; text: string; done: boolean; due: string; isFadingOut?: boolean };

  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', text: 'Finish homework', done: false, due: '2025-07-22' },
  ]);
  const [newTask, setNewTask] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [error, setError] = useState('');
  const nextIdRef = useRef(2);

  // For newly added tasks we want to add a 'fade-in' class
  const [addedTaskId, setAddedTaskId] = useState<string | null>(null);

  const addTask = () => {
    if (newTask.trim() === '') {
      setError('Task name is required.');
      return;
    }
    const id = String(nextIdRef.current++);
    const newTaskObj: Task = { id, text: newTask, done: false, due: dueDate };
    setTasks((old) => [...old, newTaskObj]);
    setNewTask('');
    setDueDate('');
    setError('');
    setAddedTaskId(id);
  };

  const toggleDone = (id: string) => {
    setTasks((old) =>
      old.map((task) => (task.id === id ? { ...task, done: !task.done } : task))
    );
  };

  // On delete: set isFadingOut on task, after animation remove it
  const removeTask = (id: string) => {
    setTasks((old) =>
      old.map((task) =>
        task.id === id ? { ...task, isFadingOut: true } : task
      )
    );
  };

  // Handle animation end (called on each list item)
  const handleAnimationEnd = (id: string) => {
    setTasks((old) => old.filter((task) => task.id !== id));
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
      <ul style={{ marginBottom: '1rem', fontSize: 'clamp(0.9rem, 1vw, 1.1rem)', listStyle: 'none', padding: 0 }}>
        {tasks.map((task) => (
          <li
            key={task.id}
            className={`task-item
              ${addedTaskId === task.id ? 'fade-in' : ''}
              ${task.isFadingOut ? 'fade-out' : ''}
            `}
            onAnimationEnd={() => {
              if (task.isFadingOut) handleAnimationEnd(task.id);
              if (addedTaskId === task.id) setAddedTaskId(null);
            }}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              marginBottom: '0.5rem',
              padding: '0.5rem',
              borderRadius: '0.375rem',
              backgroundColor: '#f3f4f6',
              opacity: task.isFadingOut ? 0 : 1,
              transition: 'opacity 0.5s ease',
            }}
          >
            <label style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <input
                  type="checkbox"
                  checked={task.done}
                  onChange={() => toggleDone(task.id)}
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
              onClick={() => removeTask(task.id)}
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

      <div style={{ marginTop: '2rem', textAlign: 'center' }}>
        <RepoImage
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

      {/* CSS for fade in/out */}
      <style>{`
        .task-item.fade-in {
          animation: fadeIn 0.5s ease forwards;
        }
        .task-item.fade-out {
          animation: fadeOut 0.5s ease forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeOut {
          from { opacity: 1; transform: translateY(0); height: auto; margin-bottom: 0.5rem; padding: 0.5rem; }
          to { opacity: 0; transform: translateY(-10px); height: 0; margin-bottom: 0; padding: 0; }
        }
      `}</style>
    </div>
  );
}

// Reminders and GoalTracker remain unchanged from your previous page.tsx
// You can add the same fade logic if you want for those components

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

      <div style={{ marginTop: '2rem', textAlign: 'center' }}>
        <RepoImage
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
      <ul style={{ fontSize: 'clamp(0.9rem, 1vw, 1.1rem)', marginBottom: '1rem', listStyle: 'none', padding: 0 }}>
        {goals.map((goal, idx) => (
          <li
            key={idx}
            style={{
              marginBottom: '0.75rem',
              padding: '0.5rem',
              borderRadius: '0.375rem',
              backgroundColor: '#f3f4f6',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.25rem',
            }}
          >
            <div style={{ fontWeight: 'bold' }}>{goal.name}</div>
            <input
              type="range"
              min={0}
              max={100}
              value={goal.progress}
              onChange={(e) => updateProgress(idx, Number(e.target.value))}
              style={{ width: '100%' }}
            />
            <div style={{ fontSize: '0.85rem', color: '#4b5563' }}>
              Progress: {goal.progress}%
            </div>
            <div style={{ fontSize: '0.85rem', color: '#4b5563' }}>
              Due: {goal.due}
            </div>
            <button
              onClick={() => removeGoal(idx)}
              style={{
                alignSelf: 'flex-end',
                backgroundColor: '#dc2626',
                color: 'white',
                border: 'none',
                borderRadius: '0.375rem',
                padding: '0.25rem 0.5rem',
                cursor: 'pointer',
                fontSize: '0.9rem',
              }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#b91c1c')}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#dc2626')}
            >
              Remove
            </button>
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

      <div style={{ marginTop: '2rem', textAlign: 'center' }}>
        <RepoImage
          src="/images/Goals.webp"
          alt="Goal Tracker Illustration"
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
