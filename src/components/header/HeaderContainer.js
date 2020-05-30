import React from 'react';
import Header from "./Header";
import {connect} from "react-redux";
import {authMeThunkCreator} from "../../redux/auth-reducer";

class HeaderApiComponent extends React.Component {

    render() {
        return (
            <Header {...this.props}/>
        );
    }
};

let mapStateToProps = (state) => {
    return {
        id: state.auth.id,
        email: state.auth.email,
        login: state.auth.login,
        isFetching: state.auth.isFetching,
        isAuth: state.auth.isAuth
    }
}

let HeaderContainer = connect(mapStateToProps, {authMe: authMeThunkCreator})(HeaderApiComponent);

export default HeaderContainer;