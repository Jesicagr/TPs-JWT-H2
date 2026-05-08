import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class StockService {
  public productos = signal<any[]>([
    { id: 1, name: 'Teclado Mecánico', price: 5500 },
    { id: 2, name: 'Mouse Gamer', price: 3200 },
    { id: 3, name: 'Monitor 24"', price: 45000 }
  ]);
}