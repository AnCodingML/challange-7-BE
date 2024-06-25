import { Knex } from "knex";
import fs from "fs";
import path from "path";

export async function seed(knex: Knex): Promise<void> {
    // Path to the JSON file
    const filePath = path.resolve(__dirname, '../../app/public/json/seedCar.json');

    try {
        // Read the JSON file
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const data = JSON.parse(fileContent);

        // Ensure data is in the format you expect
        // Assuming the data is an array of objects
        if (!Array.isArray(data)) {
            throw new Error("Invalid data format: Expected an array");
        }

        // Deletes ALL existing entries
        await knex("cars").del();

        // Inserts seed entries
        await knex("cars").insert(data);
    } catch (error) {
        console.error("Error reading or inserting data:", error);
    }
}
