import * as dotenv from 'dotenv';
import app from './app';
import sequelize from './config/db.config';

dotenv.config();

const PORT = process.env.PORT || 4000;

sequelize.sync().then(() => {
  console.log('Database synchronized');
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch((err) => {
  console.error('Unable to connect to the database:', err);
});
