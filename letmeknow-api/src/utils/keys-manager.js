import fs from "fs";
import path from "path";
import config from '../config.js'

const keysPath = path.join(path.resolve(), "resources", "keys");

class KeysManager {
    static privateKey;
    static publicKey;

    static init() {
        this.privateKey = fs.readFileSync(
            path.join(keysPath, config.auth.jwtPrivateKey)
        );
        this.publicKey = fs.readFileSync(
            path.join(keysPath, config.auth.jwtPublicKey)
        );
    }
}

KeysManager.init();

export default KeysManager;
