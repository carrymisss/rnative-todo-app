import { check } from "express-validator/check";

class ValidatorFactory {
    login() {
        return [
            check("email", "Please include a valid email").isEmail().not().isEmpty(),
            check(
                "password",
                "Please enter a password with 6 or more characters"
            ).isLength({ min: 6 }).not().isEmpty(),
        ];
    }

    signup() {
        return [
            check("username", "Please include a valid username").isString().not().isEmpty(),
            check("email", "Please include a valid email").isEmail().not().isEmpty(),
            check(
                "password",
                "Please enter a password with 6 or more characters"
            ).isLength({ min: 6 }).not().isEmpty(),
        ];
    }

    todo() {
        return [
            check("title", "Title is required").not().isEmpty().toString(),
            check("description", "Text is required").not().isEmpty().toString(),
            check("completion", "Completion is required").not().isNumeric().isBoolean().not().isEmpty(),
            check("privacy", "Privacy is required").isIn(["private", "public",]).not().isEmpty(),
        ];
    }
}

export default ValidatorFactory;