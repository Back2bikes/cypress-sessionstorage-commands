import { SessionStorage } from "@xbyorange/mercury-browser-storage";

export const userPreferences = new SessionStorage(
  "user-preferences",
  {
    cookiesAccepted: false
  },
  {
    queriesDefaultValue: true
  }
);

userPreferences.addCustomQueries({
  cookiesAccepted: () => "cookiesAccepted"
});
