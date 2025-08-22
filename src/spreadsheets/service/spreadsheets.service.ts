import knex from "#postgres/knex.js";
import { Spreadsheets } from "#types/index.js";

export class spreadsheetsService {
    static async getSpreadsheets():Promise<Spreadsheets[] | null> {
        try {
            const spreadsheets:Spreadsheets[] = await knex('spreadsheets').select('spreadsheet_id');
            return spreadsheets;
        } catch (error) {
            console.log(error);
            return null
        }
    }
}