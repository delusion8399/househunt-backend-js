/* eslint-disable prefer-destructuring */
const { Schema, Types } = require('mongoose');
const { connectedDbs } = require('../../utils/database');

/** @type import('mongoose'); */
const househunt = connectedDbs.househunt;

const schema = new Schema(
  {
    loginType: {
      type: String,
      enum: ['Credentials'],
    },
    ipAddress: {
      type: String,
    },
    userAgent: {
      type: String,
    },
    user: {
      type: Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true },
);

/** @type {import('mongoose').Model<any, any>} */
module.exports = househunt.model('Session', schema);
