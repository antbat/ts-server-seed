import { config } from './utils/config';
import { getApp } from './app';

(async () => {
    // async init
    const application = await getApp();
    await application.listen(config.port);
})();
