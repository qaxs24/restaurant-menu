import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatRadioModule } from '@angular/material/radio';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  imports: [
    CommonModule,
    RouterLink,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonToggleModule,
    MatRadioModule
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  cartService = inject(CartService);
  private fb = inject(FormBuilder);

  isSubmitting = signal(false);
  orderSubmitted = signal(false);
  orderNumber = signal('');

  orderForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    phone: ['', [Validators.required, Validators.pattern(/^\+?[\d\s-]{10,}$/)]],
    deliveryType: ['delivery'],
    address: [''],
    comment: [''],
    paymentMethod: ['cash']
  });

  getFinalTotal(): number {
    const subtotal = this.cartService.totalPrice();
    const isDelivery = this.orderForm.get('deliveryType')?.value === 'delivery';
    const deliveryFee = isDelivery && subtotal < 500 ? 50 : 0;
    return subtotal + deliveryFee;
  }

  submitOrder() {
    if (this.orderForm.get('deliveryType')?.value === 'delivery') {
      this.orderForm.get('address')?.setValidators([Validators.required]);
    } else {
      this.orderForm.get('address')?.clearValidators();
    }
    this.orderForm.get('address')?.updateValueAndValidity();

    if (this.orderForm.valid) {
      this.isSubmitting.set(true);

      setTimeout(() => {
        this.isSubmitting.set(false);
        this.orderSubmitted.set(true);
        this.orderNumber.set(Math.random().toString(36).substring(2, 8).toUpperCase());
        this.cartService.clearCart();
      }, 1500);
    } else {
      this.orderForm.markAllAsTouched();
    }
  }

  resetOrder() {
    this.orderSubmitted.set(false);
    this.orderForm.reset({
      deliveryType: 'delivery',
      paymentMethod: 'cash'
    });
  }
}

