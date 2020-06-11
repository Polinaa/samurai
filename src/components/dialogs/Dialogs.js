import React from 'react';
import s from './Dialogs.module.css'
import DialogItem from "./dialog-item/DialogItem";
import Message from "./message/Message";
import {Field, reduxForm} from "redux-form";
import {maxLength, required} from "../../utils/validators/validators";
import {TextArea} from "../common/form-controls/form-control";

const maxLength5 = maxLength(5);
const NewMessageForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder="Enter new message"
                       component={TextArea}
                       validate={[required, maxLength5]}
                       name={"newMessageText"}/>
            </div>
            <div>
                <button>Send</button>
            </div>
        </form>);
};

const NewMessageReduxForm = reduxForm({form: "dialogsNewMessage"})(NewMessageForm);

const Dialogs = (props) => {
    let dialogs = props.dialogs;
    let dialogElements = dialogs.dialogs.map(d => <DialogItem key={d.id} name={d.name} id={d.id}/>);
    let messageElements = dialogs.messages.map(m => <Message key={m.id} message={m.message}/>);

    let sendNewMessage = (formData) => {
        props.sendMessage(formData.newMessageText);
    };
    return (
        <div className={s.dialogs}>
            <div className={s.dialogItems}>
                {dialogElements}
            </div>
            <div>
                <div className={s.messages}>
                    {messageElements}
                </div>
                <NewMessageReduxForm onSubmit={sendNewMessage}/>
            </div>
        </div>
    );
};

export default Dialogs;