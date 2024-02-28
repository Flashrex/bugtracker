export type Issue = {
    id: number;
    title: string;
    description: string;
    assigned_to: number;
    status: string;
    created_at: string;
    updated_at: string;
    created_by: number;
    team: number;
};

export type User = {
    id: number;
    username: string;
    email: string;
    password: string;
    created_at: string;
    team: number;
};

export type Team = {
    id: number;
    name: string;
    members: number[];
    created_by: number;
    created_at: string;
};

export type Post = {
    id: number;
    content: string;
    created_at: string;
    author: number;
    team: number;
};

export type IssueData = {
    total: number;
    open: number;
    closed: number;
    issues_this_month: number;
    issues_last_month: number;
    top_authors: [{ username: string, count: number }];
}