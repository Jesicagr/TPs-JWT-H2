import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StockService } from '../../core/services/stock.service';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './catalogo.component.html',
  styleUrl: './catalogo.component.css'
})
export class CatalogoComponent {
  public stockService = inject(StockService);
  public cartService = inject(CartService);

  comprar(producto: any) {
    this.cartService.agregarAlCarrito(producto);
  }
}