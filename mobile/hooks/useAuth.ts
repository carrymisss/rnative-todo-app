import { useContext } from "react";
import { AuthContext } from "../context/authContext";

const useAuth = () => {
    const { token, setToken, deleteToken } = useContext(AuthContext);    

    return { setToken, token, deleteToken };
};

export default useAuth;