import React, { Component } from 'react';
import UserList from './UserList';
import Search from './Search';
import ErrorComponent from '../sharedComponents/ErrorComponent';
import { dataServices } from '../../service/dataService';

class People extends Component {
    constructor(props) {
        super(props)
        this.state = {
            users: [],
            filterUsers: [],
            searchUsers: false,
            error: ''
        };
    }

    /* Getting all users from API response */

    componentDidMount() {
        dataServices.getUsers()
            .then(allUsers => {
                if (allUsers.error) {
                    this.setState({
                        error: allUsers.error
                    })
                } else {
                    this.setState({
                        users: allUsers
                    });
                }
            });

    }

    /* Search bar for users */

    handleChange = (event) => {
        let inputValue = event.target.value;
        let newUsers = this.state.users.filter((user) => `${user.name}`.toLowerCase().includes(inputValue.toLowerCase()))
        this.setState({
            filterUsers: newUsers,
            searchUsers: true
        })
    }


    checkSearchUsers = () => {
        if (this.state.searchUsers === true) {
            return this.state.filterUsers
        } else {
            return this.state.users
        }
    }

    render() {
        return <div className="ui grid">
            <div className="five wide column" />
            <div className="six wide column">
                <Search handleChange={this.handleChange} inputValue={this.state.inputValue} />
                <UserList myUsers={this.checkSearchUsers()} />
                <ErrorComponent errorMessage={this.state.error} />
            </div>
            <div className="five wide column"></div>
        </div>
    }


}


export default People;