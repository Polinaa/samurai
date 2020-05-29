import {AuthApi, ProfileApi} from "../api/api";
import {setUserProfile} from "./profile-reducer";

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
            ...action.data,
            isAuth: true
        };
    }
    return state;
}
export const setUserData = (userId, email, login) => ({type: SET_USER_DATA, data: {userId, email, login}});


export const authMeThunkCreator = () => {
    return (dispatch) => {
        // this.props.setIsFetching(true);
        AuthApi.authMe()
            .then(data => {
                    if (data.resultCode === 0) {
                        let {id, email, login} = data.data;
                        dispatch(setUserData(id, email, login));
                        // this.props.setIsFetching(false);
                    }
                }
            );
    }
}

export const loginThunkCreator = (email, password, rememberMe, captcha) => {
    return (dispatch) => {
        AuthApi.login(email, password, rememberMe, captcha)
            .then(data => {
                    if (data.resultCode === 0) {
                    }
                }
            );
    }
}


export default authReducer;
