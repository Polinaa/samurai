import dialogsReducer from "./dialogs-reducer";
import profileReducer from "./profile-reducer";

let store = {
    _state: {
        profile: {
            posts: [
                {id:1, message: "Hi, hey", likes:2},
                {id:2, message: "Hi, hey2", likes:0}
            ],
            newPostText: ""
        },
        dialogs: {
            dialogs: [
                {id: 1, name: "Dim"},
                {id: 2, name: "And"},
                {id: 3, name: "Pol"}
            ],
            messages: [
                {id: 1, message: "Hola"},
                {id: 2, message: "Hey"},
                {id: 3, message: "Adios"}
            ],
            newMessageText: ""
        }
    },
    _callSubscriber(){},

    getState() {
        return this._state;
    },
    subscribe(observer){
        this._callSubscriber = observer;
    },

    dispatch(action) {
        this._state.profile = profileReducer(this.getState().profile, action);
        this._state.dialogs = dialogsReducer(this.getState().dialogs, action);
        this._callSubscriber();
    }
};

export default store;