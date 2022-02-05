module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '3bd0afa6fa176ed282920679166c8d6f'),
  },
});
