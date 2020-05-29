import {Redirect} from "react-router-dom";
import React from "react";
import {connect} from "react-redux";

export const withAuthRedirect = (Component) => {

    class AuthWrapper extends React.Component {
        //WHYYYYYY?!!!! always login at first even if is Auth
        render() {
            if (!this.props.isAuth) {
                return <Redirect to={'/login'}/>
            }
            return <Component {...this.props}/>;
        }
    }

    let mapStateToPropsRedirect = (state) => {
        return {
            isAuth: state.auth.isAuth
        }
    }

    return connect(mapStateToPropsRedirect)(AuthWrapper);
}