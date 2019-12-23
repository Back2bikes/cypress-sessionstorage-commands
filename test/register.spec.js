const SessionStorageMock = require("./SessionStorage.mock");
const CypressMock = require("./Cypress.mock");

const SessionStorage = require("../src/SessionStorage");
const { register } = require("../src/register");

describe("register", () => {
  let cypressMock;
  let sessionStorageMock;

  beforeEach(() => {
    sessionStorageMock = new SessionStorageMock();
    cypressMock = new CypressMock();
    register(cypressMock.stubs, sessionStorageMock.stubs);
  });

  afterEach(() => {
    sessionStorageMock.restore();
    cypressMock.restore();
  });

  describe("methods", () => {
    it("should register all SessionStorage public methods as commands on Cypress", () => {
      expect(cypressMock.stubs.Commands.add.callCount).toEqual(
        SessionStorage.cypressCommands.length
      );
    });

    it("should register clearSessionStorageSnapshot method", () => {
      expect(
        cypressMock.stubs.Commands.add.calledWith("clearSessionStorageSnapshot")
      ).toBe(true);
    });

    it("should register saveSessionStorage method", () => {
      expect(
        cypressMock.stubs.Commands.add.calledWith("saveSessionStorage")
      ).toBe(true);
    });

    it("should register restoreSessionStorage method", () => {
      expect(
        cypressMock.stubs.Commands.add.calledWith("restoreSessionStorage")
      ).toBe(true);
    });
  });
});
