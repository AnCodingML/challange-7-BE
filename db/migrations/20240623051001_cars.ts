import type { Knex } from "knex";
import { onUpgradeTrigger } from "../helper/knex.helper";

export async function up(knex: Knex): Promise<void> {
   return knex.schema.createTable('cars', (table: Knex.TableBuilder) => {
      table.increments('id').primary();
      table.string('plate', 255).notNullable();
      table.string('manufacture',255).nullable();
      table.string('model',255).nullable();
      table.string('image',255).nullable();
      table.integer('rent_per_day',255).nullable();
      table.integer('capacity',255).nullable();
      table.text('description').nullable();
      table.string('transmission',255).nullable();
      table.string('type',255).nullable();
      table.integer('year',255).nullable();
      table.string('features').nullable();
      table.string('available_at',255).nullable();
      table.string("created_by", 255);
      table.string("updated_by", 255);
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
   }).then(() => {
      return knex.raw(onUpgradeTrigger("cars"))
   })
}


export async function down(knex: Knex): Promise<void> {
   return knex.schema.dropTable('cars')
}

