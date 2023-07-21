import { HttpStatusCode } from 'axios';

export const check = (req, res) => {
  res.status(HttpStatusCode.Ok).send({
    success: true,
    message: 'checked successfully',
    decoded: req.decoded,
  });
};
