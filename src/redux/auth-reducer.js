import {AuthApi, ProfileApi} from "../api/api";
import {setUserProfile} from "./profile-reducer";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = 'auth/SET_USER_DATA';
const SET_CAPTCHA = 'SET_CAPTCHA';

let initialState = {
    userId: null,
    email: null,
    login: null,
    isFetching: false,
    isAuth: false,
    captcha: null
};

const authReducer = (state = initialState, action) => {
    if (action.type === SET_USER_DATA || action.type === SET_CAPTCHA) {
        return {
            ...state,
            ...action.data
        };
    }
    return state;
}
export const setUserData = (userId, email, login, isAuth) => ({
    type: SET_USER_DATA,
    data: {userId, email, login, isAuth}
});

export const setCaptcha = (captcha) => ({
    type: SET_CAPTCHA,
    data: {captcha}
});


export const authMeThunkCreator = () => async (dispatch) => {
    let data = await AuthApi.authMe();
    if (data.resultCode === 0) {
        let {id, email, login} = data.data;
        dispatch(setUserData(id, email, login, true));
    }
}

export const loginThunkCreator = (email, password, rememberMe, captcha) => async (dispatch) => {
    let data = await AuthApi.login(email, password, rememberMe, captcha);

    if (data.resultCode === 0) {
        dispatch(authMeThunkCreator())
    } else if (data.resultCode === 10) {
        dispatch(getCaptchaThunkCreator())
    } else {
        let message = data.messages.length > 0 ? data.messages[0] : "Some error";
        dispatch(stopSubmit("login", {_error: message}));
    }
}

export const logoutThunkCreator = () => {
    return (dispatch) => {
        AuthApi.logout()
            .then(data => {
                    if (data.resultCode === 0) {
                        dispatch(setUserData(null, null, null, false));
                    }
                }
            );
    }
}

export const getCaptchaThunkCreator = () => async (dispatch) => {
    let data = await AuthApi.getCaptcha();
    dispatch(setCaptcha(data.url));
}

export default authReducer;
