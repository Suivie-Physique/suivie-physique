export interface Token {
    header: {
        alg: string | null;
        typ: string | null;
    };
    payload: {
        sub: string | null;
        fullName: string | null;
        iat: number | null;
        exp: number | null;
        authorities: Array<string> | null;
    };
}