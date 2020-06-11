import React from 'react';
import ProfileInfo from "./profileInfo/ProfileInfo";
import PostsContainer from "./posts/PostsContainer";

const Profile = (props) => {
    return (
        <div>
            <ProfileInfo profile={props.profile}
                         status={props.status}
                         updateStatus={props.updateStatus}
                         isOwner={props.isOwner}
                         loadPhoto={props.loadPhoto}
                         updateProfile={props.updateProfile}
            />
            <PostsContainer/>
            Main content
        </div>
    );
};

export default Profile;