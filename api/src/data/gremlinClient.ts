import gremlin from 'gremlin';

import config from '../config';

const authenticator: gremlin.driver.auth.PlainTextSaslAuthenticator = new gremlin.driver.auth.PlainTextSaslAuthenticator(
    config.database.username,
    config.database.password);

const gremlinClient: gremlin.driver.Client = new gremlin.driver.Client(
    config.database.endpoint,
    {
        authenticator,
        traversalsource: 'g',
        rejectUnauthorized: true,
        mimeType: 'application/vnd.gremlin-v2.0+json'
    }
);

export default gremlinClient;