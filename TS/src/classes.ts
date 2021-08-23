
export default class Productos {
    arrayProductos: Array<any>;
    id: number;
  
    constructor(products = []) {
      this.arrayProductos = products;
      this.id = this.arrayProductos.length;
    }
   

    async guardar(data) {
        try {
            if (typeof data.title !== 'string') throw new Error('Titulo tiene que ser string');
            if (isNaN(data.price)) throw new Error('Price tiene que ser un nro');
            if (typeof data.thumbnail !== 'string') throw new Error('Thumbnail tiene que ser string de url'); 

            let productoNuevo = {
                title: data.title,
                price: data.price,
                thumbnail: data.thumbnail,
                id: this.arrayProductos.length + 1,
            }

            this.arrayProductos.push(productoNuevo);
  
        } catch (error) {
                  console.log('ERROR: No se pudo agregar un producto. ' + error.message);
            }
      
    }

    getProducto(idBrowse : number ) {
        return this.arrayProductos.find(element => element.id == idBrowse);
    }

    leer() {
        return this.arrayProductos ;
    }

    delete(idDel) {
        this.arrayProductos = this.arrayProductos.filter((element) => element.id != idDel);
    }
}


 