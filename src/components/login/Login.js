import React from 'react';
import {reduxForm} from "redux-form";
import {connect} from "react-redux";
import {loginThunkCreator, logoutThunkCreator} from "../../redux/auth-reducer";
import {maxLength, required} from "../../utils/validators/validators";
import {createField, Input} from "../common/form-controls/form-control";
import {Redirect} from "react-router-dom";
import s from "../common/form-controls/form-control.module.css"

const maxLength50 = maxLength(50);

const LoginForm = ({handleSubmit, error, captcha}) => {
    //handle submit
    //e.preventDefault
    //get all data from form and put them into object
    //props.onSubmit(formData)
    return (
        <div>
            <form onSubmit={handleSubmit}>
                {createField("Login", "login", [required, maxLength50], Input)}
                {createField("Password", "password", [required, maxLength50], Input, {type: "password"})}
                {createField("RememberMe", "rememberMe", null, Input, {type: "checkbox"}, "remember me")}
                {error
                &&
                (<div className={s.formSummeryError}>{error}</div>)}
                <img src={captcha}/>
                {captcha && createField("Captcha", "captcha", [], Input)}
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
        props.login(formData.login, formData.password, formData.rememberMe, formData.captcha);
    }

    if (props.isAuth) {
        return <Redirect to='/profile'/>
    }
    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit} captcha={props.captcha}/>
        </div>
    );
};

let mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
        captcha: state.auth.captcha
    }
}

let LoginContainer = connect(mapStateToProps, {
    login: loginThunkCreator, logout: logoutThunkCreator
})(Login);

export default LoginContainer;