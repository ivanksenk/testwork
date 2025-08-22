import { WbBoxTariffsApi } from "#axios/axios.js";
import { BoxTariffsApiResponse, TariffsResponseData } from "#types/index.js";
import { AxiosResponse } from "axios";


export class BoxTariffsService {
    static async getBoxTariffs(date: string): Promise<BoxTariffsApiResponse> {
        try {
            const response: AxiosResponse<BoxTariffsApiResponse> = await WbBoxTariffsApi.get('/tariffs/box', {
                params: {
                    date: date
                }
            });
            return response.data
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async saveBoxTariffs(dataList: TariffsResponseData) {
        try {
          

        } catch (error) {
            console.error(error);
            throw error;
        }
    }

}