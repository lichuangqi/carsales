import { Table } from 'typeorm';
import type { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialSchema1789223778175 implements MigrationInterface {
  name = 'InitialSchema1789223778175';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          { name: 'email', type: 'varchar' },
          { name: 'password', type: 'varchar' },
          { name: 'admin', type: 'boolean', default: true },
        ],
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: 'report',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          { name: 'approved', type: 'boolean', default: false },
          { name: 'price', type: 'integer' },
          { name: 'make', type: 'varchar' },
          { name: 'model', type: 'varchar' },
          { name: 'year', type: 'integer' },
          { name: 'lng', type: 'integer' },
          { name: 'lat', type: 'integer' },
          { name: 'mileage', type: 'integer' },
          { name: 'userId', type: 'integer', isNullable: true },
        ],
        foreignKeys: [
          {
            columnNames: ['userId'],
            referencedTableName: 'user',
            referencedColumnNames: ['id'],
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('report');
    await queryRunner.dropTable('user');
  }
}
