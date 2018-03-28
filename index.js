const fse = require("fs-extra");

const package = (commands) => {
    const path = commands.path;
    const nextVersion = commands.nextVersion;
    const props = commands.props;

    return {
        name: "rollup-plugin-package-edit",
        ongenerate() {
            let json = fse.readJsonSync(path);

            let version = json.version.split(".");

            if (nextVersion.major) {
                version[0] = Number(version[0]) + 1;
            }

            if (nextVersion.minor) {
                version[1] = Number(version[1]) + 1;
            }

            if (nextVersion.patch) {
                version[2] = Number(version[2]) + 1;
            }

            version = version.join(".");
            
            json = Object.assign({}, json, props, { "version": version });
            fse.writeJsonSync(path, json, {
                spaces: 2
            });
        }
    }
}

module.exports = package
