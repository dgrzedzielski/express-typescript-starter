require('dotenv');

const DEFAULTS = {
  PORT: '3000',
};

const port = parseInt(process.env.PORT || DEFAULTS.PORT);

export const defaultConfig = {
  port,
};
