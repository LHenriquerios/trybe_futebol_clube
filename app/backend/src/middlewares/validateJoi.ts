import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Schema } from 'joi';

const validateJoi = (schemas:Schema) => (req: Request, _res: Response, next: NextFunction) => {
  const { error } = schemas.validate(req.body);

  if (error) {
    switch (error.details[0].type) {
      case 'string.empty':
        next({ status: StatusCodes.BAD_REQUEST, message: error.details[0].message });
        break;
      default:
        next({ status: StatusCodes.UNPROCESSABLE_ENTITY, message: error.details[0].message });
    }
  }

  next();
};

export default validateJoi;
