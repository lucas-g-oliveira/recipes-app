export const saveEmail = (user) => localStorage
  .setItem('user', JSON.stringify({ email: user }));

export const getEmail = () => JSON
  .parse(localStorage.getItem('user')) ?? 'Não á usuário logado';

export const clearEmail = () => localStorage.clear('user');

/* IMPORTS */
export default { saveEmail, getEmail, clearEmail };
