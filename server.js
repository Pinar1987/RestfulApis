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


/**
 * @swagger
 * /users:
 *   post:
 *     tags: [Users]
 *     summary: Create a new user
 *     description: Add a new user to the system
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userName
 *               - email
 *             properties:
 *               userName:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       201:
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


app.post('/users', (req, res) => {
    const newUser = {
        id: users.length + 1,
        userName: req.body.userName,
        email: req.body.email
    };
    users.push(newUser);
    res.status(201).json({ message: "User Added Successfully", user: newUser });
});


/**
 * @swagger
 * /users/{id}:
 *   put:
 *     tags: [Users]
 *     summary: Update a user by ID
 *     description: Update an existing user's details
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the user to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userName:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     userName:
 *                       type: string
 *                     email:
 *                       type: string
 *       404:
 *         description: User not found
 */

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
