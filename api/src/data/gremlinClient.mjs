import gremlin from 'gremlin';

import packageConfig from '../../package.json' assert { type: 'json' };

const authenticator = new gremlin.driver.auth.PlainTextSaslAuthenticator(
    packageConfig.config.database.username,
    packageConfig.config.database.password);

const gremlinClient = new gremlin.driver.Client(
    packageConfig.config.database.endpoint,
    {
        authenticator,
        traversalsource: 'g',
        rejectUnauthorized: true,
        mimeType: 'application/vnd.gremlin-v2.0+json'
    }
);

export default gremlinClient;