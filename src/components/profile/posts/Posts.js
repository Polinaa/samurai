import React from 'react';
import Post from "./post/Post";
import s from './Posts.module.css';
import {Field, reduxForm} from "redux-form";
import {maxLength, required} from "../../../utils/validators/validators";
import {FormControls} from "../../common/form-controls/form-controls";

const maxLength10 = maxLength(10);

const PostForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field name={"newPostText"}
                       component={FormControls}
                       validate={[required, maxLength10]}
                       placeholder={"Enter a message"}/>
            </div>
            <div>
                <button>Add post</button>
            </div>
        </form>
    );
}

const PostReduxForm = reduxForm({form: 'postsNewPost'})(PostForm);

const Posts = (props) => {
    let postElements = props.profile.posts.map(p => <Post key={p.id} message={p.message} likes={p.likes}/>);

    let addPost = (formData) => {
        props.addPost(formData.newPostText);
    }

    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <PostReduxForm onSubmit={addPost}/>
            <div className={s.posts}>
                {postElements}
            </div>
        </div>
    );
};

export default Posts;