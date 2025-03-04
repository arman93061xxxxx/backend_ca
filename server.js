const express = require('express');
const cors = require('cors');
const users = require('./users');

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Server is running...');
});

// PUT endpoint to update password
app.put('/update', (req, res) => {
    const { email, password } = req.body;
    const user = users.find(user => user.email === email);

    if (!user) {
        return res.status(404).json({ message: 'Email not found' });
    }

    if (user.password === password) {
        return res.status(400).json({ message: 'Password already in use' });
    }

    user.password = password;
    res.json({ message: 'Password updated successfully' });
});

// DELETE endpoint to remove a user
app.delete('/delete', (req, res) => {
    const { email } = req.body;
    const index = users.findIndex(user => user.email === email);

    if (index === -1) {
        return res.status(404).json({ message: 'Email not found' });
    }

    users.splice(index, 1);
    res.json({ message: 'User deleted successfully' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
