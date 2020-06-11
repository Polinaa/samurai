import React from 'react';
import s from './ProfileInfo.module.css';
import {reduxForm} from "redux-form";
import {createField, Input, TextArea} from "../../common/form-controls/form-control";

const ProfileDataForm = ({profile, error, ...props}) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <button>Save</button>
            {error
            &&
            (<div className={s.formSummeryError}>{error}</div>)}
            <div>
                <div>
                    <b>Name</b>
                    {createField(null, "fullName", [], Input)}
                </div>
                <div>
                    <b>Looking for a job:</b>
                    {createField("Looking for a job", "lookingForAJob", null, Input, {type: "checkbox"})}
                    <b>My prof skills:</b>
                    {createField("Prof skills", "lookingForAJobDescription", [], Input)}
                    <div><b>About me:</b> {createField(null, "aboutMe", [], TextArea)}
                    </div>
                    {<div><b>Contacts:</b> {Object.keys(profile.contacts).map(key =>
                        <div className={s.contact} key={key}>
                            <b>{key}:</b>
                            {createField(key, "contacts." + key, [], Input)}
                        </div>
                    )}</div>}
                </div>
            </div>
        </form>
    );
}

export default reduxForm({form: "profileEdit"})(ProfileDataForm);
;