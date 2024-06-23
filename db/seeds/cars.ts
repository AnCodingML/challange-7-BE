import { Knex } from "knex";
import axios from "axios";

export async function seed(knex: Knex): Promise<void> {
    // URL of the JSON data
    const url = 'https://raw.githubusercontent.com/fnurhidayat/probable-garbanzo/main/data/cars.min.json';

    try {
        // Fetch data from the URL
        const response = await axios.get(url);
        const data = response.data;

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
        console.error("Error fetching or inserting data:", error);
    }
};
