const SessionStorage = require("./SessionStorage");

const register = (Cypress, sessionStorage) => {
  const sessionStorageCommands = new SessionStorage(sessionStorage);
  SessionStorage.cypressCommands.forEach(commandName => {
    Cypress.Commands.add(
      commandName,
      sessionStorageCommands[commandName].bind(sessionStorageCommands)
    );
  });
};

module.exports = {
  register
};
