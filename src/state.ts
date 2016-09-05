export class State {
    private updateCallback: Function;
    private data = {};
    private initial: boolean = true;

    constructor(updateCallback: Function) {
        this.updateCallback = updateCallback;
    }

    public get(name: string, defaultValue?: any): any {
        if (this.data.hasOwnProperty(name)) {
            return this.data[name];
        }

        return defaultValue;
    }

    public set(name: string, value: any): State {
        this.data[name] = value;
        this.initial = false;
        this.updateCallback();

        return this;
    }

    public isInitial(): boolean {
        return this.initial;
    }
}