import { boxTariffsUpdator } from "#WbApi/services/boxTariffsUpdator.service.js";
import nodeCron from "node-cron";

class Scheduler {
    start() {
        nodeCron.schedule('0 * * * *', async () => {
            console.log('Running warehouse data update...');
            try {
                await boxTariffsUpdator.updateData()
            } catch (error) {
                console.error('Error in  scheduler:', error);
            }
        });
        console.log('Scheduler started');
    }
}
export const scheduler = new Scheduler();