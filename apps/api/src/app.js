"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
require('reflect-metadata');
require('express-async-errors');
const express = require('express');
const cors = require('cors');
const { router } = require('./routes');
const { AppError } = require('./errors/AppError');

const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(router);
app.use((err, request, response, _next) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({ message: err.message });
  }
  return response.status(500).json({
    status: 'Error',
    message: `Internal server error ${err.message}`,
  });
});

module.exports = { app };
