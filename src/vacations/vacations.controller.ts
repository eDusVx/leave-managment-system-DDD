import { Controller, Get, Body } from '@nestjs/common'
import {
    EmployeeFormUseCase,
    EmployeeFormUseCaseRequest,
} from './application/usecases/EmployeeForm.usecase'

@Controller('leaves')
export class VacationsController {
    constructor(private readonly employeeFormUseCase: EmployeeFormUseCase) {}

    @Get('employee-registration')
    async createLeave(@Body() request: EmployeeFormUseCaseRequest) {
        try {
            const response = await this.employeeFormUseCase.execute(request)
            return response
        } catch (e) {
            return { error: `${e.val}` }
        }
    }
}
