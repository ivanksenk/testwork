import { BoxTariffsService } from "#WbApi/services/boxTariffs.service.js";
import { transformWarehouseData } from "#utils/warehouseUtils.js";
import knex from "#postgres/knex.js";
import { googleService } from "#config/google/googleSheets.js";
import { Spreadsheets, TransformDataType } from "#types/index.js";
import { spreadsheetsService } from "#spreadsheets/service/spreadsheets.service.js";
import { debounce } from "#utils/debounce.js";

export class boxTariffsUpdator {
    static async updateData() {

        try {
            const today = new Date().toISOString().split('T')[0];
            const boxTariffs = await BoxTariffsService.getBoxTariffs(today);
            const transformedData: TransformDataType[] = transformWarehouseData(boxTariffs.response.data.warehouseList, today);
            let resData = '';
            await knex.transaction(async (tr) => {
                await tr('warehouse_prices')
                    .where({ date: today })
                    .del();
                const result = await tr('warehouse_prices')
                    .insert(transformedData)
                    .returning('id');
                resData = `Saved ${result.length} records for date: ${today}`
                console.log(resData);
                return resData;
            })
            const sheetData = await this.prepareDataForSheets(transformedData);
            const spreadsheets: Spreadsheets[] | null = await spreadsheetsService.getSpreadsheets();
            if(!spreadsheets){
                console.log('No data about tables was received')
                return;
            }
            try {
                for (const spreadsheet of spreadsheets) {
                    await googleService.clearSheet(spreadsheet.spreadsheet_id, 'stocks_coefs!A:L');
                    await googleService.updateSheet(spreadsheet.spreadsheet_id, 'stocks_coefs!A1', sheetData);
                    console.log(`Successfully updated spreadsheet: ${spreadsheet.spreadsheet_id}`);
                    await debounce(1000);
                }
            } catch (error) {
                console.error('Error updating Google Sheets:', error);
            }
            return resData;
        } catch (error) {
            console.error('Error update Tariffs:', error);
        }
    }

    static async prepareDataForSheets(data: any) {
        let tempDate = new Date().toISOString().split('T');
        let updateDate = `${tempDate[1].split('.')[0]} ${tempDate[0]}`;
        const sortedData = data.sort((a: any, b: any) => {
            const coefA = a.box_delivery_coef_expr === '-' || !a.box_delivery_coef_expr ?
                999999 : parseInt(a.box_delivery_coef_expr);
            const coefB = b.box_delivery_coef_expr === '-' || !b.box_delivery_coef_expr ?
                999999 : parseInt(b.box_delivery_coef_expr);
            return coefA - coefB;
        });

        const header = [
            'Регион',
            'Склад',
            'Доставка (база)',
            'Доставка (коэф)',
            'Доставка (за литр)',
            'Маркетплейс доставка (база)',
            'Маркетплейс доставка (коэф)',
            'Маркетплейс доставка (за литр)',
            'Хранение (база)',
            'Хранение (коэф)',
            'Хранение (за литр)',
            'Дата',
            'Последнее обновление (UTC)'
        ];

        const rows = sortedData.map((item: any) => [
            item.geo_name,
            item.warehouse_name,
            item.box_delivery_base !== null ? item.box_delivery_base : '-',
            item.box_delivery_coef_expr !== null ? item.box_delivery_coef_expr : '-',
            item.box_delivery_liter !== null ? item.box_delivery_liter : '-',
            item.box_delivery_marketplace_base !== null ? item.box_delivery_marketplace_base : '-',
            item.box_delivery_marketplace_coef_expr !== null ? item.box_delivery_marketplace_coef_expr : '-',
            item.box_delivery_marketplace_liter !== null ? item.box_delivery_marketplace_liter : '-',
            item.box_storage_base !== null ? item.box_storage_base : '-',
            item.box_storage_coef_expr !== null ? item.box_storage_coef_expr : '-',
            item.box_storage_liter !== null ? item.box_storage_liter : '-',
            item.date,
            updateDate
        ]);
        return [header, ...rows];
    }
}