import React from 'react';
import s from './Friend.module.css';

const Friend = (props) => {
    return (
        <div className={s.friendBlock}>
            <div className={s.ava}>
            </div>
            <div>{props.name}</div>
        </div>
    );
};

export default Friend;