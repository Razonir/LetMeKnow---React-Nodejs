import mongoose from 'mongoose';
import config from '../config.js';

function connect() {
  // Connecting to the database
  return mongoose
    .connect(config.db.uri, {
      maxPoolSize: config.db.poolSize,
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
};

function getFirstErrMessage(err) {
  if (err && err.errors) {
    for (const [key, value] of Object.entries(err.errors)) {
        return `Invalid field ${key} (${value.message})`;
    }
  } else {
    return err;
  }
}

export {connect, getFirstErrMessage};