import express from 'express';
import morgan from 'morgan';

// cors
import cors from 'cors';

const app = express();

// Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));

// Routes
import routes from './Routes';

app.use([routes.user, routes.post]);

app.get('/', (req, res) => {
  res.json({ message: 'Running server successfully' });
});

export default app;
