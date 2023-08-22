import { Module } from '@nestjs/common'
import { LoginController } from './login.controller'
import { AuthentificationServiceImpl } from './infra/services/Authentification.service'
import { UseCases } from './application/usecases'
import { JwtModule } from '@nestjs/jwt'

@Module({
    imports: [JwtModule],
    controllers: [LoginController],
    providers: [
        {
            provide: 'AuthentificationService',
            useClass: AuthentificationServiceImpl,
        },
        ...UseCases,
    ],
})
export class LoginModule {}
