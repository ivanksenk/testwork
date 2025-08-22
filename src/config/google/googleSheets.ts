import { google } from "googleapis";

export class GoogleSheetsService {
    auth: any;
    sheets: any;
    constructor() {
        this.auth = null;
        this.sheets = null;
        this.init();
    }
    async init() {
        try {
            const auth = new google.auth.GoogleAuth({
                keyFile: 'credentials.json',
                scopes: ['https://www.googleapis.com/auth/spreadsheets']
            });
            this.auth = await auth.getClient();
            this.sheets = google.sheets({ version: 'v4', auth: this.auth });
            console.log('Google sheets init')
        } catch (error) {
            console.error('Error init Google sheets:', error);
            throw error;
        }
    }

    async updateSheet(spreadsheetId:string, range:string, values:any) {
        try {
          const request = {
            spreadsheetId,
            range,
            valueInputOption: 'RAW',
            resource: { values },
            auth: this.auth,
          };
    
          const response = await this.sheets.spreadsheets.values.update(request);
          return response.data;
        } catch (error) {
          console.error('Error updating sheet:', error);
          throw error;
        }
      }

      async clearSheet(spreadsheetId:string, range:string) {
        try {
          const request = {
            spreadsheetId,
            range,
            auth: this.auth,
          };
    
          await this.sheets.spreadsheets.values.clear(request);
        } catch (error) {
          console.error('Error clearing sheet:', error);
          throw error;
        }
      }

}

export const googleService = new GoogleSheetsService();
