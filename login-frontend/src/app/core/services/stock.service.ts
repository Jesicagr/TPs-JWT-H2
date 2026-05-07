import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../../domain/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  private http = inject(HttpClient);

  // SIGNAL: lista de productos inicializada vacía
  public products = signal<Product[]>([]);

  constructor() {
    // Datos de prueba para que veas la magia sin esperar al backend
    this.products.set([
      { id: 1, name: 'Laptop Pro', price: 1200, stock: 3 },
      { id: 2, name: 'Mouse Gamer', price: 50, stock: 5 },
      { id: 3, name: 'Monitor 4K', price: 400, stock: 2 }
    ]);
  }

  // ACCIÓN: Trae los datos de Spring Boot y actualiza el Signal
  loadProducts() {
    this.http.get<Product[]>('http://localhost:8081/api/productos')
      .subscribe({
        next: (data) => {
          this.products.set(data);
          console.log('Stock sincronizado de forma silenciosa');
        },
        error: (err) => console.error('Error cargando stock', err)
      });
  }

  reducirStock(productId: number, cantidad: number) {
    this.products.update(currentProducts => 
      currentProducts.map(p => 
        p.id === productId ? { ...p, stock: p.stock - cantidad } : p
      )
    );
  }
}