export type Issue = {
    id: number;
    title: string;
    description: string;
    status: string;
    created_at: string;
    updated_at: string;
    created_by: User;
};

export type User = {
    id: number;
    username: string;
    email: string;
    password: string;
    created_at: string;
};