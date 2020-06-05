import React from 'react';
import s from './ProfileInfo.module.css';
import Preloader from "../../common/preloader/Preloader";
import defaultAva from '../../../assets/images/default-ava.png'
import ProfileStatusWithHooks from "./profile-status/ProfileStatusWithHooks";
import {createField, Input} from "../../common/form-controls/form-controls";

const ProfileInfo = (props) => {
    if (!props.profile) {
        return <Preloader/>
    }

    const onMainPhotoLoaded = (e) => {
        if (e.target.files.length){
            props.loadPhoto(e.target.files[0]);
        }
    }
    return (
        <div>
            <div className={s.descriptionBlock}>
                <img src={props.profile.photos.large || defaultAva} className={s.profilePhoto}/>
                {props.isOwner
                // && createField(
                //     null,
                //     "file",
                //     [],
                //     Input,
                //     {
                //         type: "file"
                //     },
                //     null
                // )
                && <input type={"file"} onChange={onMainPhotoLoaded}/>}

                <div>{props.profile.fullName}</div>
                <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus}/>
            </div>
        </div>
    );
};

export default ProfileInfo;