import React from 'react';
import s from './Friends.module.css';
import {NavLink} from "react-router-dom";
import Friend from "./friend/Friend";

const Friends = (props) => {
    return (
        <div>
            <div className={s.item}>
                <NavLink to='/friends' activeClassName={s.activeLink}>Friends</NavLink>
            </div>
            <div>
                <Friend name="Ann"/>
                <Friend name="Dan"/>
                <Friend name="Pol"/>
            </div>
        </div>
    );
};

export default Friends;