import React from 'react';
import {addPostActionCreator} from "../../../redux/profile-reducer";
import Posts from "./Posts";
import {connect} from "react-redux";

//checks if previous state.profile !== new state.profile and rerenders component
//there was no rerendering by connect
//as no new Object was created, and we just changed properties of the existing object
const mapStateToProps = (state) => {
    return {
        profile: state.profilePage
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addPost: (newPostText) => {
            dispatch(addPostActionCreator(newPostText));
        }
    }
}

const PostsContainer = connect(mapStateToProps, mapDispatchToProps)(Posts);

export default PostsContainer;