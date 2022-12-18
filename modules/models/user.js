/* eslint-disable prefer-destructuring */
const { Schema } = require('mongoose');
const { connectedDbs } = require('../../utils/database');

/** @type import('mongoose'); */
const househunt = connectedDbs.househunt;

const schema = new Schema({
  name: {
    type: String,
    required: true,
  },

  avatar: {
    type: String,
  },
  address: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  type: {
    type: String,
    enum: ['admin', 'user'],
  },
});

/** @type {import('mongoose').Model<any, any>} */
module.exports = househunt.model('User', schema);
