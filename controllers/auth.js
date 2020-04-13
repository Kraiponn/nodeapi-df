const asyncHandler = require('express-async-handler');
const ErrorResponse = require('../utils/errorResponse');
const User = require('../models/User');

// @desc      Register new user
// @route     POST /api/auth/register
// @access    Public
exports.register = asyncHandler(async (req, res, next) => {
  console.log(req.body);
  const user = await User.create(req.body);

  // if(!user) {
  //   return next(
  //     new ErrorResponse(`Something went wrong. Please try again.`, 400)
  //   );
  // }

  res.status(201).json({
    success: true,
    data: user
  });
});

// @desc      Get all user
// @route     GET /api/auth
// @access    Public
exports.getUsers = asyncHandler(async (req, res, next) => {
  let query;

  const reqQuery = { ...req.query };

  const removeField = ['select', 'limit', 'sort', 'page'];

  removeField.forEach(param => delete reqQuery[param]);

  let queryStr = JSON.stringify(reqQuery);

  queryStr = queryStr.replace(/\b(lt|lte|gt|gte|in)\b/g, match => `$${match}`);
  
  // Finding query
  query = User.find(JSON.parse(queryStr));

  // Select 
  if(req.query.select){
    const fields = req.query.select.split(',').join(' ');
    query = query.select(fields);
  }

  // Sort 
  if(req.query.sort){
    const sortBy = req.query.sort.split(',').join(' ');
    query = query.sort(sortBy);
  } else {
    query = query.sort('-createdAt');
  }

  // Pagination
  let pageination = {};

  let page = parseInt(req.query.page, 10) || 1;
  let limit = parseInt(req.query.limit, 10) || 25;
  let startIndex = (page - 1) * limit;
  let endIndex = page * limit;
  let total = await User.countDocuments();

  query = query.skip(startIndex).limit(limit);

  // Excute results
  const results = await query;
  console.log(results);

  if(endIndex < total) {
    pageination.next = {
      page: page + 1,
      limit
    };
  }

  if(startIndex > 0) {
    pageination.prev = {
      page: page - 1,
      limit
    };
  }

  res.status(201).json({
    success: true,
    count: results.length,
    data: results,
    pageination
  });
});