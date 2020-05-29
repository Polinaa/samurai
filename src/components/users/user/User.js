import React from 'react';
import s from "../../profile/posts/post/Post.module.css";
import defaultAva from "../../../assets/images/default-ava.png"
import {NavLink} from "react-router-dom";

const User = (props) => {
    let country = props.location !== undefined ? props.location.country : "";
    let city = props.location !== undefined ? props.location.city : "";
    return (
        <div className={s.item}>
            <span>
                <div>
                    <NavLink to={'/profile/' + props.id}>
                        <img src={props.photos.small != null ? props.photos.small : defaultAva}/>
                    </NavLink>
                </div>
                <div>
                    {!props.followed ?
                        <button disabled={props.followingInProgress.some(id => id === props.id)} onClick={() => {props.follow(props.id);}}>
                            Follow
                        </button> :
                        <button disabled={props.followingInProgress.some(id => id === props.id)} onClick={() => {props.unfollow(props.id);}}>
                            UnFollow
                        </button>}
                        </div>
                        </span>
            <span>
                        <span>
                        <div>{props.name}</div>
                        <div>{props.status}</div>
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