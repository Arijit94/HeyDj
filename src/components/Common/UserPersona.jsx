import React, { Component } from "react";
import { Persona, PersonaSize, PersonaInitialsColor } from 'office-ui-fabric-react/lib/Persona';
import { Callout } from 'office-ui-fabric-react';
import Login from "./Login";
import AdminLogin from "./AdminLogin";
import EditProfile from "./EditProfile"

export default class UserPersona extends Component {
    constructor(props) {
        super(props);
        this._personaButtonElementRef = React.createRef();
        this.state = {
            isCalloutVisible: false,
            showLoginModal: false,
            showAdminLoginModal: false
        }
    }

    onDismiss = () => {
        this.setState({
            isCalloutVisible: !this.state.isCalloutVisible,
            showLoginModal: false,
            showAdminLoginModal: false
        });
    }

    onDismissFromProps = () => {
        this.setState({
            isCalloutVisible: false,
            showLoginModal: false,
            showAdminLoginModal: false
        });
    }

    showModals = (modalType) => {
        modalType === "AdminLogin" ?
            this.setState({
                isCalloutVisible: false,
                showLoginModal: false,
                showAdminLoginModal: true
            }) :
            modalType === "Login" ?
                this.setState({
                    isCalloutVisible: false,
                    showLoginModal: true,
                    showAdminLoginModal: false
                }) :
                this.setState({
                    isCalloutVisible: false,
                    showLoginModal: false,
                    showAdminLoginModal: false
                })
    }

    onLogout = () => {
        localStorage.clear();
        this.props.history.push('/');
    }

    render() {
        return (
            <React.Fragment>
                <span ref={ this._personaButtonElementRef } onClick={() => {this.onDismiss()}}>
                    <Persona
                        initialsColor={PersonaInitialsColor.coolGray}
                        size={PersonaSize.size32}
                        text={"User Name"}
                        hidePersonaDetails={true}
                    />
                </span>
                {this.state.isCalloutVisible && (
                    <Callout
                        target={this._personaButtonElementRef.current}
                        setInitialFocus
                        onDismiss={this.onDismiss}
                    >
                        <span role="list">
                            {localStorage.getItem("Id") ?
                                <React.Fragment>
                                    <span role="listitem">
                                        Edit Profile
                                    </span>
                                    <hr />
                                    <span role="listitem" onClick={this.onLogout}>
                                        Logout
                                    </span>
                                </React.Fragment>
                                :
                                <React.Fragment>
                                    <span role="listitem" onClick={() => { this.showModals("Login") }}>
                                        Login
                                    </span>
                                    <hr />
                                    <span role="listitem" onClick={() => { this.showModals("AdminLogin") }}>
                                        Admin Login
                                    </span>
                                </React.Fragment>
                            }
                        </span>
                    </Callout>
                )}
                <Login
                    showModal={this.state.showLoginModal}
                    dismissModalProps={() => { this.onDismissFromProps() }}
                    history={this.props.history}
                />
                <AdminLogin 
                    showModal={this.state.showAdminLoginModal}
                    dismissModalProps={() => { this.onDismissFromProps() }}
                    history={this.props.history}
                />
                <EditProfile history={this.props.history} />
            </React.Fragment>
        )
    }
}