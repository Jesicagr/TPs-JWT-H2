import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; 
import { StockService } from '../../core/services/stock.service';
import { CartService } from '../../core/services/cart.service'; 
import { WebsocketService } from '../../core/services/websocket.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './catalogo.component.html'
})
export class CatalogoComponent {
  public stockService = inject(StockService);
  public cartService = inject(CartService); 
  public wsService = inject(WebsocketService);
  private authService = inject(AuthService);
  private router = inject(Router); 

  productos = this.stockService.productos;

  comprar(producto: any) {
    this.cartService.agregarAlCarrito(producto);
    
    if (this.authService.isLoggedIn()) {
      this.wsService.sendMessage(`¡Nueva compra: ${producto.name}!`);
      alert('¡Mensaje enviado al backend!');
    } else {
      if (confirm('Debes iniciar sesión para finalizar. ¿Ir al Login?')) {
        this.router.navigate(['/login']);
      }
    }
  }
} 