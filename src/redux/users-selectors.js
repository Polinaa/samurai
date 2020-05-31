import {createSelector} from "reselect";

export const getUsers = (state) => {
    return state.users.users;
    //always returns new array and rerender the componet
    // return state.users.users.filter(u => true);
}

export const getUsersWithRerender = (state) => {
    //always returns new array and rerender the componet
    return getUsers(state).filter(u => true);
}
export const getUsersSuper = createSelector(getUsers, (users) => {
    return users.filter(u => true);
});

export const getPageSize = (state) => {
    return state.users.pageSize;
}

export const getTotalUsersCount = (state) => {
    return state.users.totalUsersCount;
}

export const getCurrentPage = (state) => {
    return state.users.currentPage;
}

export const getIsFetching = (state) => {
    return state.users.isFetching;
}

export const getFollowingInProgress = (state) => {
    return state.users.followingInProgress;
}