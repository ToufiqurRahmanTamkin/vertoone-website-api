const toUserResponse = (user) => ({
  id: user._id,
  email: user.email,
  role: user.role,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt
});

module.exports = {
  toUserResponse
};
