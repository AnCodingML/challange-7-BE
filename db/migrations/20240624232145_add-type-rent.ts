import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('cars', (table: Knex.TableBuilder) => {
    table.string("type_rent", 255).defaultTo("With Driver");
  });

  // Update the new column with random values
  await knex.raw(`
    UPDATE cars
    SET type_rent = CASE
      WHEN random() < 0.5 THEN 'With Driver'
      ELSE 'Self Drive'
    END;
  `);
  // Mengaktifkan kembali trigger
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable('cars', (table: Knex.TableBuilder) => {
    table.dropColumn("type_rent");
  });
}
