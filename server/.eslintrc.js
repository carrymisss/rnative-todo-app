// eslint-disable-next-line no-undef
module.exports = {
    env: {
        "browser": true,
        "es2021": true
    },
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
    ],
    parser: "@typescript-eslint/parser",
    plugins: [
        "@typescript-eslint",
        "import",
    ],
    rules: {
        "semi": "error",
        "quotes": ["warn", "double", { "avoidEscape": true },],
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/ban-types": "off",
        "object-curly-spacing": ["error", "always",],
        "import/newline-after-import": ["error", { "count": 1 },],
        "indent": ["error", 4,  { 
            "ignoredNodes": ["ConditionalExpression",],
            "SwitchCase": 1,
            "VariableDeclarator": 1
        },],
        "comma-dangle": ["error", {
            "arrays": "always",
            "objects": "never",
            "imports": "never",
            "exports": "never",
            "functions": "never"
        },]
    }
};
