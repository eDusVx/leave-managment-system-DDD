import { Err, Ok, Result } from 'ts-results'
import { Injectable } from '@nestjs/common'
import { EmployeeRepository } from 'src/vacations/domain/repositories/Employee.repository'
import { Employee } from 'src/vacations/domain/Employee'
import { RepositoryException } from 'src/vacations/domain/exceptions/Repository.exception'
import { EmployeeModel } from '../models/Emoployee.model'
import { EmployeeMapper } from '../mappers/Employee.mapper'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

@Injectable()
export class EmployeeRepositoryImpl implements EmployeeRepository {
    constructor(
        @InjectRepository(EmployeeModel)
        private readonly employeeModel: Repository<EmployeeModel>,
        private readonly employeeMapper: EmployeeMapper,
    ) {}
    async saveEmployee(
        employee: Employee,
    ): Promise<Result<any, RepositoryException>> {
        try {
            const employeeModelResult =
                await this.employeeMapper.domainToModel(employee)
            if (employeeModelResult.err) {
                throw Err(`${employeeModelResult.val.message}`)
            }
            if (employeeModelResult.ok) {
                await this.employeeModel.save(employeeModelResult.val)
            }

            return Ok('Employee saved successfully!')
        } catch (e) {
            return e
        }
    }
    async searchEmployee(
        registration: number,
    ): Promise<Result<Employee, RepositoryException>> {
        try {
            const employeeModel = await this.employeeModel.findOne({
                where: { registration: registration },
            })
            if (employeeModel == null)
                return Err(new RepositoryException('Employee doesnt exist'))

            const employeeDomain =
                this.employeeMapper.modelToDomain(employeeModel)

            return employeeDomain
        } catch (e) {
            return e
        }
    }
}
