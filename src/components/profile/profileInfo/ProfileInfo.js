import React from 'react';
import s from './ProfileInfo.module.css';
import Preloader from "../../common/preloader/Preloader";
import defaultAva from '../../../assets/images/default-ava.png'
import ProfileStatusWithHooks from "./profile-status/ProfileStatusWithHooks";

const ProfileInfo = (props) => {
    if (!props.profile) {
        return <Preloader/>
    }
    return (
        <div>
            <div className={s.descriptionBlock}>
                <img src={props.profile.photos.small ? props.profile.photos.small : defaultAva}/>
                <div>{props.profile.fullName}</div>
                <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus}/>
            </div>
        </div>
    );
};

export default ProfileInfo;