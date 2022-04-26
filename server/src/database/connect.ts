import { createConnection, ConnectionOptions } from 'typeorm'
import dotenv from 'dotenv'

dotenv.config()

const config: ConnectionOptions = {
  type: 'postgres',
  host: process.env.HOST,
  port: 5432,
  username: process.env.USERNAME_DB,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  synchronize: true,
  entities: [
    'src/models/*.ts'
  ],
  migrations: [
    'src/database/migrations/*.ts'
  ],
  cli: {
    migrationsDir: 'src/database/migrations'
  }
}

createConnection(config).then(() => console.log('Conexão estabelecida'))
