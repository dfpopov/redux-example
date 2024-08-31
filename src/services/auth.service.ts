import http from './http';
import TokenService from './token.service';
///////////////// ajeitar /////////
class AuthService {
  async login(email: string, password: string) {
    return http
      .post('/api/signin', {
        email,
        password
      })
      .then((response) => {
        if (response.data.token) {
          TokenService.setUser(response.data);
        }

        return response.data;
      });
  }

  logout() {
    TokenService.removeUser();
  }

  async register(name: string, email: string, password: string) {
    return http
      .post('/api/signup', {
        name,
        email,
        password
      })
      .then((response) => {
        return response.data;
      });
  }

  async signOut() {
    const refreshToken = TokenService.getLocalRefreshToken();
    return http
      .post('/api/signout', { token: refreshToken })
      .then((response) => {
        this.logout();
        return response.data;
      });
  }
}

export default new AuthService();
