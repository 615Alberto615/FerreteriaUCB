import { Component, OnInit } from '@angular/core';
import { EquipoService, Producto } from '../service/equipo.service';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})
export class InventarioComponent implements OnInit {
  products: Producto[] = [];
  newProduct: Producto = {id_producto: '', nombre_producto: '', foto_producto: '', precio_producto: 0};
  editMode = false;
  editIndex: number | null = null;

  constructor(private equipoService: EquipoService) { }

  ngOnInit() {
    this.listProducts();
  }

  listProducts() {
  this.equipoService.getProductos().subscribe(
    (response: any) => {
      this.products = response as Producto[];
      console.log(this.products);
    },
    error => {
      console.log(error);
    }
  );
}

  addProduct(event: Event) {
    event.preventDefault();
    if (this.newProduct.nombre_producto && this.newProduct.precio_producto && this.newProduct.foto_producto) {
      this.equipoService.addProducto(this.newProduct).subscribe(
        response => {
          this.newProduct = {id_producto: '', nombre_producto: '', foto_producto: '', precio_producto: 0};
          this.listProducts();  // Re-fetch the product list after adding a product
          console.log(response);
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  editProduct(index: number) {
    this.editMode = true;
    this.editIndex = index;
    this.newProduct = { ...this.products[index] };
  }

  updateProduct() {
    if (this.editIndex !== null) {
      this.equipoService.updateProducto(this.products[this.editIndex].id_producto, this.newProduct).subscribe(
        response => {
          if (this.editIndex !== null) {
            this.products[this.editIndex] = { ...this.newProduct };
          }
          this.newProduct = {id_producto: '', nombre_producto: '', foto_producto: '', precio_producto: 0};
          this.editMode = false;
          this.editIndex = null;
          console.log(response);
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  cancelEdit() {
    this.editMode = false;
    this.editIndex = null;
    this.newProduct = {id_producto: '', nombre_producto: '', foto_producto: '', precio_producto: 0};
  }

  deleteProduct(product: Producto) {
    const index = this.products.indexOf(product);
    if (index > -1) {
      if (product.id_producto) {
        this.equipoService.deleteProducto(product.id_producto).subscribe(
          response => {
            this.products.splice(index, 1);
            console.log(response);
          },
          error => {
            console.log(error);
          }
        );
      } else {
        console.log('Error: id_producto es undefined.');
      }
    }
  
  }
}
