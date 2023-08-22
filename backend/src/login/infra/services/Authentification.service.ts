import { Result, Ok } from 'ts-results'
import {
    AuthentificationService,
    AuthentificationServiceExcpetions,
    UserServiceRequest,
} from 'src/login/domain/services/Authentification.service'
import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { ServiceException } from 'src/login/domain/exceptions/Service.excpetion'

@Injectable()
export class AuthentificationServiceImpl implements AuthentificationService {
    constructor(private readonly jwtService: JwtService) {}

    async login(
        user: UserServiceRequest,
    ): Promise<Result<string, AuthentificationServiceExcpetions>> {
        try {
            const payload = {
                registration: user.registration,
                password: user.password,
                email: user.email,
            }
            const token = this.jwtService.sign(payload)

            return Ok(token)
        } catch (error) {
            throw new ServiceException('Login error')
        }
    }
}
