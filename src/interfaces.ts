import {State} from './state';

export interface LifeCycleCallback {
    (element: Element, state: State): void;
}

export interface StateUpdatedCallback {
    (state?: State, key?: string, newVal?: any, oldVal?: any): void;
}

export interface ComponentState {
    get(name: string, defaultValue?: any): any;
    set(name: string, value: any, callback?: StateUpdatedCallback): ComponentState;
    isInitial(): boolean;
}
