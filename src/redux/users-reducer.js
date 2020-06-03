import {UsersApi} from "../api/api";
import {updateObjectInArray} from "../utils/helper/object-helpers";

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
}

const usersReducer = (state = initialState, action) => {
    if (action.type === FOLLOW) {
        return {
            ...state,
            users: updateObjectInArray(state.users, action.userId, "id", {followed: true})
        }
    }
    if (action.type === UNFOLLOW) {
        return {
            ...state,
            users: updateObjectInArray(state.users, action.userId, "id", {followed: false})
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


export const getUsersThunkCreator = (pageNumber, pageSize) => async (dispatch) => {
    dispatch(setIsFetching(true));
    const data = await UsersApi.getUsers(pageNumber, pageSize);

    dispatch(setIsFetching(false));
    dispatch(setUsers(data.items));
    dispatch(setTotalUsersCount(data.totalCount));
}

export const followUserThunkCreator = (userId) => async (dispatch) => {
    followUnFollowHelper(dispatch, userId, UsersApi.follow.bind(UsersApi), follow);
}

export const unFollowUserThunkCreator = (userId) => async (dispatch) => {
    followUnFollowHelper(dispatch, userId, UsersApi.unfollow.bind(UsersApi), unfollow);
}

const followUnFollowHelper = async (dispatch, userId, followUnfollowApiFunc, followUnfollowActionFunc) => {
    dispatch(setFollowingInProgress(true, userId));
    const data = await followUnfollowApiFunc(userId)
    if (data.resultCode === 0) {
        dispatch(followUnfollowActionFunc(userId));
    }
    dispatch(setFollowingInProgress(false, userId));
}


export default usersReducer;
