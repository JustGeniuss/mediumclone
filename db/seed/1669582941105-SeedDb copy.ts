import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedDb1669582941105 implements MigrationInterface {
  name = 'SeedDb1669582941105';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO tags (name) VALUES ('dragons'), ('coffee'), ('nestjs')`,
    );
    // password is 123
    await queryRunner.query(
      `INSERT INTO users (username, email, password) Values ('danila', 'danila@gmail.com', '$2b$10$HYfDMZeavjGcFm5S2VA6R.kqgCWBLm/d8hl5FKi/4PT7NlqJAdZ.O')`,
    );

    await queryRunner.query(
      `INSERT INTO articles (slug, title, description, body, "tagList", "authorId") VALUES ('first-article', 'FIRST-article', 'first article desc', 'first article body', 'coffee,dragons', 1)`,
    );

    await queryRunner.query(
      `INSERT INTO articles (slug, title, description, body, "tagList", "authorId") VALUES ('second-article', 'Second-article', 'second article desc', 'second article body', 'coffee,dragons', 1)`,
    );
  }

  public async down(): Promise<void> {
    
  }
}
