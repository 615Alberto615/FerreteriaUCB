import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EquipoService {

  url = '/api';  // Asegúrate que esta URL es correcta y está accesible

  constructor(private http: HttpClient) { }

  // GET productos
  getProductos() {
    return this.http.get(this.url + '/productos');
  }

  // GET un producto
  getProducto(id: string) {
    return this.http.get(this.url + '/productos/' + id);
  }

  // POST un producto
  addProducto(producto: Producto) {
    return this.http.post(this.url + '/productos', producto);
  }

  // DELETE un producto
  // DELETE un producto
  deleteProducto(id: string) {
    console.log('Deleting product with id_inv: ', id);  // add this line
    return this.http.delete(`${this.url}/productos/${id}`);
  }
  


  // PUT un producto
  updateProducto(id: string, producto: Producto) {
    return this.http.put(this.url + '/productos/' + id, producto);
  }
}

export interface Producto {
  id_producto: string;
  nombre_producto: string;
  foto_producto: string;
  precio_producto: number;
}

