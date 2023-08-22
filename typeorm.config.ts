import { TypeOrmModuleOptions } from '@nestjs/typeorm'

export const DataBaseConnection: TypeOrmModuleOptions = {
    type: `sqlite`,
    database: 'db.sqlite',
    entities: ['dist/**/*.model{.ts,.js}'],
    synchronize: true,
}
