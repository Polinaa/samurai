import React from 'react';

class ProfileStatus extends React.Component {

    state = {
        editMode: false,
        status: this.props.status
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.status !== this.props.status) {
            this.setState({
                status: this.props.status
            })
        }
        console.log("update");
    }

    //if use activateEditMode() than context is lost and binding should be done
    //not to perform binding we can create just a function activateEditMode = () => {}
    activateEditMode = () => {
        //here editMode = false
        //async
        this.setState({
            editMode: true
        });
        //here editMode is also = false
    }

    onStatusChange = (e) => {
        this.setState({
            status: e.currentTarget.value
        });
    }

    updateStatusAndDeActivateEditMode () {
        this.props.updateStatus(this.props.status);
        this.setState({
            editMode: false
        });
    }


    render() {
        return (<div>
            {
                !this.state.editMode &&
                <div>
                    <span onDoubleClick={this.activateEditMode}>
                        {this.props.status || "Double click to add status"}
                    </span>
                </div>}
            {
                this.state.editMode &&
                <div>
                    <input
                        onChange={this.onStatusChange}
                        autoFocus={true}
                        onBlur={this.updateStatusAndDeActivateEditMode.bind(this)}
                        value={this.state.status}/>
                </div>
            }
        </div>);
    }
};

export default ProfileStatus;