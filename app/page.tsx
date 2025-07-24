'use client';
import { useState, useEffect, useRef } from 'react';

type Page = 'todo' | 'reminders' | 'goals';

// Utility to prefix repo for images on GitHub Pages
function withRepoPrefix(src: string): string {
  if (typeof window !== "undefined") {
    const host = window.location.host;
    const match = host.match(/^[^.]+\.github\.io\/([^/]+)/);
    let repo = "";
    if (match && match[1]) {
      repo = match[1];
    } else {
      const pathMatch = window.location.pathname.match(/^\/([^/]+)\//);
      if (pathMatch && pathMatch[1]) {
        repo = pathMatch[1];
      }
    }
    if (repo && !src.startsWith(`/${repo}`)) {
      return `/${repo}${src.startsWith("/") ? src : "/" + src}`;
    }
  }
  return src;
}

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
  type Task = {
    id: string;
    text: string;
    done: boolean;
    due: string;
    isFadingOut?: boolean;
    isFadingIn?: boolean;
  };
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [error, setError] = useState('');
  const nextIdRef = useRef(1);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('todoTasks');
    if (saved) {
      const parsed: Task[] = JSON.parse(saved);
      setTasks(parsed);
      const maxId = parsed.reduce((max, t) => Math.max(max, parseInt(t.id)), 0);
      nextIdRef.current = maxId + 1;
    } else {
      setTasks([{ id: '0', text: 'Finish homework', done: false, due: '2025-07-22' }]);
      nextIdRef.current = 1;
    }
  }, []);

  // Save tasks to localStorage on change
  useEffect(() => {
    localStorage.setItem('todoTasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim() === '') {
      setError('Task name is required.');
      return;
    }
    const id = String(nextIdRef.current++);
    const newEntry = { id, text: newTask, done: false, due: dueDate, isFadingIn: true };
    setTasks((old) => [...old, newEntry]);
    setNewTask('');
    setDueDate('');
    setError('');
  };

  const toggleDone = (id: string) => {
    setTasks((old) =>
      old.map((t) =>
        t.id === id
          ? { ...t, done: !t.done, isFadingIn: true }
          : t
      )
    );
  };

  const removeTask = (id: string) => {
    setTasks((old) =>
      old.map((t) =>
        t.id === id ? { ...t, isFadingOut: true } : t
      )
    );
  };

  const handleAnimationEnd = (task: Task) => {
    if (task.isFadingOut) {
      setTasks((old) => old.filter((t) => t.id !== task.id));
    }
    if (task.isFadingIn) {
      setTasks((old) =>
        old.map((t) => (t.id === task.id ? { ...t, isFadingIn: false } : t))
      );
    }
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
            className={`${task.isFadingIn ? 'fade-in' : ''} ${task.isFadingOut ? 'fade-out' : ''}`}
            onAnimationEnd={() => handleAnimationEnd(task)}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              marginBottom: '0.5rem',
              opacity: task.isFadingOut ? 0 : 1,
              padding: '0.5rem',
              borderRadius: '0.375rem',
              backgroundColor: '#f3f4f6',
              transition: 'opacity 0.5s ease',
            }}
          >
            <label style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
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
        <img
          src={withRepoPrefix('/images/Todo.webp')}
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

      <FadeStyles />
    </div>
  );
}

