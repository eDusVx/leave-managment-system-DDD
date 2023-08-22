import { ContractProps } from 'src/vacations/domain/Employee'
import { Entity, Column, PrimaryColumn } from 'typeorm'

@Entity()
export class EmployeeModel {
    @PrimaryColumn({ name: 'registration', nullable: false })
    public registration: number

    @Column({ name: 'name' })
    public name: string

    @Column({ name: 'contract' })
    public contract: ContractProps

    @Column({ name: 'admission_date' })
    public admissionDate: Date

    @Column({ name: 'password' })
    public password: string

    @Column({ name: 'email' })
    public email: string

    @Column({ name: 'employee_function' })
    public employeeFunction: string
}
