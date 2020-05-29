import React from 'react';
import User from "./user/User";
import s from './Users.module.css'

let Users = (props) => {
    let pageCount = Math.ceil(props.totalUsersCount / props.pageSize);
    let pages = [];
    for (let i = 0; i < pageCount; i++) {
        pages.push(i + 1);
    }
    let pageElements = pages
        .filter(p => p < 12)
        .map(p => {
                return (<span className={p === props.currentPage && s.selectedPage}
                              onClick={() => {
                                  props.onPageChanged(p)
                              }}>{p} </span>);
            }
        );
    let usersElements = props.users.map(u => <User key={u.id}
                                                   id={u.id}
                                                   name={u.name}
                                                   location={u.location}
                                                   followed={u.followed}
                                                   status={u.status}
                                                   photos={u.photos}
                                                   follow={props.follow}
                                                   unfollow={props.unfollow}
                                                   followingInProgress={props.followingInProgress}
                                                   />);
    return (
        <div>
            {pageElements}
            {usersElements}
        </div>
    )
}

export default Users;