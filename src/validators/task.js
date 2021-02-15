const { isNil } = require('lodash');

const nameTaskValidation = (name) => {
  if (isNil(name) || name === '') {
    return 'Le nom de la tâche doit être renseigné';
  }
  if (typeof name !== 'string') {
    return 'Le nom de la tâche doit être une chaîne de caractères';
  }
  if (name.length < 1 || name.length > 50) {
    return 'Le nom de la tâche doit contenir entre 1 et 50 caractères';
  }
  return null;
};

const descriptionValidation = (description) => {
  if (isNil(description) || description === '') {
    return 'Le champ description de la tâche doit être renseigné';
  }
  if (typeof description !== 'string') {
    return 'Le champ description de la tâche doit être une chaîne de caractères';
  }
  return null;
};

module.exports = (data) => {
  const { name, description } = data;
  const errors = [];

  const nameError = nameTaskValidation(name);
  if (nameError) errors.push({ field: 'name', message: nameError });

  const descriptionError = descriptionValidation(description);
  if (descriptionError)
    errors.push({ field: 'name', message: descriptionError });

  return errors.length > 0 ? errors : null;
};
