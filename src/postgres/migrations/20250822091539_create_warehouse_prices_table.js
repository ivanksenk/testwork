/**
 * @param {import("knex").Knex} knex
 * @returns {Promise<void>}
 */
export async function up(knex) {
    await knex.schema.createTable('warehouse_prices', (table) => {
        table.increments('id').unique().primary();
        table.string('geo_name', 255);
        table.string('warehouse_name', 255)

        // Основная доставка
        table.decimal('box_delivery_base', 10, 2);
        table.string('box_delivery_coef_expr', 50);
        table.decimal('box_delivery_liter', 10, 2);

        // Доставка маркетплейса
        table.decimal('box_delivery_marketplace_base', 10, 2);
        table.string('box_delivery_marketplace_coef_expr', 50);
        table.decimal('box_delivery_marketplace_liter', 10, 2);

        // Хранение
        table.decimal('box_storage_base', 10, 2);
        table.string('box_storage_coef_expr', 50);
        table.decimal('box_storage_liter', 10, 2);
        table.string('date', 50)
        table.timestamp('created_at').defaultTo(knex.fn.now());

    })
}

/**
 * @param {import("knex").Knex} knex
 * @returns {Promise<void>}
 */
export async function down(knex) {
    return knex.schema.dropTable("warehouse_prices");
}
