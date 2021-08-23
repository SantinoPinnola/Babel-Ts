import express from 'express';
import handlebars from 'express-handlebars'
import path from 'path';
import rutaProductos from './routes/products.js'
import * as http from 'http';
import { initWsServer } from './services/socket';

const app = express();
const puerto = 8080;
const myServer = http.Server(app);
initWsServer(myServer);

const layoutsFolderPath = path.resolve(__dirname, '../views/layouts')
const partialsFolderPath = path.resolve(__dirname, '../views/partials');
const publicFolderPath = path.resolve(__dirname, '../public/');
app.use(express.static(publicFolderPath));

app.set('view engine', 'hbs');
app.engine('hbs', handlebars({
    extname: 'hbs',
    layoutsDir : layoutsFolderPath,
    partialsDir : partialsFolderPath 
}));


myServer.listen(puerto, () => console.log('Server up en puerto', puerto));

app.use('/', rutaProductos);





