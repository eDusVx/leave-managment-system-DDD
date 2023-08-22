import { Result, Ok, Err } from 'ts-results'
import { ContractProps, Employee } from '../../domain/Employee'
import { InvalidPropsException } from 'src/vacations/domain/exceptions/InvalidProps.exception'
import { EmployeeRepository } from 'src/vacations/domain/repositories/Employee.repository'
import { Inject, Logger } from '@nestjs/common'

export interface EmployeeFormUseCaseRequest {
    registration: number
    name: string
    contract: ContractProps
    admissionDate: Date
    password: string
    email: string
    managerRistration?: number
    employeFunction: string
}

export type EmployeeFormExcpetions = InvalidPropsException | Error

export class EmployeeFormUseCase {
    private logger = new Logger('EmployeeFormUseCase')

    constructor(
        @Inject('EmployeeRepository')
        private readonly employeeRepository: EmployeeRepository,
    ) {}
    async execute(
        request: EmployeeFormUseCaseRequest,
    ): Promise<Result<string, EmployeeFormExcpetions>> {
        try {
            const employee = Employee.create({
                registration: request.registration,
                name: request.name,
                contract: request.contract,
                admissionDate: new Date(request.admissionDate),
                password: request.password,
                email: request.email,
                employeFunction: request.employeFunction,
            })
            if (employee.ok) {
                this.logger.debug(employee)
                const saveEmployee = await this.employeeRepository.saveEmployee(
                    employee.val,
                )
                if (saveEmployee.err) {
                    this.logger.error(saveEmployee.val)
                    throw Err(saveEmployee.val)
                }
            } else if (employee.err) {
                this.logger.error(
                    `${employee.val.name}: ${employee.val.message}`,
                )
                throw Err(`${employee.val.name}: ${employee.val.message}`)
            }
            return Ok(`Employee ${request.name} registred with success!`)
        } catch (e) {
            return e.val
        }
    }
}
