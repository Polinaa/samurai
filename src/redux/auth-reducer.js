import {AuthApi, ProfileApi} from "../api/api";
import {setUserProfile} from "./profile-reducer";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = 'SET_USER_DATA';

let initialState = {
    userId: null,
    email: null,
    login: null,
    isFetching: false,
    isAuth: false
};

const authReducer = (state = initialState, action) => {
    if (action.type === SET_USER_DATA) {
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


export const authMeThunkCreator = () => {
    return (dispatch) => {
        // this.props.setIsFetching(true);
        return AuthApi.authMe()
            .then(data => {
                    if (data.resultCode === 0) {
                        let {id, email, login} = data.data;
                        dispatch(setUserData(id, email, login, true));
                        // this.props.setIsFetching(false);
                    }
                }
            );
    }
}

export const loginThunkCreator = (email, password, rememberMe) => {
    return (dispatch) => {
        AuthApi.login(email, password, rememberMe)
            .then(data => {
                    if (data.resultCode === 0) {
                        dispatch(authMeThunkCreator())
                    } else {
                        let message = data.messages.length > 0 ? data.messages[0] : "Some error";
                        dispatch(stopSubmit("login", {_error: message}));
                    }
                }
            );
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


export default authReducer;
