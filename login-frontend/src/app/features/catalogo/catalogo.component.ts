import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StockService } from '../../core/services/stock.service';
import { CartService } from '../../core/services/cart.service';
import { WebsocketService } from '../../core/services/websocket.service';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './catalogo.component.html'
})
export class CatalogoComponent implements OnInit {
  private stockService = inject(StockService);
  private cartService = inject(CartService);
  private wsService = inject(WebsocketService);

  productos = this.stockService.productos;

  ngOnInit() {
    // Escucha los mensajes del Broker de Java
    this.wsService.getMessages().subscribe(msg => {
      console.log('Mensaje recibido:', msg);
    });
  }

  comprar(producto: any) {
    this.cartService.agregarAlCarrito(producto);
    // Aviso al backend que hubo una compra
    this.wsService.sendMessage(`¡Alguien acaba de comprar: ${producto.name}!`);
  }
}