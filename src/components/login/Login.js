import React from 'react';
import {reduxForm} from "redux-form";
import {connect} from "react-redux";
import {loginThunkCreator, logoutThunkCreator} from "../../redux/auth-reducer";
import {maxLength, required} from "../../utils/validators/validators";
import {createField, Input} from "../common/form-controls/form-controls";
import {Redirect} from "react-router-dom";
import s from "../common/form-controls/form-control.module.css"

const maxLength50 = maxLength(50);

const LoginForm = ({handleSubmit, error}) => {
    //handle submit
    //e.preventDefault
    //get all data from form and put them into object
    //props.onSubmit(formData)
    return (
        <div>
            <form onSubmit={handleSubmit}>
                {createField("Login", "login", [required, maxLength50], Input)}
                {createField("Password", "password", [required, maxLength50], Input, {type: "password"})}
                {createField("Password", "password", null, Input, {type: "checkbox"}, "remember me")}
                {error
                &&
                (<div className={s.formSummeryError}>{error}</div>)}
                <div>
                    <button>Login</button>
                </div>
            </form>
        </div>
    );
};

const LoginReduxForm = reduxForm({
    // a unique name for the form
    form: 'login'
})(LoginForm);

const Login = (props) => {
    const onSubmit = (formData) => {
        props.login(formData.login, formData.password, formData.rememberMe);
    }

    if (props.isAuth) {
        return <Redirect to='/profile'/>
    }
    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit}/>
        </div>
    );
};

let mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth
    }
}

let LoginContainer = connect(mapStateToProps, {login: loginThunkCreator, logout: logoutThunkCreator})(Login);

export default LoginContainer;