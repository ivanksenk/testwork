import { TransformDataType, WarehouseBoxTariffs } from "#types/index.js";

const parseNum = (value: string): number | null => {
    if (!value || value === '-' || value === '') return null;
    const numericValue = typeof value === 'string'
        ? parseFloat(value.replace(',', '.'))
        : value;
    return isNaN(numericValue) ? null : numericValue;
};

const parseString = (value: string): string | null => {
    if (!value || value === '-') return null;
    return value;
};

export const transformWarehouseData = (warehouseList: WarehouseBoxTariffs[], date: string):TransformDataType[] => {
    return warehouseList.map(warehouse => ({
        date: date,
        geo_name: warehouse.geoName,
        warehouse_name: warehouse.warehouseName,
        box_delivery_base: parseNum(warehouse.boxDeliveryBase),
        box_delivery_coef_expr: parseString(warehouse.boxDeliveryCoefExpr),
        box_delivery_liter: parseNum(warehouse.boxDeliveryLiter),
        box_delivery_marketplace_base: parseNum(warehouse.boxDeliveryMarketplaceBase),
        box_delivery_marketplace_coef_expr: parseString(warehouse.boxDeliveryMarketplaceCoefExpr),
        box_delivery_marketplace_liter: parseNum(warehouse.boxDeliveryMarketplaceLiter),
        box_storage_base: parseNum(warehouse.boxStorageBase),
        box_storage_coef_expr: parseString(warehouse.boxStorageCoefExpr),
        box_storage_liter: parseNum(warehouse.boxStorageLiter),
        created_at: warehouse.createdAt
    }));
};
