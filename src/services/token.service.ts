import { AuthState } from 'MyModels';

class TokenService {
  getLocalRefreshToken() {
    const user = this.getUser();
    return user?.refreshToken;
  }

  getLocaltoken() {
    const user = this.getUser();
    return user?.token;
  }

  updateLocalRefreshToken(token: string) {
    const user = this.getUser();
    user.refreshToken = token;
    this.setUser(user);
  }

  updateLocaltoken(token: string) {
    const user = this.getUser();
    user.token = token;
    this.setUser(user);
  }

  getUser() {
    const userJson = localStorage.getItem('user');
    const user = userJson !== null ? JSON.parse(userJson) : [];
    return user;
  }

  setUser(user: AuthState) {
    console.log(JSON.stringify(user));
    localStorage.setItem('user', JSON.stringify(user));
  }

  removeUser() {
    localStorage.removeItem('user');
  }
}

export default new TokenService();
