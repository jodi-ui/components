export class StateContainer {
    private updateCallback: Function;
    private state = {};

    constructor(updateCallback: Function) {
        this.updateCallback = updateCallback;
    }

    public get(name: string, defaultValue?: any) {
        if (this.state.hasOwnProperty(name)) {
            return this.state[name];
        }

        return defaultValue;
    }

    public set(name: string, value: any) {
        console.debug('setting', name, value);
        this.state[name] = value;
        this.updateCallback();

        return this;
    }
}