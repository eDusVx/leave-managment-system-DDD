import { Result } from 'ts-results'
import { UserExceptions } from '../User'
import { ServiceException } from '../exceptions/Service.excpetion'

export interface UserServiceRequest {
    registration: number
    password: string
    email: string
}

export type AuthentificationServiceExcpetions =
    | ServiceException
    | UserExceptions

export interface AuthentificationService {
    login(
        user: UserServiceRequest,
    ): Promise<Result<string, AuthentificationServiceExcpetions>>
}
