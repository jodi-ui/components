import {StateUpdatedCallback} from './interfaces';
export class State {
    private data = {};
    private initial: boolean = true;

    public get(name: string, defaultValue?: any): any {
        if (this.data.hasOwnProperty(name)) {
            return this.data[name];
        }

        return defaultValue;
    }

    public set(name: string, value: any, callback?: StateUpdatedCallback): State {
        const oldVal = this.data[name];

        this.data[name] = value;
        this.initial = false;

        if (callback) {
            callback(this, name, value, oldVal)
        }

        return this;
    }

    public isInitial(): boolean {
        return this.initial;
    }
}