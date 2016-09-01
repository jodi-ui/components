import {StateContainer} from './state-container';

export interface LifeCycleCallback {
    (element: Element, state: StateContainer): void;
}
