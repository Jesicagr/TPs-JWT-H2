import { JwtResponseDTO } from '../dtos/auth.dto';
import { SesionUsuario } from '../../domain/models/auth.model';

export class AuthAdapter {
  static fromJson(json: JwtResponseDTO): SesionUsuario {
    return {
      tokenAcceso: json.token 
    };
  }
}