// --------- Reminders ---------
function Reminders() {
  type Reminder = {
    id: string;
    text: string;
    time: string;
    isFadingOut?: boolean;
    isFadingIn?: boolean;
  };

  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [text, setText] = useState('');
  const [time, setTime] = useState('');
  const [error, setError] = useState('');
  const nextIdRef = useRef(1);

  // Load reminders from localStorage and schedule notifications
  useEffect(() => {
    const saved = localStorage.getItem('reminders');
    if (saved) {
      const savedReminders: Reminder[] = JSON.parse(saved);
      setReminders(savedReminders);
      const maxId = savedReminders.reduce((max, r) => Math.max(max, parseInt(r.id)), 0);
      nextIdRef.current = maxId + 1;
    } else {
      setReminders([{ id: '0', text: 'Dentist appointment', time: '2025-07-21T10:00' }]);
      nextIdRef.current = 1;
    }
  }, []);

  // Save reminders and schedule notifications on change
  useEffect(() => {
    localStorage.setItem('reminders', JSON.stringify(reminders));
    scheduleNotifications(reminders);
  }, [reminders]);

  // Schedule notifications function
  function scheduleNotifications(reminders: Reminder[]) {
    if (!('Notification' in window)) return;
    if (Notification.permission !== 'granted') return;

    const now = Date.now();

    reminders.forEach((r) => {
      const reminderTime = new Date(r.time).getTime();
      const notifyTime = reminderTime - 60 * 60 * 1000; // 1 hour before
      const delay = notifyTime - now;

      if (delay > 0) {
        setTimeout(() => {
          new Notification('Reminder', {
            body: `${r.text} at ${new Date(r.time).toLocaleString()}`,
          });
        }, delay);
      }
    });
  }

  const addReminder = () => {
    if (text.trim() === '' || !time) {
      setError('Reminder and time are required.');
      return;
    }
    const id = String(nextIdRef.current++);
    setReminders((old) => [...old, { id, text, time, isFadingIn: true }]);
    setText('');
    setTime('');
    setError('');
  };

  const removeReminder = (id: string) => {
    setReminders((old) =>
      old.map((r) =>
        r.id === id ? { ...r, isFadingOut: true } : r
      )
    );
  };

  const handleAnimationEnd = (reminder: Reminder) => {
    if (reminder.isFadingOut) {
      setReminders((old) => old.filter((r) => r.id !== reminder.id));
    }
    if (reminder.isFadingIn) {
      setReminders((old) =>
        old.map((r) => (r.id === reminder.id ? { ...r, isFadingIn: false } : r))
      );
    }
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
      <ul style={{ fontSize: 'clamp(0.9rem, 1vw, 1.1rem)', marginBottom: '1rem', listStyle: 'none', padding: 0 }}>
        {reminders.map((r) => (
          <li
            key={r.id}
            className={`${r.isFadingIn ? 'fade-in' : ''} ${r.isFadingOut ? 'fade-out' : ''}`}
            onAnimationEnd={() => handleAnimationEnd(r)}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '0.5rem',
              padding: '0.5rem',
              borderRadius: '0.375rem',
              backgroundColor: '#f3f4f6',
              opacity: r.isFadingOut ? 0 : 1,
              transition: 'opacity 0.5s ease',
            }}
          >
            <div>
              <p>{r.text}</p>
              <p style={{ fontSize: '0.85rem', color: '#4b5563' }}>
                🕒 {new Date(r.time).toLocaleString()}
              </p>
            </div>
            <button
              onClick={() => removeReminder(r.id)}
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
        <img
          src={withRepoPrefix('/images/Reminder.jpg')}
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

      <FadeStyles />
    </div>
  );
}

// --------- GoalTracker ---------
function GoalTracker() {
  type Goal = {
    id: string;
    text: string;
    completed: boolean;
    isFadingOut?: boolean;
    isFadingIn?: boolean;
  };

  const [goals, setGoals] = useState<Goal[]>([]);
  const [goalInput, setGoalInput] = useState('');
  const [error, setError] = useState('');
  const nextIdRef = useRef(1);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('goals');
    if (saved) {
      const savedGoals: Goal[] = JSON.parse(saved);
      setGoals(savedGoals);
      const maxId = savedGoals.reduce((max, g) => Math.max(max, parseInt(g.id)), 0);
      nextIdRef.current = maxId + 1;
    } else {
      setGoals([{ id: '0', text: 'Learn React', completed: false }]);
      nextIdRef.current = 1;
    }
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem('goals', JSON.stringify(goals));
  }, [goals]);

  const addGoal = () => {
    if (goalInput.trim() === '') {
      setError('Goal description is required.');
      return;
    }
    const id = String(nextIdRef.current++);
    setGoals((old) => [...old, { id, text: goalInput, completed: false, isFadingIn: true }]);
    setGoalInput('');
    setError('');
  };

  const toggleCompleted = (id: string) => {
    setGoals((old) =>
      old.map((g) =>
        g.id === id ? { ...g, completed: !g.completed, isFadingIn: true } : g
      )
    );
  };

  const removeGoal = (id: string) => {
    setGoals((old) =>
      old.map((g) =>
        g.id === id ? { ...g, isFadingOut: true } : g
      )
    );
  };

  const handleAnimationEnd = (goal: Goal) => {
    if (goal.isFadingOut) {
      setGoals((old) => old.filter((g) => g.id !== goal.id));
    }
    if (goal.isFadingIn) {
      setGoals((old) =>
        old.map((g) => (g.id === goal.id ? { ...g, isFadingIn: false } : g))
      );
    }
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
        {goals.map((g) => (
          <li
            key={g.id}
            className={`${g.isFadingIn ? 'fade-in' : ''} ${g.isFadingOut ? 'fade-out' : ''}`}
            onAnimationEnd={() => handleAnimationEnd(g)}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '0.5rem',
              padding: '0.5rem',
              borderRadius: '0.375rem',
              backgroundColor: '#f3f4f6',
              opacity: g.isFadingOut ? 0 : 1,
              transition: 'opacity 0.5s ease',
            }}
          >
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <input
                type="checkbox"
                checked={g.completed}
                onChange={() => toggleCompleted(g.id)}
              />
              <span style={{ textDecoration: g.completed ? 'line-through' : 'none' }}>
                {g.text}
              </span>
            </label>
            <button
              onClick={() => removeGoal(g.id)}
              style={{ color: '#dc2626', fontSize: '1.25rem', border: 'none', background: 'none', cursor: 'pointer' }}
              aria-label={`Remove goal ${g.text}`}
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
          value={goalInput}
          onChange={(e) => setGoalInput(e.target.value)}
          placeholder="New goal"
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
        <img
          src={withRepoPrefix('/images/Goals.webp')}
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

      <FadeStyles />
    </div>
  );
}

// --------- Fade animation styles ---------
function FadeStyles() {
  return (
    <style>{`
      @keyframes fadeIn {
        from {opacity: 0;}
        to {opacity: 1;}
      }
      @keyframes fadeOut {
        from {opacity: 1;}
        to {opacity: 0;}
      }
      .fade-in {
        animation: fadeIn 0.5s forwards;
      }
      .fade-out {
        animation: fadeOut 0.5s forwards;
      }
    `}</style>
  );
}
