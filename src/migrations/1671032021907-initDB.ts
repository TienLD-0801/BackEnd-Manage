import { MigrationInterface, QueryRunner } from 'typeorm';

export class initDB1671032021907 implements MigrationInterface {
  name = 'initDB1671032021907';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`user_name\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`gender\` enum ('N/A', 'Male', 'Female') NOT NULL DEFAULT 'N/A', \`avatar\` varchar(10000) NULL, UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`photos\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`url\` varchar(255) NOT NULL, \`comment\` varchar(255) NULL, \`user_id\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`comments\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`comment\` varchar(255) NULL, \`user_id\` int NOT NULL, \`photo_id\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`devices\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`device_name\` varchar(255) NULL, \`os\` enum ('N/A', 'iOS', 'Android') NOT NULL DEFAULT 'N/A', \`uuid\` varchar(255) NOT NULL, \`osVersion\` varchar(255) NOT NULL, \`manufacturer\` varchar(255) NOT NULL, \`status\` enum ('Available', 'Leased', 'Broken') NOT NULL DEFAULT 'Available', UNIQUE INDEX \`IDX_707b5b8b374103d40974e670d3\` (\`uuid\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`projects\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`project_code\` varchar(255) NOT NULL, \`project_name\` varchar(255) NOT NULL, \`project_description\` varchar(255) NOT NULL, \`startDate\` datetime NULL, \`endDate\` datetime NULL, UNIQUE INDEX \`IDX_11b19c7d40d07fc1a4e167995e\` (\`project_code\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`skills\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`skill_name\` varchar(255) NOT NULL, \`language\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_6c500b27556245e209296e8a3f\` (\`skill_name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`projects_skills\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`project_id\` int NOT NULL, \`skill_id\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`users_devices\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`rent_date\` datetime NOT NULL, \`return_date\` datetime NOT NULL, \`user_id\` int NOT NULL, \`device_id\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`photos\` ADD CONSTRAINT \`FK_c4404a2ee605249b508c623e68f\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE RESTRICT ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`comments\` ADD CONSTRAINT \`FK_4c675567d2a58f0b07cef09c13d\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE RESTRICT ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`comments\` ADD CONSTRAINT \`FK_0e5021e2518ea59f2efaf051500\` FOREIGN KEY (\`photo_id\`) REFERENCES \`photos\`(\`id\`) ON DELETE RESTRICT ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`projects_skills\` ADD CONSTRAINT \`FK_5e7257e7cd7d211aaee71c7691f\` FOREIGN KEY (\`project_id\`) REFERENCES \`projects\`(\`id\`) ON DELETE RESTRICT ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`projects_skills\` ADD CONSTRAINT \`FK_1935ee703881aedc750f9dbd0a0\` FOREIGN KEY (\`skill_id\`) REFERENCES \`skills\`(\`id\`) ON DELETE RESTRICT ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users_devices\` ADD CONSTRAINT \`FK_5c1e33b849f11ac223b6192d2df\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE RESTRICT ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users_devices\` ADD CONSTRAINT \`FK_7d3640c873c0cd3cfad4eb6de91\` FOREIGN KEY (\`device_id\`) REFERENCES \`devices\`(\`id\`) ON DELETE RESTRICT ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`users_devices\` DROP FOREIGN KEY \`FK_7d3640c873c0cd3cfad4eb6de91\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`users_devices\` DROP FOREIGN KEY \`FK_5c1e33b849f11ac223b6192d2df\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`projects_skills\` DROP FOREIGN KEY \`FK_1935ee703881aedc750f9dbd0a0\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`projects_skills\` DROP FOREIGN KEY \`FK_5e7257e7cd7d211aaee71c7691f\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`comments\` DROP FOREIGN KEY \`FK_0e5021e2518ea59f2efaf051500\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`comments\` DROP FOREIGN KEY \`FK_4c675567d2a58f0b07cef09c13d\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`photos\` DROP FOREIGN KEY \`FK_c4404a2ee605249b508c623e68f\``,
    );
    await queryRunner.query(`DROP TABLE \`users_devices\``);
    await queryRunner.query(`DROP TABLE \`projects_skills\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_6c500b27556245e209296e8a3f\` ON \`skills\``,
    );
    await queryRunner.query(`DROP TABLE \`skills\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_11b19c7d40d07fc1a4e167995e\` ON \`projects\``,
    );
    await queryRunner.query(`DROP TABLE \`projects\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_707b5b8b374103d40974e670d3\` ON \`devices\``,
    );
    await queryRunner.query(`DROP TABLE \`devices\``);
    await queryRunner.query(`DROP TABLE \`comments\``);
    await queryRunner.query(`DROP TABLE \`photos\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``,
    );
    await queryRunner.query(`DROP TABLE \`users\``);
  }
}
