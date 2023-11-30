import { jwtConstants } from './constants';

export default () => ({
  port: parseInt(process.env.PORT) || 3000,
  jwtSecret: jwtConstants.secret,
});
