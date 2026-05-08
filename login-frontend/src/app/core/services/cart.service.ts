import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CartService {
  public cartItems = signal<any[]>([]);
  agregarAlCarrito(producto: any) {
    this.cartItems.update(items => [...items, producto]);
  }
}