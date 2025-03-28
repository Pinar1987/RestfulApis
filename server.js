import express from "express"

import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const app = express();
app.use(express.json());

const PORT = 3000;

const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Users Api",
            version: "1.0.0",
            description: "A simple Expresss Users Api"
        },
    },
    apis: ["./server.js"]
};

const swaggerDocs = swaggerJSDoc(swaggerOptions)
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs))

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

let users = [
    { id: 1, userName: "Pinar", email: "pinar@pinar.com" },
    { id: 2, userName: "Burak", email: "burak@burak.com" }
];

/**
 * @swagger
 * /users:
 *   get:
 *     tags: [Users]
 *     summary: Retrieve all users
 *     description: Get a list of all users
 *     responses:
 *       200:
 *         description: List of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   userName:
 *                     type: string
 *                   email:
 *                     type: string
 */

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

app.delete('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id)
    users = users.filter(u => u.id !== userId);
    res.json({ message: "User Deleted successfully" });
});
