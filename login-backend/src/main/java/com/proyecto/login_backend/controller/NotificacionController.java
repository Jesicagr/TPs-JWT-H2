package com.proyecto.login_backend.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class NotificacionController {

    @MessageMapping("/nueva-compra")
    @SendTo("/topic/notificaciones")
    public String notificarCompra(String mensaje) {
        return "Notificación del Broker: " + mensaje;
    }
}