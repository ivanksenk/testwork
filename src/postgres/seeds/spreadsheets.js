/**
 * @param {import("knex").Knex} knex
 * @returns {Promise<void>}
 */
export async function seed(knex) {
    await knex("spreadsheets")
        .insert([{ spreadsheet_id: "10mtrhm_c-7jOxVXQo2IhhlNEQcxb2rtZ7qxRLp0eKBc" }, { spreadsheet_id: "1w7RZpAgwz7FjiSkptMRV9Vr2e1WQdAGgMf3TqBSQHXU" }, { spreadsheet_id: "16zOw85XXIqZUgEfH2H6cBH5FmVIPa_jqgd9NROHFdAo" }])
        .onConflict(["spreadsheet_id"])
        .ignore();
}
