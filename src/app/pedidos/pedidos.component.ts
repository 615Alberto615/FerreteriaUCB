import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {
  orderForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.orderForm = this.fb.group({
      customerName: [''],
      customerEmail: [''],
      customerPhone: [''],
      productName: [''],
      quantity: ['']
    });
  }

  ngOnInit() {}

  submitForm() {
    const formValue = this.orderForm.value;
    Swal.fire({
      title: 'Datos del Pedido',
      html: `
        <b>Nombre:</b> ${formValue.customerName}<br/>
        <b>Correo:</b> ${formValue.customerEmail}<br/>
        <b>Celular:</b> ${formValue.customerPhone}<br/>
        <b>Producto:</b> ${formValue.productName}<br/>
        <b>Cantidad:</b> ${formValue.quantity}
      `,
      icon: 'success',
      customClass: {
        confirmButton: 'custom-confirm-button',
        icon: 'custom-icon'
      }
    });
  }
  
   
}
