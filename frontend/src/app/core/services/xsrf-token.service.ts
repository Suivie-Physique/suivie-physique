import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class XsrfTokenService {
    private readonly XSRF_TOKEN_KEY = 'XSRF_TOKEN';

    constructor() { }

    getXsrfToken(): string | null {
        return sessionStorage.getItem(this.XSRF_TOKEN_KEY);
    }

    setXsrfToken(token: string): void {
        sessionStorage.setItem(this.XSRF_TOKEN_KEY, token);
    }

    clearXsrfToken(): void {
        sessionStorage.removeItem(this.XSRF_TOKEN_KEY);
    }
}