// Generates the published index.html from test/demo.html.
// test/demo.html loads the library from source through the Vite alias; index.html loads the built UMD bundle.
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const { version } = require(path.join(root, "package.json"));
const checkOnly = process.argv.includes("--check");

let html = fs.readFileSync(path.join(root, "test/demo.html"), "utf8");
const eol = html.includes("\r\n") ? "\r\n" : "\n";

function replaceOnce(from, to) {
    const count = html.split(from).length - 1;
    if (count !== 1) {
        throw new Error(`build-demo: expected exactly one ${JSON.stringify(from)} in test/demo.html, found ${count}`);
    }
    html = html.replace(from, to);
}

replaceOnce(
    `        </script>${eol}        <style>`,
    `        </script>${eol}        <link rel="stylesheet" href="./dist/umd2020-${version}/style.css" />${eol}        <script src="./dist/umd2020-${version}/yk-color-picker.js"></script>${eol}        <style>`
);
replaceOnce(`        <script type="module">${eol}            import { YKColorPicker } from "yk-color-picker";${eol}${eol}`, `        <script>${eol}`);
replaceOnce("new YKColorPicker({", "new YK.YKColorPicker({");

const target = path.join(root, "index.html");
if (checkOnly) {
    const current = fs.readFileSync(target, "utf8");
    if (current !== html) {
        console.error("index.html is out of date; run `npm run build:demo`");
        process.exit(1);
    }
    console.log("index.html is up to date");
} else {
    fs.writeFileSync(target, html);
    console.log(`index.html generated from test/demo.html (dist ${version})`);
}
