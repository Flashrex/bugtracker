import { Express } from "express";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcryptjs";
import expressSession from "express-session";
import userModel from "../users/model";
import { User } from "../misc/types";

const auth = (app: Express) => {
    app.use(expressSession({
        secret: "test",
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false, sameSite: "strict" }
    }));

    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser(function (user: User, done: Function) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id: number, done: Function) {
        userModel.getById(id)
            .then(user => {
                if (!user) {
                    done('User not found');
                }
                done(null, user);
            })
            .catch(error => {
                done(error);
            });
    });

    app.get("/login", (req, res) => {
        res.redirect("/");
    });

    passport.use("local-login", new LocalStrategy(
        (username: string, password: string, done: Function) => {

            userModel.get(username)
                .then(user => {
                    if (!user) {
                        return done(null, false, { message: "Incorrect username." });
                    }
                    bcrypt.compare(password, user.password, (error: Error | null, result: boolean) => {
                        if (error) {
                            return done(error);
                        }
                        if (!result) {
                            return done(null, false, { message: "Incorrect password." });
                        }
                        return done(null, user);
                    });
                })
                .catch(error => {
                    return done(error);
                });
        }
    ));

    app.post("/login", passport.authenticate("local-login", { failureRedirect: "/login" }), (req, res) => {
        const returnTo = (req.session as any).returnTo || '/';
        delete (req.session as any).returnTo;

        res.redirect(returnTo);
    });

    app.get("/register", (req, res) => {
        if (!req.user) res.redirect("/");
    });

    passport.use('local-signup', new LocalStrategy({ passReqToCallback: true },
        async (req: any, username: string, password: string, done: Function) => {
            userModel.get(username)
                .then(user => {
                    if (user) {
                        return done(null, false, { message: "Username is already taken." });
                    }
                })
                .catch(error => {
                    return done(error);
                });

            password = await bcrypt.hash(password, 10);

            const newUser = { username, password } as User;

            userModel.create(username, password)
                .then((newUserId) => {
                    newUser.id = newUserId.insertId;
                    return done(null, newUser);
                })
                .catch(error => {
                    return done(error);
                });
        }
    ));

    app.post("/register", passport.authenticate("local-signup", { successRedirect: "/", failureRedirect: "/" }));

    app.get("/logout", (req, res) => {
        req.logout(function (err) {
            if (err) {
                console.log(err);
            }
        });
        res.sendStatus(200);
    });
}

export default auth;