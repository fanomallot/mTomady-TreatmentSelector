import axios from 'axios';
import history from '../../history';


export const AUTH_LOGIN_REQUEST = 'AUTH_LOGIN_REQUEST';
export const AUTH_LOGIN_ERROR = 'AUTH_LOGIN_ERROR';
export const AUTH_LOGIN_SUCCESS = 'AUTH_LOGIN_SUCCESS';
export const AUTH_LOGOUT_SUCCESS = 'AUTH_LOGOUT_SUCCESS';
export const AUTH_UPDATE_SUCCESS = 'AUTH_UPDATE_SUCCESS';

export const authLoginRequest = () => ({
    type: AUTH_LOGIN_REQUEST
});

export const authLoginError = (error) => ({
    type: AUTH_LOGIN_ERROR,
    error
});

export const authLoginSuccess = (token, user) => ({
    type: AUTH_LOGIN_SUCCESS,
    token,
    user
});

export const authLogoutSuccess = () => ({
    type: AUTH_LOGOUT_SUCCESS
});

export const authUpdateSuccess = (user) => ({
    type: AUTH_UPDATE_SUCCESS,
    user: user
});

export const userLoginAttempt = ({ email, password }) => {
    return (dispatch) => {
        dispatch(authLoginRequest());
        return axios.post('/login', {
            email: email,
            password: password
        }).then(response => {
            // console.log(response.data)
            if (response.data.error === "Mot de passe ou email incorrect" || response.data.error ==="Invalid username or password" ) {
                
                
                const message = 'Invalid username or password';

                dispatch((authLoginError(message)))
            } else {
                const token = response.data.token;
                const user = response.data.user ? response.data.user : null;

                dispatch((authLoginSuccess(token, user)))
                history.push('/Admin-dashboard/patient-list');
                window.location.reload();
            }
        }).catch(error => {
            let status = null;

            if (error.response) {
                if (error.response.status) {
                    status = error.response.status;
                }
            }

            console.log('/auth/login[error]', error);
            
            let message = '';

            if (401 === status) {
                message = 'Utilisateur ou mot de passe incorrect';
            } else if (500 === status) {
                message = 'Une erreur est survenue. Réessayer à nouveau !';
            }
            
            dispatch((authLoginError(message)))
        })
    }
}


export const userUpdateAttempt = (user, values) => {
    return (dispatch) => {
        axios.put(`/users/${user.id}`, values)
        .then(response => {
            if (response.status === 200) {
                console.log(response.data)
                const { user } = response.data;
                console.log(user);
                dispatch(authUpdateSuccess(user));
            }
        })
    }
}


export const userLogoutAttempt = () => {
    return (dispatch) => {
        window.localStorage.removeItem('jwtToken');
        window.localStorage.removeItem('user');
        history.push('/');
        window.location.reload();
        return dispatch(authLogoutSuccess());
    }
    
}

export const AUTH_REFRESH_USER = 'AUTH_REFRESH_USER';

export const authRefreshUser = (user) => {
    return {
        type: AUTH_REFRESH_USER,
        user
    }
}