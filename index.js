const express=require('express');
const users=require("./MOCK_DATA.json");
const app=express();
const PORT=8000;
const fs=require('fs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Middleware to log requests
app.use((req, res, next) => {
    fs.appendFile('log.txt', `\n${Date.now()}:${req.method}:${req.path}`, (err) => {
        if (err) console.error("Error writing to log file:", err);
    });
    next();
});

// Routes
app.get('/api/users', (req, res) => {
    return res.json(users);
});

app.get('/users', (req, res) => {
    const html =
     `  <ul>
            ${users.map(user=> `<li>${user.first_name}</li>`).join('')}
        </ul>
    `;
    res.send(html);
});

app.route("/api/users/:id")
.get((req, res)=> {
    const id=Number(req.params.id);
    const user=users.find(user=> user.id=== id);
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    return res.json(user);
});

// Search users by first name
app.get('/api/users/search', (req, res) => {
    const { name } = req.query;
    if (!name) {
        return res.status(400).json({ error:"Please provide a name to search!" });
    }

    const filteredUsers = users.filter(user => user.first_name.toLowerCase().includes(name.toLowerCase()));
    if (filteredUsers.length===0){
        return res.json({message: `No users found with the name "${name}". Try another name!` });
    }
    return res.json({message: `Found ${filteredUsers.length} users matching "${name}".`, users: filteredUsers });
});

// Sort users by first name
app.get('/api/users/sort',(req, res)=>{
    const sortedUsers = [...users].sort((a, b) => a.first_name.localeCompare(b.first_name));
    return res.json({message: "Users sorted alphabetically by first name.", users: sortedUsers });
});

// Get a random user
app.get('/api/users/random',(req, res)=>{
    const randomUser=users[Math.floor(Math.random() * users.length)];
    return res.json({ message: "Here's a random user for you!", user: randomUser });
});

// Get total number of users
app.get('/api/users/count',(req, res)=>{
    return res.json({message: `We have a total of ${users.length} users in our database!`, totalUsers: users.length });
});

// Add a new user
app.post("/api/users",(req, res)=>{
    const body = req.body;
    if (!body.first_name||!body.last_name){
        return res.status(400).json({error: "Please provide both first and last name!" });
    }
    const newUser={ ...body, id: users.length + 1};
    users.push(newUser);
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err)=>{
        if (err){
            return res.status(500).json({ error: "Oops! Something went wrong while saving the user." });
        }
        return res.json({message: `Welcome, ${body.first_name}! Your profile has been added successfully.`, user: newUser });
    });
});

app.listen(PORT, () => console.log(`🚀 Server is up and running at http://localhost:${PORT}`));
