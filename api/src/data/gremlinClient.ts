import gremlin from 'gremlin';

import config from '../config';

const authenticator = new gremlin.driver.auth.PlainTextSaslAuthenticator(
    config.database.username,
    config.database.password);

const gremlinClient = new gremlin.driver.Client(
    config.database.endpoint,
    {
        authenticator,
        traversalsource: 'g',
        rejectUnauthorized: true,
        mimeType: 'application/vnd.gremlin-v2.0+json'
    }
);

export default gremlinClient;