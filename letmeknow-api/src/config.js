import jsyaml from 'js-yaml';
import fs from 'fs';
import path from 'path';

function _addConfiguration(uri, encoding) {
    var configString = null;

    if (!uri) {
        throw new Error("Parameter URI is required");
    } else {
        configString = fs.readFileSync(path.join(path.resolve(), 'resources', uri), encoding);
    }

    var newConfigurations = jsyaml.load(configString)[process.env.NODE_ENV ? process.env.NODE_ENV : 'development'];

    for (var c in newConfigurations) {
        this[c] = newConfigurations[c];
    }
}

let config = {
    addConfiguration: _addConfiguration
};

/*
 * Setup default config location
 */
config.addConfiguration('config.yaml', 'utf8');

export default config;