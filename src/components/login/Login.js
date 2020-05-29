import React from 'react';
import {Field, reduxForm} from "redux-form";
import {connect} from "react-redux";
import {loginThunkCreator} from "../../redux/auth-reducer";

const LoginForm = (props) => {
    //handle submit
    //e.preventDefault
    //get all data from form and put them into object
    //props.onSubmit(formData)
    return (
        <div>
            <form onSubmit={props.handleSubmit}>
                <div>
                    <Field placeholder={"Login"} component={"input"} name={"login"}/>
                </div>
                <div>
                    <Field placeholder={"Password"} component={"input"} name={"password"}/>
                </div>
                <div>
                    <Field type={"checkbox"} component={"input"} name={"rememberMe"}/> remember me
                </div>
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
        props.login(formData.login, formData.password, formData.rememberMe, null);
    }

    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit}/>
        </div>
    );
};

let mapStateToProps = (state) => {
    return {}
}

let LoginContainer = connect(mapStateToProps, {login: loginThunkCreator()})(Login);

export default LoginContainer;