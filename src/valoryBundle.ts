import {dirname, join, relative} from "path";

const TSAsset = require("parcel-bundler/src/assets/TypeScriptAsset");

class ValoryBundle extends TSAsset {
    private isValoryEntry = false;

    public async pretransform() {
        const config = await this.getConfig(["valory.json"]);
        this.isValoryEntry = (join(process.cwd(), config.sourceEntrypoint) === this.name);
        if (this.isValoryEntry) {
            this.contents = this.buildRequireBlock(config) + this.contents;
        }
        await super.pretransform();
    }

    private buildRequireBlock(config: {sourceEntrypoint: string, entrypoint: string}) {
        const dir = dirname(this.name);
        const absoluteCompswag = join(process.cwd(), ".compswag");
        const relativeRoutes = "./generatedRoutes";
        const relativeCompswag = relative(dir, absoluteCompswag);
        // console.log(relativeRoutes, relativeCompswag);
        return `
        require("valory-runtime").Valory.CompileLibOverride = {
            generatedRoutes: require("${relativeRoutes}"),
            compswag: require("${relativeCompswag}")
        };
        `;
    }
}

export = ValoryBundle;
