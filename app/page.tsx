// page.tsx
'use client';

import { useState } from 'react';

export default function Home() {
  // To Do state
  const [toDos, setToDos] = useState<{ task: string; due: string; done: boolean }[]>([]);
  const [newToDo, setNewToDo] = useState('');
  const [toDoDue, setToDoDue] = useState('');
  
  // Reminder state
  const [reminders, setReminders] = useState<{ event: string; time: string }[]>([]);
  const [newReminder, setNewReminder] = useState('');
  const [reminderTime, setReminderTime] = useState('');
  
  // Goal state
  const [goals, setGoals] = useState<{ goal: string; due: string; progress: number }[]>([]);
  const [newGoal, setNewGoal] = useState('');
  const [goalDue, setGoalDue] = useState('');
  
  const [error, setError] = useState('');

  // Submission handler
  const handleSubmit = () => {
    if (!newToDo || !toDoDue || !newReminder || !reminderTime || !newGoal || !goalDue) {
      setError('Please fill out all fields before submitting.');
      return;
    }
    setError('');

    setToDos([...toDos, { task: newToDo, due: toDoDue, done: false }]);
    setReminders([...reminders, { event: newReminder, time: reminderTime }]);
    setGoals([...goals, { goal: newGoal, due: goalDue, progress: 0 }]);

    setNewToDo('');
    setToDoDue('');
    setNewReminder('');
    setReminderTime('');
    setNewGoal('');
    setGoalDue('');
  };

  return (
    <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
      {/* To Do List */}
      <div className="bg-gray-800 p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-2">To Do List</h2>
        <input
          type="text"
          placeholder="New Task"
          className="w-full mb-2 p-2 bg-gray-700 rounded"
          value={newToDo}
          onChange={(e) => setNewToDo(e.target.value)}
        />
        <input
          type="date"
          className="w-full mb-2 p-2 bg-gray-700 rounded"
          value={toDoDue}
          onChange={(e) => setToDoDue(e.target.value)}
        />
        <ul className="space-y-2">
          {toDos.map((todo, index) => (
            <li key={index} className="flex justify-between items-center">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={todo.done}
                  onChange={() => {
                    const updated = [...toDos];
                    updated[index].done = !updated[index].done;
                    setToDos(updated);
                  }}
                />
                <span className={todo.done ? 'line-through text-gray-400' : ''}>
                  {todo.task} (Due: {todo.due})
                </span>
              </label>
              <button onClick={() => setToDos(toDos.filter((_, i) => i !== index))}>❌</button>
            </li>
          ))}
        </ul>
      </div>

      {/* Reminders */}
      <div className="bg-gray-800 p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-2">Reminders</h2>
        <input
          type="text"
          placeholder="New Reminder"
          className="w-full mb-2 p-2 bg-gray-700 rounded"
          value={newReminder}
          onChange={(e) => setNewReminder(e.target.value)}
        />
        <input
          type="datetime-local"
          className="w-full mb-2 p-2 bg-gray-700 rounded"
          value={reminderTime}
          onChange={(e) => setReminderTime(e.target.value)}
        />
        <ul className="space-y-2">
          {reminders.map((reminder, index) => (
            <li key={index} className="flex justify-between items-center">
              <span>{reminder.event} @ {reminder.time}</span>
              <button onClick={() => setReminders(reminders.filter((_, i) => i !== index))}>❌</button>
            </li>
          ))}
        </ul>
      </div>

      {/* Goal Tracker */}
      <div className="bg-gray-800 p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-2">Goals</h2>
        <input
          type="text"
          placeholder="New Goal"
          className="w-full mb-2 p-2 bg-gray-700 rounded"
          value={newGoal}
          onChange={(e) => setNewGoal(e.target.value)}
        />
        <input
          type="date"
          className="w-full mb-2 p-2 bg-gray-700 rounded"
          value={goalDue}
          onChange={(e) => setGoalDue(e.target.value)}
        />
        <ul className="space-y-2">
          {goals.map((goal, index) => (
            <li key={index}>
              <div className="flex justify-between items-center mb-1">
                <span>{goal.goal} (Due: {goal.due})</span>
                <button onClick={() => setGoals(goals.filter((_, i) => i !== index))}>❌</button>
              </div>
              <div className="w-full bg-gray-600 h-2 rounded">
                <div
                  className="bg-green-500 h-2 rounded"
                  style={{ width: `${goal.progress}%` }}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Error Message and Submit Button */}
      <div className="col-span-full mt-4">
        {error && <p className="text-red-400 mb-2">{error}</p>}
        <button
          onClick={handleSubmit}
          className="bg-blue-500 hover:bg-blue-600 transition-colors px-4 py-2 rounded"
        >
          Submit All
        </button>
      </div>
    </div>
  );
}
