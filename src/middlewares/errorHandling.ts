import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";
import Unauthorized from "../errors/Unauthorized";
import InvalidData from "../errors/InvalidDataError";
import NotFound from "../errors/NotFound";
import Forbidden from "../errors/Forbidden";


export default function errorHandling(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  if (err instanceof InvalidData) {
    return res.status(httpStatus.BAD_REQUEST).send({
      message: err.message,
    });
  }

  if (err instanceof Unauthorized) {
    return res.status(httpStatus.UNAUTHORIZED).send({
      message: err.message,
    });
  }

  if (err instanceof NotFound) {
    return res.status(httpStatus.NOT_FOUND).send({
      message: err.message,
    });
  }

  if (err instanceof Forbidden) {
    return res.status(httpStatus.NOT_FOUND).send({
      message: err.message,
    });
  }

  console.error(err);
  res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
    message: "Internal server error!",
  });
}