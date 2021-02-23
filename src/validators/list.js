const { isNil } = require('lodash');

const nameListValidation = (name) => {
  if (isNil(name) || name === '') {
    return 'Le nom de la liste doit être renseigné';
  }
  if (typeof name !== 'string') {
    return 'Le nom de la liste doit être une chaîne de caractères';
  }
  if (name.length < 1 || name.length > 50) {
    return 'Le nom de la liste doit contenir entre 1 et 50 caractères';
  }
  return null;
};

module.exports = (data) => {
  const { name } = data;
  const errors = [];

  const nameError = nameListValidation(name);
  if (nameError) errors.push({ field: 'name', message: nameError });

  return errors.length > 0 ? errors : null;
};
