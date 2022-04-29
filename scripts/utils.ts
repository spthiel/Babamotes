import fsPromise from "fs/promises";
import path from "path";
import {Observable, Subject} from "rxjs";
import {fromSubscribable} from "rxjs/internal/observable/fromSubscribable";
import url from "url";
import {ExtObservable} from "../rxjs/ExtObservable.js";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function listFiles(directory: string, regexp: RegExp): ExtObservable<string> {

	return new ExtObservable((observer) => {
		(async () => {
			let directories = [directory];
			while (directories.length > 0) {
				let directory = directories.pop() as string;
				let files = await fsPromise.readdir(path.join(__dirname,directory), {withFileTypes: true});
				for (let file of files) {
					if (file.isDirectory()) {
						directories.push(path.join(directory, file.name));
					} else if(file.name.match(regexp)){
						observer.next(path.join(directory, file.name));
					}
				}
			}

		})().then(ignored => observer.complete());
	});

}

async function listFilesToSubject(subject, directory) {

}
