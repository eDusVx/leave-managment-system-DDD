import { Result } from 'ts-results'
import { Employee } from '../Employee'
import { RepositoryException } from '../exceptions/Repository.exception'
import { InvalidPropsException } from '../exceptions/InvalidProps.exception'

export type EmployeeRepositoryExcpetions =
    | RepositoryException
    | InvalidPropsException
export interface EmployeeRepository {
    saveEmployee(
        employee: Employee,
    ): Promise<Result<void, EmployeeRepositoryExcpetions>>
    searchEmployee(
        registration: number,
    ): Promise<Result<Employee, EmployeeRepositoryExcpetions>>
}
