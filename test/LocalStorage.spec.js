const SessionStorageMock = require("./SessionStorage.mock");
const SessionStorage = require("../src/SessionStorage");

describe("SessionStorage", () => {
  let sessionStorageMock;
  let sessionStorage;

  beforeAll(() => {
    sessionStorageMock = new SessionStorageMock();
    sessionStorage = new SessionStorage(sessionStorageMock.stubs);
  });

  afterAll(() => {
    sessionStorageMock.restore();
  });

  describe("SessionStorage", () => {
    describe("save and restore methods", () => {
      it("should restore values that sessionStorage had when save method was called", () => {
        expect.assertions(2);
        sessionStorageMock.stubs.setItem("foo", "foo-value");
        sessionStorageMock.stubs.setItem("var", "var-value");
        sessionStorage.saveSessionStorage();
        sessionStorageMock.stubs.setItem("foo", "foo-new-value");
        expect(sessionStorageMock.stubs.getItem("foo")).toEqual(
          "foo-new-value"
        );
        sessionStorage.restoreSessionStorage();
        expect(sessionStorageMock.stubs.getItem("foo")).toEqual("foo-value");
      });

      it("should restore values after calling sessionStorage clear", () => {
        expect.assertions(2);
        sessionStorageMock.stubs.clear();
        expect(sessionStorageMock.stubs.getItem("var")).toEqual(undefined);
        sessionStorage.restoreSessionStorage();
        expect(sessionStorageMock.stubs.getItem("var")).toEqual("var-value");
      });

      it("should restore new values if Save is called again", () => {
        expect.assertions(2);
        sessionStorageMock.stubs.setItem("foo", "foo-new-value");
        sessionStorageMock.stubs.removeItem("var");
        sessionStorage.saveSessionStorage();
        sessionStorageMock.stubs.setItem("foo", "foo-another-new-value");
        sessionStorageMock.stubs.setItem("var", "foo-var-value");
        sessionStorage.restoreSessionStorage();
        expect(sessionStorageMock.stubs.getItem("foo")).toEqual(
          "foo-new-value"
        );
        expect(sessionStorageMock.stubs.getItem("var")).toEqual(undefined);
      });
    });

    describe("Clear method", () => {
      it("should clear values in sessionStorage snapshot, but maintain sessionStorage values", () => {
        expect.assertions(4);
        sessionStorageMock.stubs.setItem("var", "foo-var-value");
        sessionStorage.clearSessionStorageSnapshot();
        expect(sessionStorageMock.stubs.getItem("foo")).toEqual(
          "foo-new-value"
        );
        expect(sessionStorageMock.stubs.getItem("var")).toEqual(
          "foo-var-value"
        );
        sessionStorage.restoreSessionStorage();
        expect(sessionStorageMock.stubs.getItem("foo")).toEqual(undefined);
        expect(sessionStorageMock.stubs.getItem("var")).toEqual(undefined);
      });
    });
  });

  describe("setSessionStorage method", () => {
    it("should set values in sessionStorage", () => {
      expect.assertions(2);
      sessionStorage.setSessionStorage("foo", "foo-value");
      sessionStorage.setSessionStorage("var", "var-value");
      expect(sessionStorageMock.stubs.getItem("foo")).toEqual("foo-value");
      expect(sessionStorageMock.stubs.getItem("var")).toEqual("var-value");
    });

    it("should not have set values in sessionStorage snapshot", () => {
      expect.assertions(2);
      sessionStorage.restoreSessionStorage();
      expect(sessionStorageMock.stubs.getItem("foo")).toEqual(undefined);
      expect(sessionStorageMock.stubs.getItem("var")).toEqual(undefined);
    });
  });

  describe("getSessionStorage method", () => {
    it("should get sessionStorage items", () => {
      expect.assertions(2);
      sessionStorage.setSessionStorage("foo", "foo-value");
      sessionStorage.setSessionStorage("var", "var-value");
      expect(sessionStorage.getSessionStorage("foo")).toEqual("foo-value");
      expect(sessionStorage.getSessionStorage("var")).toEqual("var-value");
    });
  });

  describe("removeSessionStorage", () => {
    it("should remove session storage items", () => {
      expect.assertions(2);
      sessionStorage.saveSessionStorage();
      sessionStorage.removeSessionStorage("foo");
      expect(sessionStorage.getSessionStorage("foo")).toEqual(undefined);
      expect(sessionStorage.getSessionStorage("var")).toEqual("var-value");
    });

    it("should not remove session storage items from sessionstorage snapshot", () => {
      expect.assertions(2);
      sessionStorage.restoreSessionStorage();
      expect(sessionStorage.getSessionStorage("foo")).toEqual("foo-value");
      expect(sessionStorage.getSessionStorage("var")).toEqual("var-value");
    });
  });
});
