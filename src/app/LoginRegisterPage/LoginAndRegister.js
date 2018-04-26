import React from 'react';
import { Tab, Container, Grid, Segment, Form, Button } from 'semantic-ui-react';
import { authService } from '../../service/authenticationService';
import ErrorComponent from '../sharedComponents/ErrorComponent';





class LoginAndRegister extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loginUsername: '',
            loginPassword: '',
            registerEmail: '',
            registerPassword: '',
            registerUsername: '',
            errorUsernameLog: '',
            errorPasswordLog: '',
            errorRegUsername: '',
            errorRegEmail: '',
            errorRegPassword: '',
            errorLogBtn: '',
            errorRegBtn: '',
            error: ''

        }
    }

    /* Login validation input for username */

    usernameLoginChange = (event) => {
        this.setState({
            errorLogBtn: '',
            loginUsername: event.target.value,
            errorUsernameLog: ''
        })
        this.usernameLogValidation(event.target.value);
    }

    usernameLogValidation = (username) => {
        if (username.length > 23) {
            this.setState({
                errorUsernameLog: 'Username is too long!'
            })

        } else if (username == '') {
            this.setState({
                errorUsernameLog: 'Username is missing!'
            })
        } else {
            return true;
        }
    }

    /* Validation input for password */

    passwordLoginChange = (event) => {
        this.setState({
            errorLogBtn: '',
            loginPassword: event.target.value,
            errorPasswordLog: ''
        })
        this.passwordLogValidation(event.target.value);
    }

    passwordLogValidation = (pass) => {
        if (pass.length > 23) {
            this.setState({
                errorPasswordLog: 'Password is too long'
            })
        } else if (pass == '') {
            this.setState({
                errorPasswordLog: 'Password is missing!'
            })
        } else {
            return true;
        }
    }

    /* Click on button login  */

    handlerLogin = (event) => {
        let user = {
            "username": this.state.loginUsername,
            "password": this.state.loginPassword
        }
        if (this.usernameLogValidation(this.state.loginUsername) && this.passwordLogValidation(this.state.loginPassword)) {
            authService.userLogin(user)
                .then((response) => {
                    if (response.error) {
                        this.setState({
                            errorLogBtn: response.error,
                            loginUsername: '',
                            loginPassword: ''
                        })
                    } else {
                        window.location.assign('/');
                    }
                })
        }

    }

    /* Register validation input for username */


    usernameRegisterChange = (event) => {
        this.setState({
            registerUsername: event.target.value,
            errorRegUsername: ''
        })
        this.usernameRegValidation(event.target.value);
    }

    usernameRegValidation = (username) => {
        if (username.length > 23) {
            this.setState({
                errorRegUsername: 'Username is too long!'
            })

        } else if (username === '') {
            this.setState({
                errorRegUsername: 'Username is missing!'
            })
        } else {
            return true;
        }
    }

    /* Register validation input for email */

    emailRegisterChange = (event) => {
        this.setState({
            registerEmail: event.target.value,
            errorRegEmail: '',
        })
        this.emailRegValidation(event.target.value);
    }

    emailRegValidation = (email) => {
        var mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (email.match(mailFormat)) {
            return true;
        } else if (email === '') {
            this.setState({
                errorRegEmail: 'Email is missing!'
            })
        }
    }


    /* Register validation input for password */

    passwordRegisterChange = (event) => {
        this.setState({
            registerPassword: event.target.value,
            errorRegPassword: '',
        })
        this.passwordRegValidation(event.target.value);
    }


    passwordRegValidation = (pass) => {
        if (pass.length > 23) {
            this.setState({
                errorRegPassword: 'Password is too long'
            })
        } else if (pass.length === 0){
            this.setState({
                errorRegPassword: 'Password is missing'
            })
        } else {
            return true;
        }
    }


    /* Click on button register  */

    handlerRegister = (event) => {
        let user = {
            "username": this.state.registerUsername,
            "password": this.state.registerPassword,
            "name": this.state.registerUsername,
            "email": this.state.registerEmail
        }
        if (this.usernameRegValidation(this.state.registerUsername) && this.emailRegValidation(this.state.registerEmail) && this.passwordRegValidation(this.state.registerPassword)) {
            authService.userRegister(user)
            .then((response) => {
                if (response.error) {
                    this.setState({
                        errorRegBtn: response.error,
                        registerUsername: '',
                        registerPassword: '',
                        registerEmail: ''
                    })
                } else {
                    window.location.assign('/login');
                }
            })
        }
    }


    /* Tab for login  */

    login = () => {
        return (
            <Form>
                <Form.Field>

                    <label>username</label>
                    <input type='text' onChange={this.usernameLoginChange} placeholder='Username' value={this.state.loginUsername}/><br />
                    <div>{this.state.errorUsernameLog}</div>
                </Form.Field>
                <Form.Field>
                    <label>pass</label>
                    <input type='password' onChange={this.passwordLoginChange} placeholder='Password' value={this.state.loginPassword} /><br />
                    <div>{this.state.errorPasswordLog}</div>

                </Form.Field>
                <Button onClick={this.handlerLogin}>Login</Button>

            </Form>
        )
    }


    /* Click on button register  */

    register = () => {
        return (
            <Form>
                <Form.Field>
                    <label>username</label>
                    <input type='text' onChange={this.usernameRegisterChange} placeholder='Full Name' /><br />
                    <div>{this.state.errorRegUsername}</div>
                </Form.Field>
                <Form.Field>
                    <label>email</label>
                    <input type='email' onChange={this.emailRegisterChange} placeholder='Email Address' /><br />
                    <div>{this.state.errorRegEmail}</div>
                </Form.Field>
                <Form.Field>
                    <label>pass</label>
                    <input type='password' onChange={this.passwordRegisterChange} placeholder='Min 6 characters' /><br />
                    <div>{this.state.errorRegPassword}</div>
                </Form.Field>
                <Button onClick={this.handlerRegister}>Register</Button>
            </Form>
        )
    }

    render() {

        return (
            <React.Fragment>
                <Grid id='main' stackable columns={4} >
                    <Grid.Column  width={1} ></Grid.Column>
                    <Grid.Column  computer={7} tablet={14}  className='welcome-container'>
                        <div id='login'>
                            <h1>Welcome to Bitbook</h1><br />
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
                        </div>

                    </Grid.Column>
                    <Grid.Column  computer={5} tablet={14} className='tabs' >
                        <div id='tabs'>
                            <Tab panes={[{ menuItem: 'Login', render: () => <Tab.Pane attached={false}>{this.login()}  </Tab.Pane> },
                            { menuItem: 'Register', render: () => <Tab.Pane attached={false}>{this.register()}</Tab.Pane> }]} menu={{ pointing: true }} />
                            <div className={this.state.errorLogBtn ? 'error-login' : 'invisible'} > {this.state.errorLogBtn} </div>
                            <div className={this.state.errorRegBtn ? 'error-login' : 'invisible'} > {this.state.errorRegBtn} </div>
                        </div>




                    </Grid.Column>
                    <Grid.Column  width={1} ></Grid.Column>
                </Grid>
            </React.Fragment>
        )
    }

}



export default LoginAndRegister;





