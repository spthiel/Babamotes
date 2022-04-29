import {map, mergeMap, Observable, ObservedValueOf, reduce, Subscriber, TeardownLogic, filter} from "rxjs";

export class ExtObservable<T> extends Observable<T> {

	cast<R>(): ExtObservable<R> {
		return this as unknown as ExtObservable<R>;
	}

	map<R>(func: (value: T, index: number) => R): ExtObservable<R> {
		this.pipe(map(func));
		return this.cast();
	}

	flatMap<R>(func: (value: T, index: number) => Observable<R>): ExtObservable<R> {
		this.pipe(mergeMap(func));
		return this.cast();
	}

	reduce<A>(accumulator: (acc: T | A, value: T, index: number) => A, seed?: any): ExtObservable<A> {
		this.pipe(reduce(accumulator, seed));
		return this.cast();
	}

	filter(func: (value: T, index: number) => boolean): ExtObservable<T> {
		this.pipe(filter(func))
		return this.cast();
	}

}
