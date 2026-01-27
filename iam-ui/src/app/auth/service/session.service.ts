import { Injectable } from '@angular/core';

// Definiamo le chiavi per evitare typo (magic strings)
export const USER_KEY = 'auth-user';
export const TOKEN_KEY = 'auth-token';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  /**
   * This service should be change with a more specific one which handle security.
   */

  constructor() { }

  clean(): void {
    window.sessionStorage.clear();
  }

  saveSession(data: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.removeItem(TOKEN_KEY);

    window.sessionStorage.setItem(TOKEN_KEY, data.token);

    const user = { email: data.user_email }; 
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }
    return null;
  }

  getToken(): string | null {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }

  isLoggedIn(): boolean {
    const user = window.sessionStorage.getItem(USER_KEY);
    return !!user;
  }
}
