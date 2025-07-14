const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const app = express();
const port = process.env.PORT || 5000 ;

connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/claim', require('./routes/claimRoutes'));

app.listen(port, () => console.log('Server started on port 5000'));
