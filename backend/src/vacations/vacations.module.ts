import { Module } from '@nestjs/common'
import { UseCases } from './application/usecases'
import { VacationsController } from './vacations.controller'
import { EmployeeRepositoryImpl } from './infra/repositories/Employee.repository'
import { TypeOrmModule } from '@nestjs/typeorm'
import { EmployeeModel } from './infra/models/Emoployee.model'
import { Mappers } from './infra/mappers'

@Module({
    imports: [TypeOrmModule.forFeature([EmployeeModel])],
    controllers: [VacationsController],
    providers: [
        {
            provide: 'EmployeeRepository',
            useClass: EmployeeRepositoryImpl,
        },
        ...UseCases,
        ...Mappers,
    ],
})
export class VacationsModule {}
