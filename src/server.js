import express from 'express';
import {port} from './config';

import { handler } from './controller.js'

const app = express();

app.get('/', handler);

app.listen(port, () => console.log(
    `Example app listening on port ${port}!`
));
