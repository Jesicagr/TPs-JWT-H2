package com.proyecto.login_backend.controllers

import org.springframework.messaging.handler.annotation.MessageMapping
import org.springframework.messaging.handler.annotation.SendTo
import org.springframework.stereotype.Controller

@Controller
class WebSocketController {
    @MessageMapping("/nueva-compra")
    @SendTo("/topic/notificaciones")
    fun recibirYEnviar(mensaje: String?): String? {
        println("Mensaje recibido: " + mensaje)
        return mensaje
    }
}