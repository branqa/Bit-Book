import { dataServices } from './dataService';

class AuthService {

    userLogin = (data) => {
        return dataServices.login(data)
            .then((result) => {
                if(result.error) {
                    return result;
                } else {
                sessionStorage.setItem('user', JSON.stringify(result)); 
                dataServices.getProfile()
                .then((user) =>{
                sessionStorage.setItem('userId', JSON.stringify(user));
            })
            return result;
        }
        })
    }

    userLogout = () => {
        sessionStorage.clear();
        window.location.assign('/login');
    }

    userRegister = (data) => {
        return dataServices.register(data)
            .then((result) => {
                if(result.error) {
                    return result;
                } else {
                sessionStorage.setItem('user', JSON.stringify(result));
                }
            })
    }

    isLoggedIn = () => {
        if (sessionStorage.getItem('user')) {
            let stringUser = sessionStorage.getItem('user');
            let objUser = JSON.parse(stringUser);
            if (objUser.sessionId) {
               return true;
            } else {
                return false;
            }
        }
    }

}

export const authService = new AuthService();