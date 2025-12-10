import { Injectable, signal, computed, effect } from '@angular/core';
import { MenuItem, CartItem } from '../models/menu-item.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly STORAGE_KEY = 'restaurant_cart';
  private cartItems = signal<CartItem[]>(this.loadFromStorage());

  constructor() {
    effect(() => {
      this.saveToStorage(this.cartItems());
    });
  }

  private loadFromStorage(): CartItem[] {
    if (typeof window === 'undefined') return [];
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }

  private saveToStorage(items: CartItem[]): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Ignore storage errors
    }
  }

  readonly items = this.cartItems.asReadonly();
  
  readonly totalItems = computed(() => 
    this.cartItems().reduce((sum, item) => sum + item.quantity, 0)
  );
  
  readonly totalPrice = computed(() => 
    this.cartItems().reduce((sum, item) => sum + item.price * item.quantity, 0)
  );

  addToCart(menuItem: MenuItem): void {
    const currentItems = this.cartItems();
    const existingItem = currentItems.find(item => item.id === menuItem.id);

    if (existingItem) {
      this.cartItems.set(
        currentItems.map(item =>
          item.id === menuItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      this.cartItems.set([...currentItems, { ...menuItem, quantity: 1 }]);
    }
  }

  removeFromCart(itemId: number): void {
    this.cartItems.set(this.cartItems().filter(item => item.id !== itemId));
  }

  updateQuantity(itemId: number, quantity: number): void {
    if (quantity <= 0) {
      this.removeFromCart(itemId);
      return;
    }

    this.cartItems.set(
      this.cartItems().map(item =>
        item.id === itemId ? { ...item, quantity } : item
      )
    );
  }

  incrementQuantity(itemId: number): void {
    const item = this.cartItems().find(i => i.id === itemId);
    if (item) {
      this.updateQuantity(itemId, item.quantity + 1);
    }
  }

  decrementQuantity(itemId: number): void {
    const item = this.cartItems().find(i => i.id === itemId);
    if (item) {
      this.updateQuantity(itemId, item.quantity - 1);
    }
  }

  clearCart(): void {
    this.cartItems.set([]);
  }
}
