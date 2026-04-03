package com.proyecto.login_backend.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.config.http.SessionCreationPolicy;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    // 1. Exponemos el AuthenticationManager para que el AuthController lo pueda usar
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
        return authConfig.getAuthenticationManager();
    }

    // 2. Configuramos cómo se leen las contraseñas.
    // Usamos texto plano para esta práctica, pero en un entorno real se usa BCrypt.
    @Bean
    public PasswordEncoder passwordEncoder() {
        return NoOpPasswordEncoder.getInstance();
    }

    // 3. Las reglas de las puertas del edificio
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable()) // Desactivamos CSRF porque usaremos JWT
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/auth/**").permitAll() // Puerta ABIERTA para poder iniciar sesión
                        .requestMatchers("/error").permitAll()
                        .requestMatchers("/h2-console/**").permitAll() // Puerta ABIERTA para ver la base de datos de prueba
                        .anyRequest().authenticated() // Para cualquier otra puerta, EXIGIR TOKEN
                )
                .sessionManagement(sess -> sess.sessionCreationPolicy(SessionCreationPolicy.STATELESS)); // Arquitectura sin estado

        // Esto permite que la consola de la base de datos H2 se muestre bien en el navegador
        http.headers(headers -> headers.frameOptions(frame -> frame.disable()));

        return http.build();
    }
    // 4. Cargamos el usuario en la base de datos H2 al iniciar el servidor
    @Bean
    public org.springframework.boot.CommandLineRunner initData(com.proyecto.login_backend.repository.UsuarioRepository repository) {
        return args -> {
            // Si la base de datos está vacía, creamos a nuestro usuario de prueba
            if (repository.findByUsername("admin").isEmpty()) {
                repository.save(new com.proyecto.login_backend.model.Usuario("admin", "1234"));
            }
        };
    }
}