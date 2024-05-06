import axios from 'axios';

const API_URL = 'http://localhost:8000/api/';

class AuthService {
    register(userData) {
        return axios.post(API_URL + 'register/', userData, {
          headers: {
            'Content-Type': 'application/json'}}).then(response => {
              if (response.data) {
                localStorage.setItem('email-confirmed', response.data.data.email_confirmed);
              }
              return response.data; 
            }).catch(error => {
              console.error('Login failed:', error.response || error);
              throw error;  
            });
      }

    login(userData) {
      return axios.post(API_URL + 'login/', userData, {
        headers: { 'Content-Type': 'application/json' }
      }).then(response => {
        if (response.data.token) {
          localStorage.setItem('user-token', response.data.token);
        }
        return response.data;
      }).catch(error => {
        console.error('Login failed:', error.response || error);
        throw error;  
      });
    }

}

export default new AuthService();