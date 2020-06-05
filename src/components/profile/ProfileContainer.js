import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {
    getProfileThunkCreator,
    getUserStatusThunkCreator,
    loadPhotoThunkCreator,
    updateStatusThunkCreator
} from "../../redux/profile-reducer";
import {withRouter} from "react-router-dom";
import {withAuthRedirect} from "../../hoc/WithAuthRedirect";
import {compose} from "redux";

class ProfileAPIContainer extends React.Component {

    getProfileInfo = () => {
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = this.props.authorizedUserId;
        }
        this.props.getProfile(userId);
        this.props.getUserStatus(userId)
    }

    componentDidMount() {
        this.getProfileInfo();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.match.params.userId !== prevProps.match.params.userId) {
            this.getProfileInfo();
        }
    }

    render() {
        return (
            <div>
                <Profile {...this.props}
                         profile={this.props.profile}
                         isOwner={!this.props.match.params.userId}
                />
            </div>
        );
    }
};

let mapStateToProps = (state) => {
    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        authorizedUserId: state.auth.userId
    }
}

export default compose(
    connect(mapStateToProps, {
        getProfile: getProfileThunkCreator, getUserStatus: getUserStatusThunkCreator,
        updateStatus: updateStatusThunkCreator,
        loadPhoto: loadPhotoThunkCreator
    }),
    withRouter,
    withAuthRedirect)
(ProfileAPIContainer);

