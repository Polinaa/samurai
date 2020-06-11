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
            (!editMode || !props.isOwner) &&
            <div onDoubleClick={activateEditMode}>
                    <span>
                        {props.status || props.isOwner && "Double click to add status"}
                    </span>
            </div>}
        {
            editMode && props.isOwner &&
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