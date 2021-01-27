const jwt = require('jsonwebtoken');

const {
  UnauthorizedError,
  ForbiddenError,
} = require('../helpers/errors');

module.exports = async (request, response, next) => {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new UnauthorizedError(
      'Utilisateur non authentifié',
      'Vous devez fournir un token pour accéder à cette ressource',
    );
  }

  const [, token] = authHeader.split(' ');
  jwt.verify(token, process.env.JWT_SIGN_SECRET, (error, user) => {
    if (error) {
      throw new UnauthorizedError(
        'Utilisateur non authentifié',
        'Vous devez fournir un token valide pour accéder à cette ressource',
      );
    }
    if (!user.admin) {
      throw new ForbiddenError(
        'Utilisateur non autorisé',
        "Vous n'avez pas accès à cette ressource",
      );
    }
    request.user = user;
    next();
  });
};