import { Server } from 'socket.io';
import Productos from '../classes'
import { formatMessages } from '../utils/messages';
import fs from 'fs';


export const initWsServer = (app) => {
    const myWSServer = new Server(app);
    const NuevosProductos = new Productos;
    let messages = [];
    

    myWSServer.on('connection', function (socket) {
        console.log('\n\nUn cliente se ha conectado');
    
        socket.on('inicio-productos', () => {
            console.log('inicio lista de productos productos');
            let productos : Array<object> = NuevosProductos.leer();
            console.log(productos);
            if (productos.length != undefined) {
                socket.emit('producto-update', productos);
             }
         });
    
        socket.on('producto-nuevo', products => {
            console.log('nuevo producto');
            NuevosProductos.guardar(products);
            myWSServer.emit('producto-update', [products]);
        })

        socket.on('askData', (data) => {
            console.log('ME LLEGO DATA');
            if (messages.length > 0) {
                socket.emit('messages', messages);
            }
        });
         

        socket.on('new-message', function (data) {
            const newMsg = formatMessages(data);
            console.log(newMsg)
            messages.push(newMsg);
            let msgString = JSON.stringify(newMsg)
            fs.appendFileSync('./history/chat.txt', `${msgString}\n` );
            console.log(messages);
             myWSServer.emit('messages', [newMsg]);
          });
        
    })

    
    
    return myWSServer;
}

