import model from "./model";
import { Post, User } from '../misc/types';
import logger from "../misc/logger";
import { Request, Response } from "express";
import userModel from "../users/model";

async function listPosts(req: Request, res: Response): Promise<void> {
    if (!req.user) {
        res.status(401).json({ error: "Unauthorized" });
        return;
    }

    const user = await userModel.getById((req.user as { id: number }).id);

    if (!user) {
        res.status(500).json({ error: "Error creating issue." });
        return;
    }

    model.getAll(user.team)
        .then(async posts => {
            const updatedPosts = await Promise.all(posts.map(async (post) => {
                const author = await userModel.getById(post.author);
                return { ...post, author: author };
            }));

            res.json({ posts: updatedPosts, user: user.id });
        })
        .catch(error => {
            logger.error("posts/listAction", `Error fetching posts: ${error}`);
            res.status(500).json({ error: "Error fetching posts" });
        });
}

function listSinglePost(req: Request, res: Response): void {
    model.get(parseInt(req.params.id))
        .then(async post => {
            res.json(post);
        })
        .catch(error => {
            logger.error("posts/getAction", `Error fetching post: ${error}`);
            res.status(500).json({ error: "Error fetching post" });
        });
}

function listFewPosts(req: Request, res: Response): void {
    model.getSome(parseInt(req.params.limit), parseInt(req.params.offset))
        .then(posts => res.json(posts))
        .catch(error => {
            logger.error("posts/getSomeAction", `Error fetching posts: ${error}`);
            res.status(500).json({ error: "Error fetching posts" });
        });
}

async function createPost(req: Request, res: Response): Promise<void> {

    if (!req.user) {
        res.status(401).json({ error: "Unauthorized" });
        return;
    }

    const user = await userModel.getById((req.user as { id: number }).id);

    if (!user) {
        res.status(500).json({ error: "Error creating issue." });
        return;
    }

    const post: Post = {
        id: 0,
        created_at: "",
        team: user.team,
        content: req.body.content as string,
        author: user.id
    };

    model.create(post)
        .then(result => res.json(result))
        .catch(error => {
            logger.error("posts/createAction", `Error creating post: ${error}`);
            res.status(500).json({ error: "Error creating post" });
        });
}

function updatePost(req: Request, res: Response): void {
    model.update(parseInt(req.params.id), req.body)
        .then(result => res.json(result))
        .catch(error => {
            logger.error("posts/updateAction", `Error updating post: ${error}`);
            res.status(500).json({ error: "Error updating post" });
        });
}

function deletePost(req: Request, res: Response): void {
    model.remove(parseInt(req.params.id))
        .then(result => res.json(result))
        .catch(error => {
            logger.error("posts/deleteAction", `Error deleting post: ${error}`);
            res.status(500).json({ error: "Error deleting post" });
        });
}

export {
    listPosts,
    listFewPosts,
    listSinglePost,
    createPost,
    updatePost,
    deletePost
};