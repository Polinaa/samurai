import React from 'react';
import User from "./user/User";
import Paginator from "../common/paginator/Paginator";

let Users = (props) => {
    let usersElements = props.users.map(u => <User key={u.id}
                                                   user={u}
                                                   follow={props.follow}
                                                   unfollow={props.unfollow}
                                                   followingInProgress={props.followingInProgress}
    />);
    return (
        <div>
            <Paginator currentPage={props.currentPage}
                       onPageChanged={props.onPageChanged}
                       totalUsersCount={props.totalUsersCount}
                       pageSize={props.pageSize}
            />
            {usersElements}
        </div>
    )
}

export default Users;