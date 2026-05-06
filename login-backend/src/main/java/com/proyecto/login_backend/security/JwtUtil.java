package com.proyecto.login_backend.security;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtUtil {

    // Clave secreta para firmar el token
    private String secretKey = "ClaveSecretaParaElProyecto2026";

    // Tiempo de validez
    private long validityInMilliseconds = 3600000;

    // Método para crear el token
    public String generateToken(String username) {
        Date now = new Date();
        Date validity = new Date(now.getTime() + validityInMilliseconds);

        return Jwts.builder()
                .setSubject(username) 
                .setIssuedAt(now) 
                .setExpiration(validity) 
                .signWith(SignatureAlgorithm.HS256, secretKey) 
                .compact(); 
    }

    // Método para extraer el nombre de usuario del token
    public String getUsernameFromToken(String token) {
        return Jwts.parser()
                .setSigningKey(secretKey)
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    // Método para validar que el token sea auténtico
    public boolean validateToken(String token) {
        try {
            Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}