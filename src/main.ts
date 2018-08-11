import {join} from "path";
import {existsSync} from "fs";

export = (bundler: any) => {
    if (existsSync(join(process.cwd(), "valory.json"))) {
        bundler.addAssetType("ts", require.resolve("./valoryBundle"));
    } else {
        return;
    }
};
