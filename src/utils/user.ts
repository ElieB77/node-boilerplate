export const userProjection = () => {
  return {
    id: true,
    createdAt: true,
    email: true,
    role: true,
    firstName: true,
    lastName: true,
  };
};
