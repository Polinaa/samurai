import {ProfileApi} from "../api/api";

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_USER_STATUS = 'SET_USER_STATUS';

let initialState = {
    posts: [
        {id: 1, message: "Hi, hey", likes: 2},
        {id: 2, message: "Hi, hey2", likes: 0}
    ],
    isFetching: false,
    profile: null,
    status: ""
}

const profileReducer = (state = initialState, action) => {
    if (action.type === ADD_POST) {
        let newText = action.newPostText;
        return {
            ...state,
            posts: [...state.posts, {id: 4, message: newText, likes: 0}],
        };
    }
    if (action.type === SET_USER_PROFILE) {
        return {
            ...state, profile: action.profile
        };
    }
    if (action.type === SET_USER_STATUS) {
        return {
            ...state, status: action.status
        };
    }
    return state;
}
export const addPostActionCreator = (newPostText) => ({type: ADD_POST, newPostText: newPostText})
export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile: profile})
export const setUserStatus = (status) => ({type: SET_USER_STATUS, status: status})

export const getProfileThunkCreator = (userId) => {
    return (dispatch) => {
        // this.props.setIsFetching(true);
        ProfileApi.getProfile(userId)
            .then(data => {
                    dispatch(setUserProfile(data));
                    // this.props.setIsFetching(false);
                    // this.props.setUsers(response.data.items);
                    // this.props.setTotalUsersCount(response.data.totalCount);
                }
            );
    }
}

export const getUserStatusThunkCreator = (userId) => {
    return (dispatch) => {
        ProfileApi.getStatus(userId)
            .then(status => {
                dispatch(setUserStatus(status))
            })
    }
}

export const updateStatusThunkCreator = (status) => {
    return (dispatch) => {
        ProfileApi.updateStatus(status)
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(setUserStatus(status));
                }
            })
    }
}
export default profileReducer;
