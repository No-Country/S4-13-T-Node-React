import 'reflect-metadata';
import app from './app';
import { AppDataSource } from './Config/db';

// ENV
import { ENV } from './Config/config';

const main = async () => {
  try {
    await AppDataSource.initialize();
    console.log('Database connected');
    app.listen(ENV.PORT, () => {
      console.log('Server listening on port ' + ENV.PORT);
    });
  } catch (err) {
    console.error(err);
  }
};

main();
