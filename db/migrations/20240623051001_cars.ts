import type { Knex } from "knex";
import { onUpgradeTrigger } from "../helper/knex.helper";

export async function up(knex: Knex): Promise<void> {
   return knex.schema.createTable('cars', (table: Knex.TableBuilder) => {
      table.uuid('id').primary(); // UUID type for id
      table.string('plate').notNullable();
      table.string('manufacture').notNullable();
      table.string('model').notNullable();
      table.string('image');
      table.integer('rentPerDay').notNullable();
      table.integer('capacity').notNullable();
      table.text('description');
      table.timestamp('availableAt');
      table.string('transmission').notNullable();
      table.boolean('available').notNullable();
      table.string('type').notNullable();
      table.integer('year').notNullable();
      table.specificType('options', 'text ARRAY');
      table.specificType('specs', 'text ARRAY');
      table.string("created_by", 255);
      table.string("updated_by", 255);
   }).then(() => {
      return knex.raw(onUpgradeTrigger("cars"))
   })
}


export async function down(knex: Knex): Promise<void> {
   return knex.schema.dropTable('cars')
}

