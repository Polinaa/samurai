import React from 'react';
import {connect} from "react-redux";
import {
    setCurrentPage,
    getUsersThunkCreator, followUserThunkCreator, unFollowUserThunkCreator
} from "../../redux/users-reducer";
import Users from "./Users";
import Preloader from "../common/preloader/Preloader";
import {compose} from "redux";
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount,
    getUsers
} from "../../redux/users-selectors";

class UsersApiContainer extends React.Component {

    //Is done only once when component is created and then appended to Dom.
    //After next rerender calls only updates are performed
    componentDidMount() {
        const {currentPage, pageSize} = this.props;
        this.props.getUsers(currentPage, pageSize);
    }

    // getUsersFromApi = (pageNumber) => {
    //     this.props.setIsFetching(true);
    //     UsersApi.getUsers(pageNumber, this.props.pageSize)
    //         .then(data => {
    //                 this.props.setIsFetching(false);
    //                 this.props.setUsers(data.items);
    //                 this.props.setTotalUsersCount(data.totalCount);
    //             }
    //         );
    // }

    onPageChanged = (pageNumber) => {
        this.props.setCurrentPage(pageNumber);
        const {pageSize} = this.props;
        this.props.getUsers(pageNumber, pageSize);
    }

    render() {
        return (
            <>
                {this.props.isFetching ?
                    <Preloader/> :
                    <Users
                        users={this.props.users}
                        totalUsersCount={this.props.totalUsersCount}
                        pageSize={this.props.pageSize}
                        currentPage={this.props.currentPage}
                        followingInProgress={this.props.followingInProgress}

                        onPageChanged={this.onPageChanged}
                        follow={this.props.follow}
                        unfollow={this.props.unfollow}
                    />}
            </>)
    }
}

// const mapStateToProps = (state) => {
//     return {
//         users: state.users.users,
//         pageSize: state.users.pageSize,
//         totalUsersCount: state.users.totalUsersCount,
//         currentPage: state.users.currentPage,
//         isFetching: state.users.isFetching,
//         followingInProgress: state.users.followingInProgress
//     }
// }

const mapStateToProps = (state) => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state)
    }
}

// const mapDispatchToProps = (dispatch) => {
//     return {
//         followUnfollow: (userId) => {
//             dispatch(followUpdateActionCreator(userId));
//         },
//         setUsers: (users) => {
//             dispatch(setUsersActionCreator(users));
//         },
//         setTotalUsersCount: (count) => {
//             dispatch(setTotalUsersCountAC(count));
//         },
//         setCurrentPage: (pageNumber) => {
//             dispatch(setCurrentPageAC(pageNumber));
//         },
//         setIsFetching: (isFetching) => {
//             dispatch(setIsFetchingAC(isFetching))
//         }
//     }
// }

const mapDispatchToProps = () => {
    return {
        follow: followUserThunkCreator,
        unfollow: unFollowUserThunkCreator,
        setCurrentPage,
        getUsers: getUsersThunkCreator
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps()))
(UsersApiContainer);