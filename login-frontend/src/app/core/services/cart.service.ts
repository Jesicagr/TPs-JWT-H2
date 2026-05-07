import { Injectable, signal, computed, inject } from '@angular/core';
import { StockService } from './stock.service';
import { Product } from '../../domain/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private stockService = inject(StockService);

  public cartItems = signal<Product[]>([]);

  public productosDisponiblesParaCompra = computed(() => {
    const catalogo = this.stockService.products();
    return catalogo.filter(producto => producto.stock > 0);
  });

  public totalCarrito = computed(() => {
    return this.cartItems().reduce((total, item) => total + item.price, 0);
  });

  agregarAlCarrito(producto: Product) {
    this.cartItems.update(items => [...items, producto]);
    // Sincronización Silenciosa
    this.stockService.reducirStock(producto.id, 1);
  }
}