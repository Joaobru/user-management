import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class User1606633278165 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'users',
      columns: [
        {
          name: 'id',
          type: 'int',
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment'
        },
        {
          name: 'nome',
          type: 'varchar'
        },
        {
          name: 'idade',
          type: 'int'
        },
        {
          name: 'estadoCivil',
          type: 'varchar'
        },
        {
          name: 'cpf',
          type: 'varchar',
          isUnique: true
        },
        {
          name: 'cidade',
          type: 'varchar'
        },
        {
          name: 'estado',
          type: 'varchar'
        }
      ]
    }))
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users')
  }
}
