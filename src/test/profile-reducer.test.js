import React from 'react';
import profileReducer, {addPostActionCreator} from "../redux/profile-reducer";

test('new post should be added', () => {
    let action = addPostActionCreator("my new post");
    let initialState = {
        posts: [
            {id: 1, message: "Hi, hey", likes: 2},
            {id: 2, message: "Hi, hey2", likes: 0}
        ]
    }
    let newState = profileReducer(initialState, action);
    expect(newState.posts.length).toBe(3);
    expect(newState.posts[2].message).toBe("my new post");
    expect(newState.posts[2].likes).toBe(0);

});
