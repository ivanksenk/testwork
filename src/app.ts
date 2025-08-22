import { migrate, seed } from "#postgres/knex.js";
import env from "#config/env/env.js";
import { app } from "#config/express/express.js";
import { scheduler } from "#scheduler/scheduler.js";

await migrate.latest();
await seed.run();

scheduler.start();

app.listen(env.APP_PORT,()=>{
    console.log('App listen at:',env.APP_PORT);
})

console.log("All migrations and seeds have been run");