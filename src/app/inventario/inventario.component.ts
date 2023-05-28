import { Component } from '@angular/core';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})
export class InventarioComponent {
  products: any[] = [
    { name: 'Tuercas y Tornillos', price: 5, image: '/assets/t1.png' },

  ];
  newProduct: any = {};
  editMode = false;
  editIndex: number | null = null;

  addProduct(event: Event) {
    event.preventDefault();
    if (this.newProduct.name && this.newProduct.price && this.newProduct.image) {
      this.products.push({ ...this.newProduct });
      this.newProduct = {};
    }
  }

  onFileSelected(event: Event) {
    const files = (event.target as HTMLInputElement).files;
    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = e => this.newProduct.image = reader.result ? reader.result.toString() : '';
      reader.readAsDataURL(file);
    }
  }

  editProduct(index: number) {
    this.editMode = true;
    this.editIndex = index;
    this.newProduct = { ...this.products[index] };
  }

  updateProduct() {
    if (this.editIndex !== null) {
      this.products[this.editIndex] = { ...this.newProduct };
    }
    this.newProduct = {};
    this.editMode = false;
    this.editIndex = null;
  }

  cancelEdit() {
    this.editMode = false;
    this.editIndex = null;
    this.newProduct = {};
  }

  deleteProduct(product: any) {
    const index = this.products.indexOf(product);
    if (index > -1) {
      this.products.splice(index, 1);
    }
  }
}
