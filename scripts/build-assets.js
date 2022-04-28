import * as fsPromise from "fs/promises";
import {flatMap, map, mergeMap, Observable, reduce} from "rxjs";
import {fromArrayLike, fromPromise} from "rxjs/internal/observable/innerFrom";
import * as utils from "./utils.js"
import path from "path";
import url from "url";

const config = {
	"css": {
		"origin": "../src/webpage/dev-assets/css",
		"destination": "../src/webpage/assets/css"
	},
	"js": {
		"origin": "../src/webpage/dev-assets/js",
		"destination": "../src/webpage/assets/js"
	}
}

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const source = fromArrayLike([1, 2, 3, 4]);
const example = source.pipe(reduce((acc, val) => acc + val));
//output: Sum: 10'
const subscribe = example.subscribe(val => console.log('Sum:', val));

build();

async function build() {
	await Promise.all([buildCss(), buildJS()])
}

async function buildCss() {
	utils.listFiles(config.css.origin)
		.pipe(mergeMap(file => fromPromise(fsPromise.readFile(path.join(__dirname, file)))))
		.pipe(map(buffer => buffer.toString()))
		.pipe(reduce((accumulator, value, i) => accumulator + value))
		.subscribe(console.log)
		// .forEach(content => console.log(content));
}

async function buildJS() {

}
