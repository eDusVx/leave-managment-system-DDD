import { Result, Ok, Err } from 'ts-results'
import { InvalidPropsException } from './exceptions/InvalidProps.exception'

export interface UserProps {
    registration: number
    name: string
    contract: ContractProps
    admissionDate: Date
    password: string
    email: string
    managerRistration?: number
    employeFunction: string
}

export enum ContractProps {
    CLT = 1,
    PJ = 2,
}

export type UserExceptions = InvalidPropsException
export class Employee {
    private registration: number
    private name: string
    private contract: ContractProps
    private admissionDate: Date
    private password: string
    private email: string
    private managerRegistration?: number
    private employeFunction: string

    public static create(
        props: UserProps,
    ): Result<Employee, InvalidPropsException> {
        const instance = new Employee()

        try {
            instance.setRegistration(props.registration)
            instance.setPassword(props.password)
            instance.setEmail(props.email)
            instance.setName(props.name)
            instance.setContract(props.contract)
            instance.setAdmissionDate(props.admissionDate)
            instance.setManagerRegistration(props.managerRistration)
            instance.setEmployeFunction(props.employeFunction)
        } catch (e) {
            return e
        }

        return Ok(instance)
    }

    private setEmployeFunction(employeFunction: string) {
        if (!employeFunction)
            throw Err(
                new InvalidPropsException('EmployeFunction may not be null'),
            )
        this.employeFunction = employeFunction
    }

    private setAdmissionDate(admissionDate: Date) {
        if (!admissionDate)
            throw Err(
                new InvalidPropsException('AdmissionDate may not be null'),
            )
        if (!(admissionDate instanceof Date))
            throw Err(new InvalidPropsException('Invalid AdmissionDate '))
        this.admissionDate = admissionDate
    }

    private setManagerRegistration(managerRegistration?: number) {
        if (managerRegistration && managerRegistration < 0)
            throw Err(new InvalidPropsException('Invalid registration number'))
        this.managerRegistration = managerRegistration
    }

    private setContract(contract: ContractProps) {
        if (!contract)
            throw Err(new InvalidPropsException('Contract may not be null'))
        if (contract != 1 && contract != 2)
            throw Err(new InvalidPropsException('Contract may not be null'))
        this.contract = contract
    }

    private setName(name: string) {
        if (!name) throw Err(new InvalidPropsException('Name may not be null'))
        this.name = name
    }

    private setRegistration(registration: number) {
        if (!registration)
            throw Err(new InvalidPropsException('Registration may not be null'))
        if (registration < 0)
            throw Err(new InvalidPropsException('Invalid registration number'))
        this.registration = registration
    }

    private setPassword(password: string) {
        if (!password)
            throw Err(new InvalidPropsException('Password may not be null'))
        if (password.length < 5)
            throw Err(new InvalidPropsException('Password is too short'))
        this.password = password
    }

    private setEmail(email: string) {
        if (!email)
            throw Err(new InvalidPropsException('Email may not be null'))
        this.email = email
    }

    public getRegistration() {
        return this.registration
    }

    public getEmail() {
        return this.email
    }

    public getPassword() {
        return this.password
    }

    public getName() {
        return this.name
    }

    public getContract() {
        return this.contract
    }

    public getAdmissionDate() {
        return this.admissionDate
    }

    public getManagerRegistration() {
        return this.managerRegistration
    }

    public getEmployeFunction() {
        return this.employeFunction
    }
}
