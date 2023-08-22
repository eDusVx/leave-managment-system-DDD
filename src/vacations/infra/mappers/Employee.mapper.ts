import { Injectable } from '@nestjs/common'
import { EmployeeModel } from '../models/Emoployee.model'
import { Err, Ok, Result } from 'ts-results'
import { Employee } from 'src/vacations/domain/Employee'
import { InvalidPropsException } from 'src/login/domain/exceptions/InvalidProps.exception'
import { RepositoryException } from 'src/vacations/domain/exceptions/Repository.exception'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

@Injectable()
export class EmployeeMapper {
    constructor(
        @InjectRepository(EmployeeModel)
        private readonly employeeModel: Repository<EmployeeModel>,
    ) {}
    modelToDomain(
        employeeModel: EmployeeModel,
    ): Result<Employee, RepositoryException> {
        try {
            const employeeDomain = Employee.create({
                registration: employeeModel.registration,
                name: employeeModel.name,
                contract: employeeModel.contract,
                admissionDate: employeeModel.admissionDate,
                password: employeeModel.password,
                email: employeeModel.email,
                employeFunction: employeeModel.employeeFunction,
            })
            return employeeDomain
        } catch (e) {
            return Err(new InvalidPropsException('Error in domain object'))
        }
    }

    async domainToModel(
        employee: Employee,
    ): Promise<Result<EmployeeModel, RepositoryException>> {
        try {
            const existingEmployee = await this.employeeModel.findOne({
                where: { registration: employee.getRegistration() },
            })

            if (existingEmployee) {
                throw Err(
                    new RepositoryException(
                        `Employee: ${employee.getRegistration()} already exists!`,
                    ),
                )
            }

            const employeeModel = this.employeeModel.create({
                registration: employee.getRegistration(),
                name: employee.getName(),
                contract: employee.getContract(),
                admissionDate: employee.getAdmissionDate(),
                password: employee.getPassword(),
                email: employee.getEmail(),
                employeeFunction: employee.getEmployeFunction(),
            })

            return Ok(employeeModel)
        } catch (e) {
            return e
        }
    }
}
