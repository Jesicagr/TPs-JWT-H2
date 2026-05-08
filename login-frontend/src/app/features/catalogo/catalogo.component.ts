import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StockService } from '../../core/services/stock.service'; 
import { WebsocketService } from '../../core/services/websocket.service';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './catalogo.component.html'
})
export class CatalogoComponent {
  public stockService = inject(StockService);
  public wsService = inject(WebsocketService);

  productos = this.stockService.productos; 

  comprar(prod: any) {
    this.wsService.sendMessage(`¡Alguien compró: ${prod.name}!`);
  }
}