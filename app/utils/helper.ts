import { jwtDecode, JwtPayload } from "jwt-decode";
import Cookie from "js-cookie";


const getLocalToken = () => {
    try {
        const token = Cookie.get("token");
        return token;
    } catch (error) {
        return null;
    }
};

const getUser = () => {
    try {
        const user = Cookie.get("token");
        if (user) {
            return jwtDecode<JwtPayload>(user);
        }
        return user;
    } catch (error) {
        return null;
    }
};

const setToken = (token: string) => {
    try {
        Cookie.set("token", token);
    } catch (error) {
        return null;
    }
};

const removeToken = () => {
    try {
        Cookie.remove('token');
    } catch (error) {
        return null;
    }
}

const Helper = {
    getLocalToken,
    getUser,
    setToken,
    removeToken
};
export default Helper;
