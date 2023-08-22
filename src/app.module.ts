import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { LoginModule } from './login/login.module'
import { VacationsModule } from './vacations/vacations.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DataBaseConnection } from 'typeorm.config'
import { ConfigModule } from '@nestjs/config'
@Module({
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRoot(DataBaseConnection),
        LoginModule,
        VacationsModule,
    ],
    controllers: [AppController],
})
export class AppModule {}
