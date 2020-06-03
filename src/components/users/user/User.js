import React from 'react';
import s from "../../profile/posts/post/Post.module.css";
import defaultAva from "../../../assets/images/default-ava.png"
import {NavLink} from "react-router-dom";

const User = (props) => {
    let user = props.user;
    let country = user.location !== undefined ? user.location.country : "";
    let city = user.location !== undefined ? user.location.city : "";
    return (
        <div className={s.item}>
            <span>
                <div>
                    <NavLink to={'/profile/' + user.id}>
                        <img src={user.photos.small != null ? user.photos.small : defaultAva}/>
                    </NavLink>
                </div>
                <div>
                    {!user.followed ?
                        <button disabled={props.followingInProgress.some(id => id === user.id)} onClick={() => {props.follow(user.id);}}>
                            Follow
                        </button> :
                        <button disabled={props.followingInProgress.some(id => id === user.id)} onClick={() => {props.unfollow(user.id);}}>
                            UnFollow
                        </button>}
                        </div>
                        </span>
            <span>
                        <span>
                        <div>{user.name}</div>
                        <div>{user.status}</div>
                        </span>
                        <span>
                        <div>{country}</div>
                        <div>{city}</div>
                        </span>
                        </span>
        </div>
    );
};

export default User;