import React, {useEffect, useState} from 'react';

const ProfileStatusWithHooks = (props) => {

    let [editMode, setEditMode] = useState(false);
    let [status, setStatus] = useState(props.status);

    //synchronize state
    //will be called after JSX was returned
    //if [] is passed is called once
    useEffect(() => {
        setStatus(props.status);
    }, [props.status]);

    let activateEditMode = () => {
        setEditMode(true);
    }

    let onStatusChange = (e) => {
        setStatus(e.currentTarget.value);
    }

    let updateStatusAndDeActivateEditMode = () => {
        props.updateStatus(status);
        setEditMode(false);
    }

    return (<div>
        {
            !editMode &&
            <div onDoubleClick={activateEditMode}>
                    <span>
                        {props.status || "Double click to add status"}
                    </span>
            </div>}
        {
            editMode &&
            <div>
                <input
                    onChange={onStatusChange}
                    autoFocus={true}
                    onBlur={updateStatusAndDeActivateEditMode}
                    value={status}/>
            </div>
        }
    </div>);
};

export default ProfileStatusWithHooks;