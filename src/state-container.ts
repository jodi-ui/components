// TODO rename to State before releasing
export class StateContainer {
    private updateCallback: Function;
    private state = {};
    private initial: boolean = true;

    constructor(updateCallback: Function) {
        this.updateCallback = updateCallback;
    }

    public get(name: string, defaultValue?: any): any {
        if (this.state.hasOwnProperty(name)) {
            return this.state[name];
        }

        return defaultValue;
    }

    public set(name: string, value: any): StateContainer {
        console.debug('setting', name, value);
        this.state[name] = value;
        this.initial = false;
        this.updateCallback();

        return this;
    }

    public isInitial(): boolean {
        return this.initial;
    }
}