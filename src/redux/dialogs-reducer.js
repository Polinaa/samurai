const SEND_MESSAGE = 'SEND-POST';

let initialState = {
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
};

const dialogsReducer = (state = initialState, action) => {
    if (action.type === SEND_MESSAGE) {
        let newMessageText = action.newMessageText;
        return {
            ...state,
            messages: [...state.messages, {id: 4, message: newMessageText}],
        };
    }
    return state;
}
export const sendMessageActionCreator = (newMessageText) => ({type: SEND_MESSAGE, newMessageText: newMessageText});

export default dialogsReducer;
