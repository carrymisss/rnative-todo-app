import HttpService from "./http.service";
import { ILoginFormValues, ISignupFormValues } from "../interfaces";

class AuthService extends HttpService {
    constructor() {
        super();
        this.apiVersion = "api/auth";
    }

    loginUser(values: ILoginFormValues) {
        return this.post({
            url: "/login",
            data: { ...values }
        }, false);
    }

    signupUser(values: ISignupFormValues) {
        return this.post({
            url: "/signup",
            data: { ...values }
        }, false);
    }
}

export default AuthService;