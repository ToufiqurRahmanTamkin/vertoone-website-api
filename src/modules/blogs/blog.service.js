const createAppError = require('../../shared/utils/app-error');

const createBlogService = ({ blogRepository }) => {
  const createBlog = async (payload) => blogRepository.create(payload);

  const listBlogs = async (pagination) => {
    const [blogs, total] = await Promise.all([
      blogRepository.findAll(pagination),
      blogRepository.count()
    ]);

    return {
      blogs,
      meta: {
        total,
        page: pagination.page,
        limit: pagination.limit
      }
    };
  };

  const getBlog = async (id) => {
    const blog = await blogRepository.findById(id);

    if (!blog) {
      throw createAppError('Blog not found', 404);
    }

    return blog;
  };

  const updateBlog = async (id, payload) => {
    const blog = await blogRepository.update(id, payload);

    if (!blog) {
      throw createAppError('Blog not found', 404);
    }

    return blog;
  };

  const deleteBlog = async (id) => {
    const blog = await blogRepository.delete(id);

    if (!blog) {
      throw createAppError('Blog not found', 404);
    }

    return blog;
  };

  return {
    createBlog,
    listBlogs,
    getBlog,
    updateBlog,
    deleteBlog
  };
};

module.exports = createBlogService;
