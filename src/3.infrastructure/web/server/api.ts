import createError from "http-errors";
import express, { ErrorRequestHandler } from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";

import restaurantsRouter from "./restaurantsRouter";

const api = express();

api.use(logger("dev"));
api.use(express.json());
api.use(express.urlencoded({ extended: false }));
api.use(cookieParser());

api.use("/restaurants", restaurantsRouter);

// catch 404 and forward to error handler
api.use(function (_, __, next) {
  next(createError(404));
});

const errorHandler: ErrorRequestHandler = (err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
};

api.use(errorHandler);

export default api;
