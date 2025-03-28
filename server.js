import express from "express"
const app = express();
app.use(express.json());

const PORT = 3000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

let users = [
    { id: 1, userName: "Alice", email: "alice@example.com" },
    { id: 2, userName: "Bob", email: "bob@example.com" }
];

app.get('/users', (req, res) => {
    res.json(users);
});

app.post('/users', (req, res) => {
    const newUser = {
        id: users.length + 1,
        userName: req.body.userName,
        email: req.body.email
    };
    users.push(newUser);
    res.status(201).json({ message: "User Added Successfully", user: newUser });
});

app.put('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id)
    const user = users.find(u => u.id === userId);
    if (!user) return res.status(404).send({ message: 'User not found' });
    user.userName = req.body.userName || user.userName;
    user.email = req.body.email || user.email;
    res.json({ message: "User updated successfully", user });
});