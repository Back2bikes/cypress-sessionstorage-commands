describe("Cookies", () => {
  const SELECTORS = {
    ACCEPT_BUTTON: "#accept-cookies",
    REJECT_BUTTON: "#reject-cookies"
  };

  describe("when cookies are not accepted", () => {
    before(() => {
      cy.visit("/");
    });

    it("should display accept cookies button", () => {
      cy.get(SELECTORS.ACCEPT_BUTTON).should("be.visible");
    });
  });

  describe("when user click accept cookies button", () => {
    describe("without using sessionStorage commands", () => {
      it("should display reject cookies button", () => {
        cy.get(SELECTORS.ACCEPT_BUTTON).click();
        cy.get(SELECTORS.REJECT_BUTTON).should("be.visible");
      });

      it("should accept cookies button after reloading page", () => {
        cy.reload();
        cy.get(SELECTORS.ACCEPT_BUTTON).should("be.visible");
      });
    });

    describe("saving and restoring session storage", () => {
      it("should display reject cookies button", () => {
        cy.get(SELECTORS.ACCEPT_BUTTON).click();
        cy.get(SELECTORS.REJECT_BUTTON).should("be.visible");
        cy.saveSessionStorage();
      });

      it("should display reject cookies button after reloading page", () => {
        cy.restoreSessionStorage();
        cy.reload();
        cy.get(SELECTORS.REJECT_BUTTON).should("be.visible");
      });
    });
  });

  describe("restoring sessionStorage, when user click rejects cookies button", () => {
    it("should display accept cookies button", () => {
      cy.restoreSessionStorage();
      cy.reload();
      cy.get(SELECTORS.REJECT_BUTTON).click();
      cy.get(SELECTORS.ACCEPT_BUTTON).should("be.visible");
      cy.saveSessionStorage();
    });

    it("should display accept-cookies cookies button after reloading page", () => {
      cy.restoreSessionStorage();
      cy.reload();
      cy.get(SELECTORS.ACCEPT_BUTTON).should("be.visible");
    });

    it("should display reject-cookies cookies button after clicking accept-cookies button again", () => {
      cy.restoreSessionStorage();
      cy.reload();
      cy.get(SELECTORS.ACCEPT_BUTTON).click();
      cy.get(SELECTORS.REJECT_BUTTON).should("be.visible");
      cy.saveSessionStorage();
    });
  });

  describe("after clearing sessionStorage snapshot", () => {
    before(() => {
      cy.clearSessionStorageSnapshot();
    });

    it("should display accept cookies button", () => {
      cy.restoreSessionStorage();
      cy.reload();
      cy.get(SELECTORS.ACCEPT_BUTTON).should("be.visible");
      cy.saveSessionStorage();
    });
  });

  describe("when using setSessionStorage command to manually set user-preferences value", () => {
    it("should display reject cookies button", () => {
      cy.setSessionStorage("user-preferences", '{"cookiesAccepted":true}');
      cy.reload();
      cy.get(SELECTORS.REJECT_BUTTON).should("be.visible");
      cy.saveSessionStorage();
    });
  });

  describe("when using getSessionStorage command to manually get sessionStorage items", () => {
    it("should return current sessionStorage values", () => {
      cy.restoreSessionStorage();
      cy.reload();
      cy.get(SELECTORS.REJECT_BUTTON).should("be.visible");
      cy.getSessionStorage("user-preferences").should(
        "be",
        '{"cookiesAccepted":true}'
      );
      cy.setSessionStorage("user-preferences", '{"cookiesAccepted":false}');
      cy.getSessionStorage("user-preferences").should(
        "be",
        '{"cookiesAccepted":false}'
      );
      cy.saveSessionStorage();
    });
  });

  describe("when using removeSessionStorage command to manually remove sessionStorage item", () => {
    it("should remove item from sessionStorage", () => {
      cy.restoreSessionStorage();
      cy.reload();
      cy.getSessionStorage("user-preferences").should(
        "be",
        '{"cookiesAccepted":false}'
      );
      cy.get(SELECTORS.ACCEPT_BUTTON).should("be.visible");
      cy.removeSessionStorage("user-preferences");
      cy.getSessionStorage("user-preferences").should("be", undefined);
    });

    it("should not remove item from sessionStorage snapshot", () => {
      cy.restoreSessionStorage();
      cy.reload();
      cy.getSessionStorage("user-preferences").should(
        "be",
        '{"cookiesAccepted":false}'
      );
      cy.get(SELECTORS.ACCEPT_BUTTON).should("be.visible");
      cy.removeSessionStorage("user-preferences");
      cy.saveSessionStorage();
    });

    it("should remove item from sessionStorage snapshot after saving it", () => {
      cy.setSessionStorage("user-preferences", '{"cookiesAccepted":true}');
      cy.reload();
      cy.get(SELECTORS.REJECT_BUTTON).should("be.visible");
      cy.restoreSessionStorage();
      cy.getSessionStorage("user-preferences").should("not.exist");
    });
  });
});
