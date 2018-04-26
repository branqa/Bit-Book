
class SessionService {

    makeHeader = () => {
        let stringUser = sessionStorage.getItem('user');
        let objUser = JSON.parse(stringUser);
        let sessionId = objUser.sessionId;
        let headers = {
            'Content-Type': 'application/json',
            'Key': '516AE7C',
            'SessionId': sessionId
        }
        return headers;
    }
}

export const sessionService = new SessionService();