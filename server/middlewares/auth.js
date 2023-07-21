import jwt from 'jsonwebtoken';
import { HttpStatusCode } from 'axios';

const authMiddleware = (req, res, next) => {
  const token = req.headers['x-access-token'];

  if (!token) {
    return res.status(HttpStatusCode.Forbidden).send({
      success: false,
      message: 'not logged in',
    });
  }

  const p = new Promise((resolve, reject) => {
    jwt.verify(token, req.app.get('jwt-secret'), (err, decoded) => {
      if (err) reject(err);
      resolve(decoded);
    });
  });

  // if it has failed to verify, it will return an error message
  const onError = (error) => {
    res.status(HttpStatusCode.Forbidden).send({
      success: false,
      message: error.message,
    });
  };

  // process the promise
  p.then((decoded) => {
    req.decoded = decoded;
    next();
  }).catch(onError);
};

export default authMiddleware;
