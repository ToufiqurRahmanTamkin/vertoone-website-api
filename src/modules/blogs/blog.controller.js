const createBlogRepository = require('./blog.repository');
const createBlogService = require('./blog.service');
const asyncHandler = require('../../shared/utils/async-handler');
const { sendResponse } = require('../../shared/utils/response');
const { getPagination } = require('../../shared/utils/pagination');

const blogRepository = createBlogRepository();
const blogService = createBlogService({ blogRepository });

const createBlog = asyncHandler(async (req, res) => {
  const blog = await blogService.createBlog(req.body);
  return sendResponse(res, {
    statusCode: 201,
    message: 'Blog created successfully',
    data: blog
  });
});

const listBlogs = asyncHandler(async (req, res) => {
  const pagination = getPagination(req.query);
  const { blogs, meta } = await blogService.listBlogs(pagination);
  return sendResponse(res, {
    statusCode: 200,
    message: 'Blogs fetched successfully',
    data: blogs,
    meta
  });
});

const getBlog = asyncHandler(async (req, res) => {
  const blog = await blogService.getBlog(req.params.id);
  return sendResponse(res, {
    statusCode: 200,
    message: 'Blog fetched successfully',
    data: blog
  });
});

const updateBlog = asyncHandler(async (req, res) => {
  const blog = await blogService.updateBlog(req.params.id, req.body);
  return sendResponse(res, {
    statusCode: 200,
    message: 'Blog updated successfully',
    data: blog
  });
});

const deleteBlog = asyncHandler(async (req, res) => {
  const blog = await blogService.deleteBlog(req.params.id);
  return sendResponse(res, {
    statusCode: 200,
    message: 'Blog deleted successfully',
    data: blog
  });
});

module.exports = {
  createBlog,
  listBlogs,
  getBlog,
  updateBlog,
  deleteBlog
};
