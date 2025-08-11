// pages/api/goals.js

let goals = [];
let idCounter = 1;

export default function handler(req, res) {
     // ✅ Allow CORS
 res.setHeader('Access-Control-Allow-Origin', process.env.NODE_ENV === 'production'
  ? 'http://18.143.76.221/'
  : 'http://localhost:3001');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // ✅ Handle preflight request (for DELETE, PUT, etc.)
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { method } = req;

  if (method === 'GET') {
    res.status(200).json(goals);
  } else if (method === 'POST') {
    const { name, year } = req.body;
    if (!name || !year) {
      return res.status(400).json({ error: 'Name and year are required' });
    }
    const newGoal = { id: idCounter++, name, year, completed: false };
    goals.push(newGoal);
    res.status(201).json(newGoal);
  } else if (method === 'PUT') {
    const { id } = req.body;
    const goal = goals.find((g) => g.id === id);
    if (!goal) return res.status(404).json({ error: 'Goal not found' });
    goal.completed = true;
    res.status(200).json(goal);
  } else if (method === 'DELETE') {
    const { id } = req.body;
    goals = goals.filter((g) => g.id !== id);
    res.status(204).end();
  } else {
    res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
