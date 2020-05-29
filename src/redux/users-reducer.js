import {UsersApi} from "../api/api";

const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET-USERS";
const SET_TOTAL_USERS_COUNT = "SET-TOTAL-USERS-COUNT";
const SET_CURRENT_PAGE = "SET-CURRENT-PAGE";
const SET_IS_FETCHING = "SET_IS_FETCHING";
const FOLLOWING_IN_PROGRESS = "FOLLOWING_IN_PROGRESS";

let initialState = {
    users: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: []
    // users: [
    //     {
    //         id: 1,
    //         name: "Matt",
    //         status: "Looking for new friends",
    //         location: {country: "Ukraine", city: "Kiev"},
    //         followed: false,
    //         photoUrl: "data:image/jpeg;base64,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"
    //     },
    //     {
    //         id: 2,
    //         name: "Ann",
    //         status: "Enjoying life",
    //         location: {country: "Belarus", city: "Minsk"},
    //         followed: true,
    //         photoUrl: "data:image/jpeg;base64,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"
    //     }
    // ]
}

const usersReducer = (state = initialState, action) => {
    if (action.type === FOLLOW) {
        return {
            ...state,
            users: state.users
                .map(u => {
                    return (u.id === action.userId) ? {...u, followed: true} : u;
                })
        }
    }
    if (action.type === UNFOLLOW) {
        return {
            ...state,
            users: state.users
                .map(u => {
                    return (u.id === action.userId) ? {...u, followed: false} : u;
                })
        }
    }
    if (action.type === SET_USERS) {
        return {
            ...state,
            users: action.users
        }
    }
    if (action.type === SET_TOTAL_USERS_COUNT) {
        return {
            ...state,
            totalUsersCount: action.count
        }
    }
    if (action.type === SET_CURRENT_PAGE) {
        return {
            ...state,
            currentPage: action.pageNumber
        }
    }
    if (action.type === SET_IS_FETCHING) {
        return {
            ...state,
            isFetching: action.isFetching
        }
    }
    if (action.type === FOLLOWING_IN_PROGRESS) {
        return {
            ...state,
            followingInProgress: action.followingInProgress ?
                [...state.followingInProgress, action.userId] :
                state.followingInProgress.filter(id => id !== action.userId)
        }
    }
    return state;
}

export const follow = (userId) => ({type: FOLLOW, userId: userId});
export const unfollow = (userId) => ({type: UNFOLLOW, userId: userId});
export const setUsers = (users) => ({type: SET_USERS, users: users});
export const setTotalUsersCount = (count) => ({type: SET_TOTAL_USERS_COUNT, count: count});
export const setCurrentPage = (pageNumber) => ({type: SET_CURRENT_PAGE, pageNumber: pageNumber});
export const setIsFetching = (isFetching) => ({type: SET_IS_FETCHING, isFetching: isFetching});
export const setFollowingInProgress = (inProgress, userId) => ({
    type: FOLLOWING_IN_PROGRESS,
    followingInProgress: inProgress,
    userId
});


export const getUsersThunkCreator = (pageNumber, pageSize) => {
    return (dispatch) => {
        dispatch(setIsFetching(true));
        UsersApi.getUsers(pageNumber, pageSize)
            .then(data => {
                    dispatch(setIsFetching(false));
                    dispatch(setUsers(data.items));
                    dispatch(setTotalUsersCount(data.totalCount));
                }
            );
    }
}

export const followUserThunkCreator = (userId) => {
    return (dispatch) => {
        dispatch(setFollowingInProgress(true, userId));
        UsersApi.follow(userId)
            .then(data => {
                    if (data.resultCode === 0) {
                        dispatch(follow(userId));
                    }
                    dispatch(setFollowingInProgress(false, userId));
                }
            );
    }
}

export const unFollowUserThunkCreator = (userId) => {
    return (dispatch) => {
        dispatch(setFollowingInProgress(true, userId));
        UsersApi.unfollow(userId)
            .then(data => {
                    if (data.resultCode === 0) {
                        dispatch(unfollow(userId));
                    }
                    dispatch(setFollowingInProgress(false, userId));
                }
            );
    }
}



export default usersReducer;
