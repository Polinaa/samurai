import React, {useState} from 'react';

const ProfileStatusWithHooks = (props) => {

    let [editMode, setEditMode] = useState(false);
    let [status, setStatus] = useState(props.status);

    // componentDidUpdate(prevProps, prevState, snapshot)
    // {
    //     if (prevProps.status !== this.props.status) {
    //         this.setState({
    //             status: this.props.status
    //         })
    //     }
    //     console.log("update");
    // }

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