require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const authRoutes = require('./routes/authRoutes');
const dataRoutes = require('./routes/dataRoutes');
const errorHandler = require('./middleware/errorMiddleware');

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/auth', authRoutes);
app.use('/api/data', dataRoutes);

app.use(errorHandler);

mongoose.connect(process.env.MONGO_URI, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true, 
  maxPoolSize: 10 
})
  .then(() => app.listen(process.env.PORT, () => console.log(`Servidor rodando na porta ${process.env.PORT}`)))
  .catch(err => console.log(err));
