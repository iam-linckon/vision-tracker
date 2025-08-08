import React, { useEffect, useState } from 'react';

const API_BASE = process.env.REACT_APP_API_BASE;

function App() {
  const [goals, setGoals] = useState([]);
  const [name, setName] = useState('');
  const [year, setYear] = useState('');

  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = async () => {
    const res = await fetch(API_BASE);
    const data = await res.json();
    setGoals(data);
  };

  const addGoal = async () => {
    if (!name || !year) return;
    await fetch(API_BASE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, year }),
    });
    setName('');
    setYear('');
    fetchGoals();
  };

  const completeGoal = async (id) => {
    await fetch(API_BASE, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    fetchGoals();
  };

  const deleteGoal = async (id) => {
    await fetch(API_BASE, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    fetchGoals();
  };

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: 20 }}>
      <h1>🎯 Goal Tracker</h1>
      <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Goal name"
        />
        <input
          type="number"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          placeholder="Year"
        />
        <button onClick={addGoal}>Add</button>
      </div>
      <ul>
        {goals.map((goal) => (
          <li key={goal.id} style={{ marginBottom: 10 }}>
            <span
              style={{
                textDecoration: goal.completed ? 'line-through' : 'none',
                marginRight: 10,
              }}
            >
              {goal.name} ({goal.year})
            </span>
            {!goal.completed && (
              <button onClick={() => completeGoal(goal.id)}>✅</button>
            )}
            <button onClick={() => deleteGoal(goal.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;