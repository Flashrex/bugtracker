export type Issue = {
    id: number;
    title: string;
    description: string;
    status: string;
    assigned_to: User;
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

export type Post = {
    id: number;
    content: string;
    created_at: string;
    author: User;
};

export type IssueData = {
    total: number;
    open: number;
    closed: number;
    in_progress: number;
    issues_this_month: number;
    issues_last_month: number;
    top_authors: [{ username: string, count: number }];
}