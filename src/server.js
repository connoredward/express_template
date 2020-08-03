import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";

import { port, mongo } from "./config";
import { handler, 
    getAllProjectsCont, createProjectCont,
    createUserCont, authenticateCont
} from "./controller.js";
import { withAuth } from "./components/auth";

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.enable("trust proxy");
app.use(cors({credentials: true, origin: ["https://x-x-git-master.cchaplain94.vercel.app", "http://localhost:3000"] }));

mongoose.connect(mongo.uri, { useUnifiedTopology: true,useNewUrlParser: true}, function(err) {
    if (err) {
        throw err;
    } else {
        console.log("Mongo database connected..");
    }
});

app.get("/getAllProjects", getAllProjectsCont);
app.post("/createProject", createProjectCont);

app.post("/createUser", createUserCont);
app.post("/authenticate", authenticateCont);

app.get("/secret", withAuth, (req, res) => {
    res.send("Password is potato");
});
app.get("/checkToken", withAuth, (req, res) => {
    res.sendStatus(200);
});
app.get("/signOut", (req, res) => {
    res.clearCookie("token");
    res.sendStatus(200);
})

app.listen(port, () => console.log(
    `Example app listening on port ${port}!`
));
