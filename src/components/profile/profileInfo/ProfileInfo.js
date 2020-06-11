import React, {useState} from 'react';
import s from './ProfileInfo.module.css';
import Preloader from "../../common/preloader/Preloader";
import defaultAva from '../../../assets/images/default-ava.png'
import ProfileStatusWithHooks from "./profile-status/ProfileStatusWithHooks";
import ProfileDataForm from "./ProfileDataForm";

const ProfileInfo = (props) => {
    let [editMode, setEditMode] = useState(false);

    if (!props.profile) {
        return <Preloader/>
    }

    const onMainPhotoLoaded = (e) => {
        if (e.target.files.length) {
            props.loadPhoto(e.target.files[0]);
        }
    }

    const onSubmit = (formData) => {
        props.updateProfile(formData)
            .then(() => {
                setEditMode(false);
            })
    }

    return (
        <div>
            <div className={s.descriptionBlock}>
                <img src={props.profile.photos.large || defaultAva} className={s.profilePhoto}/>
                {props.isOwner && <input type={"file"} onChange={onMainPhotoLoaded}/>}
                <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus}/>
                {editMode ?
                    <ProfileDataForm initialValues={props.profile} profile={props.profile} onSubmit={onSubmit}/> :
                    <ProfileData profile={props.profile}
                                 isOwner={props.isOwner}
                                 setEditMode={setEditMode}
                    />
                }
            </div>
        </div>
    );
};

const ProfileData = ({profile, isOwner, setEditMode}) => {
    return (
        <div>
            {isOwner && <button onClick={() => setEditMode(true)}>Edit</button>}
            <div><b>{profile.fullName}</b></div>
            <div>
                <div><b>Looking for a job:</b> {profile.lookingForAJob ? "yes" : "no"}</div>
                {profile.lookingForAJob &&
                <div><b>My prof skills:</b>{profile.lookingForAJobDescription}</div>
                }
                <div><b>About me:</b> {profile.aboutMe}</div>
                <div><b>Contacts:</b> {Object.keys(profile.contacts).map(key =>
                    <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]}/>
                )}</div>
            </div>
        </div>
    );
}

const Contact = ({contactTitle, contactValue}) => {
    return (
        <div className={s.contact}>
            {/*{contactValue &&*/}
            <div><b>{contactTitle}:</b>{contactValue}</div>
            {/*}*/}
        </div>
    )
}
export default ProfileInfo;