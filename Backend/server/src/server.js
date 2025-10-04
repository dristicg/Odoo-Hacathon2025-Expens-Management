import app from './app.js';
import { connectDB } from './db/mongoose.js';
import { config } from './config/env.js';
import { scheduleRateRefresh } from './services/currency.js';

const PORT = config.port;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
    scheduleRateRefresh();
  })
  .catch((err) => {
    console.error('Failed to start server:', err);
    process.exit(1);
  });
