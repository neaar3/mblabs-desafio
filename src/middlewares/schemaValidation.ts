import { NextFunction, Request, Response } from 'express';
import InvalidDataError from '../errors/InvalidDataError';
import { ObjectSchema } from 'joi';

export function validateBody<T>(schema: ObjectSchema<T>): ValidationMiddleware {
  return validate(schema, 'body');
}

export function validateParams<T>(schema: ObjectSchema<T>): ValidationMiddleware {
  return validate(schema, 'params');
}

function validate(schema: ObjectSchema, type: 'body' | 'params') {
  return (req: Request, _res: Response, next: NextFunction) => {
    const { error } = schema.validate(req[type], {
      abortEarly: false,
    });

    if (!error) {
      next();
    } else {
      throw new InvalidDataError(error.details.map(detail => detail.message).join(', '));
    }
  };
}

type ValidationMiddleware = (req: Request, res: Response, next: NextFunction) => void;