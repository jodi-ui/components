import {el, DynamicProperties, StaticProperties, Key} from 'jodi-ui-dom';
import {LifeCycleCallback} from './interfaces';
import {State} from './state';

const COMPONENT_PROPERTY = '__JodiUI-Component';

function isComponentBeingUpdated(element: HTMLElement): boolean {
    return element.hasOwnProperty(COMPONENT_PROPERTY);
}

function isComponentUpdated(element: HTMLElement): boolean {
    return element[COMPONENT_PROPERTY].updated;
}

function createComponentMetadataWithState(element: HTMLElement): void {
    element[COMPONENT_PROPERTY] = {
        updated: false,
        state: new State()
    };
}

function executeLifeCycleCallback(callback: LifeCycleCallback, element: HTMLElement) {
    if (callback) {
        callback(element, getState(element));
    }
}

function getState(element: HTMLElement): State {
    return element[COMPONENT_PROPERTY].state;
}

export class ComponentBuilder {
    private key: Key;
    private subscribers = {
        created: undefined,
        updated: undefined,
        rendered: undefined
    };
    private staticProps: StaticProperties;
    private dynamicProps: DynamicProperties;

    constructor(private tag, params: Array<any>) {
        params.forEach(param => {
            if (param instanceof DynamicProperties) {
                this.dynamicProps = param;
            }

            if (param instanceof StaticProperties) {
                this.staticProps = param;
            }

            if (param instanceof Key) {
                this.key = param;
            }
        });
    }

    public withProps(staticProps: Object = {}, dynamicProps: Object = {}): ComponentBuilder {
        this.staticProps = new StaticProperties(staticProps);
        this.dynamicProps = new DynamicProperties(dynamicProps);

        return this;
    }

    public withCallbacks(
        onCreated?: LifeCycleCallback,
        onUpdated?: LifeCycleCallback,
        onRendered?: LifeCycleCallback
    ): ComponentBuilder {
        this.subscribers.created = onCreated;
        this.subscribers.updated = onUpdated;
        this.subscribers.rendered = onRendered;

        return this;
    }

    public whenCreated(cb: LifeCycleCallback): ComponentBuilder {
        this.subscribers.created = cb;
        return this;
    }

    public whenUpdated(cb: LifeCycleCallback): ComponentBuilder {
        this.subscribers.updated = cb;
        return this;
    }

    public whenRendered(cb: LifeCycleCallback): ComponentBuilder {
        this.subscribers.rendered = cb;
        return this;
    }

    public render(cb?: (state?: State) => void): Element {
        return el(this.tag, this.key, this.staticProps, this.dynamicProps, (element) => {
            if (isComponentBeingUpdated(element)) {
                element[COMPONENT_PROPERTY].updated = true;
            } else {
                createComponentMetadataWithState(element);
            }

            if (cb) {
                cb(getState(element));
            }

            if (isComponentUpdated(element)) {
                executeLifeCycleCallback(this.subscribers.updated, element);
            } else {
                executeLifeCycleCallback(this.subscribers.created, element);
            }

            executeLifeCycleCallback(this.subscribers.rendered, element);
        });
    }
}

export function component(tag, ...params): ComponentBuilder {
    return new ComponentBuilder(tag, params);
}
