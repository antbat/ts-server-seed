import { config } from './utils/config';
import { getApp } from "./app";

( async () => {
    const application = await getApp();
    await application.listen(config.port);
})();
