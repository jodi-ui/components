import {State} from './state';

export interface LifeCycleCallback {
    (element: Element, state: State): void;
}
