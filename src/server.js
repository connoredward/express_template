import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";

import { port, mongo } from "./config";

import {
    getPostCont, 
    getPostSingCont, 
    createPostCont, 
    updatePostCont, 
    deletePostCont
} from './components/posts/posts.controller.js';

import {
    getAllCategoriesCont,
    getCategorySingCont,
    createCategoryCont,
    updateCategoryCont,
    deleteCatergoryCont
} from './components/category/category.controller.js';

import { 
    createUserCont, 
    authenticateCont,
    signOutCont
} from './components/users/user.controller.js';

import { withAuth } from "./components/auth";

const app = express();
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(fileUpload());
app.enable("trust proxy");
app.use(
    cors({
        credentials: true, 
        origin: [
            "https://x-x-git-master.cchaplain94.vercel.app", 
            "https://x-x-one.vercel.app", 
            "http://localhost:3000", 
            "http://127.0.0.1:3000",
            "http://localhost:3001", 
            "http://127.0.0.1:3001"
        ] 
    })
);

mongoose.connect(mongo.uri, { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false}, (err) => {
    if (err) {
        throw err;
    } else {
        console.log("Mongo database connected..");
    }
});

app.get("/checkToken", withAuth, (req, res) => { res.sendStatus(200); });

// POST ROUTERS
app.get(    '/getPost',        getPostCont);
app.get(    '/getPost/:id',    getPostSingCont);
app.post(   '/createPost',     createPostCont);
app.put(    '/updatePost',     updatePostCont);
app.delete( '/deletePost/:id', deletePostCont);

// CATEGORIES ROUTES
app.get(    '/getCategory',       getAllCategoriesCont);
app.get(    '/getCategory/:slug', getCategorySingCont);
app.post(   '/createCategory',    createCategoryCont);
app.put(    '/updateCategory',    updateCategoryCont);
app.delete( '/deleteCategory/:id',    deleteCatergoryCont);

// USER ROUTERS
app.post(   '/createUser',        createUserCont);
app.post(   '/authenticate',      authenticateCont);
app.get(    '/signOut',           signOutCont);


app.listen(port, () => console.log(
    `Example app listening on port ${port}!`
));
