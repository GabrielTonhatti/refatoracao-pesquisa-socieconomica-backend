module.exports = {
    parser: "@typescript-eslint/parser",
    env: {
        es2021: true,
        node: true,
    },
    plugins: ["@typescript-eslint"],
    extends: ["plugin:@typescript-eslint/recommended", "prettier", "standard"],
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
    },
    rules: {
        quotes: ["error", "double", { allowTemplateLiterals: true }], // aceita aspas duplas ou template strings
        indent: ["error", 4],
        semi: ["error", "always"], // obrigatório colocar ; no final de cada linha
        "comma-dangle": ["error", "always-multiline"], // obrigatório colocar , no final de cada linha
        "space-before-function-paren": ["error", "never"],
    },
};
