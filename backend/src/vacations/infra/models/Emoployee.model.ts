import { ContractProps } from 'src/vacations/domain/Employee'
import { Entity, Column, PrimaryColumn } from 'typeorm'

@Entity()
export class EmployeeModel {
    @PrimaryColumn({ name: 'registration', nullable: false })
    public registration: number

    @Column({ name: 'name', nullable: false })
    public name: string

    @Column({ name: 'contract', nullable: false })
    public contract: ContractProps

    @Column({ name: 'admission_date', nullable: false })
    public admissionDate: Date

    @Column({ name: 'password', nullable: false })
    public password: string

    @Column({ name: 'email', nullable: false })
    public email: string

    @Column({ name: 'employee_function', nullable: false })
    public employeeFunction: string

    @Column({ name: 'manager_registration', nullable: true })
    public managerRistration: number
}
