module.exports = {
  env: {
    es2021: true,
    node: true
  },
  extends: ["standard"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module"
  },
  plugins: ["@typescript-eslint"],
  rules: {
    quotes: ["error", "double", { allowTemplateLiterals: true }], // aceita aspas duplas ou template strings
    indent: ["error", 2, { SwitchCase: 1 }], // indentação
    semi: ["error", "always"], // obrigatório colocar ; no final de cada linha
    "comma-dangle": ["error", "never"], // obrigatório colocar , no final de cada linha
    "space-before-function-paren": ["error", "never"]
  }
};
