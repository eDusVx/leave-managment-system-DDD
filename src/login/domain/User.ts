import { Result, Ok, Err } from 'ts-results'
import { InvalidPropsException } from './exceptions/InvalidProps.exception'

export interface UserProps {
    registration: number
    password: string
    email: string
}

export type UserExceptions = InvalidPropsException
export class User {
    private registration: number
    private password: string
    private email: string

    constructor() {}

    public static create(
        props: UserProps,
    ): Result<User, InvalidPropsException> {
        try {
            const instance = new User()

            instance.setRegistration(props.registration)
            instance.setPassword(props.password)
            instance.setEmail(props.email)

            return Ok(instance)
        } catch (error) {
            if (error instanceof InvalidPropsException) {
                return Err(error)
            }
            throw error
        }
    }

    private setRegistration(registration: number) {
        if (!registration)
            throw new InvalidPropsException('Registration may be not null')
        if (registration < 0)
            throw new InvalidPropsException('Invalid registration number')
        this.registration = registration
        return Ok
    }

    private setPassword(password: string) {
        if (!password)
            throw new InvalidPropsException('Password may be not null')
        if (password.length < 5)
            throw new InvalidPropsException('Password is too short')
        this.password = password
        return Ok
    }

    private setEmail(email: string) {
        if (!email) throw new InvalidPropsException('Email may not be null')
        this.email = email
        return Ok
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
}
