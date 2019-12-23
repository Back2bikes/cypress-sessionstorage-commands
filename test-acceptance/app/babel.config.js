module.exports = {
  plugins: [
    [
      "module-resolver",
      {
        root: ["."],
        alias: {
          "cypress-sessionstorage-commands": `../../`
        }
      }
    ]
  ]
};
