export interface WarehouseBoxTariffs {
  boxDeliveryBase: string,
  boxDeliveryCoefExpr: string,
  boxDeliveryLiter: string,
  boxDeliveryMarketplaceBase: string,
  boxDeliveryMarketplaceCoefExpr: string,
  boxDeliveryMarketplaceLiter: string,
  boxStorageBase: string,
  boxStorageCoefExpr: string,
  boxStorageLiter: string,
  geoName: string,
  warehouseName: string,
  createdAt: string
}

export interface TariffsResponseData {
  dtNextBox: string;
  dtTillMax: string;
  warehouseList: WarehouseBoxTariffs[];
}

export interface BoxTariffsApiResponse {
  response: {
    data: TariffsResponseData;
  };
}

export interface TransformDataType {
  date: string | null;
  geo_name: string | null;
  warehouse_name: string | null;
  box_delivery_base: number | null;
  box_delivery_coef_expr: string | null;
  box_delivery_liter: number | null;
  box_delivery_marketplace_base: number | null;
  box_delivery_marketplace_coef_expr: string | null;
  box_delivery_marketplace_liter: number | null;
  box_storage_base: number | null;
  box_storage_coef_expr: string | null;
  box_storage_liter: number | null;
  created_at: string | null;
}

export interface Spreadsheets{
  spreadsheet_id: string 
}