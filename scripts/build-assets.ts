import CleanCSS from "clean-css";
import * as fsPromise from "fs/promises";
import path from "path";
import {fromPromise} from "rxjs/internal/observable/innerFrom";
import sass from "sass";
import url from "url";
import "../rxjs/ExtObservable.js";
import * as utils from "./utils.js"

const config = {
	"css": {
		"origin": "../../src/webpage/dev-assets/css",
		"destination": "../../src/webpage/assets/css/styles.min.css",
		"pattern": /^.*\.s?css$/
	},
	"js": {
		"origin": "../src/webpage/dev-assets/js",
		"destination": "../src/webpage/assets/js",
		"pattern": /^.*\.module\.js$/
	}
}

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

build().then(ignored => console.log("[NOTICE] Build assets complete"));

async function build() {
	await Promise.all([buildCss(), buildJS()]);
}

function buildCss(): Promise<void> {
	return new Promise((resolve, reject) => {
		utils.listFiles(config.css.origin, config.css.pattern)
			.map(file => sass.compile(path.join(__dirname, file)))
			.map(result => result.css)
			.reduce((accumulator, value, i) => accumulator + value)
			.map((concatenated: string) => new CleanCSS().minify(concatenated))
			.map(result => result.styles)
			.map(css => fsPromise.writeFile(path.join(__dirname, config.css.destination), css))
			.flatMap(promise => fromPromise(promise))
			.subscribe({
				error: reject,
				complete: () => {
					console.log("[NOTICE] Completed css compiling");
					resolve()
				}
			});
	})
}

function buildJS() {
	return new Promise((resolve, reject) => {

	});
}
