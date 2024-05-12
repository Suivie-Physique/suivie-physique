export interface Member {
        fullname: string | undefined;
        email: string | undefined;
        role: string | undefined;
        id?: number | undefined;
        status: string | undefined;
        enabled?: boolean | undefined;
        last_connected: string | undefined;
        createdDate?: string | undefined;
        authorities: string[] | undefined;
        actions: string | undefined;
}