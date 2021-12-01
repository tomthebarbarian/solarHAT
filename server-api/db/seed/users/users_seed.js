const { ObjectId } = require("bson");

//users collection
module.exports = [
  {
    id: ObjectId('61a6e8c00682f300f11b8a55'),
    name: "hamza",
    email: "hamza@hamza.com",
    hash: "$2a$10$sRVqZJfZlBDGKag3sSyLXeBfrhaldUd9.ZXuNdzFebtO6Rohm2AR.",
  },
  {
    id: ObjectId('61a6e8c00682f300f110beef'),
    name: "Lighthouse Labs",
    email: "lhl@lhl.com",
    hash: "$2a$10$sRVqZJfZlBDGKag3sSyLXeBfrhaldUd9.ZXuNdzFebtO6Rohm2AR.",

  },
  {
    id: ObjectId('61a6e8c00682f300f110eead'),
    name: "tom",
    email: "tom@tom.com",
    hash: "$2a$10$sRVqZJfZlBDGKag3sSyLXeBfrhaldUd9.ZXuNdzFebtO6Rohm2AR.",
  },
  {
    id: ObjectId('61a6e8c00682f300f11b8ea7'),
    name: "aj",
    email: "aj@smartnvm.com",
    hash: "$2a$10$sRVqZJfZlBDGKag3sSyLXeBfrhaldUd9.ZXuNdzFebtO6Rohm2AR.",
  },
];
