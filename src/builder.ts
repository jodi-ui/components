import {el} from 'jodi-ui-dom';
import {LifeCycleCallback} from './interfaces';

export class ComponentBuilder {
    private subscribers = {
        created: undefined,
        updated: undefined,
        rendered: undefined
    };
    private staticProps: Object;
    private dynamicProps: Object;

    constructor(private tag: string) {
        this.subscribers.created = () => {};
        this.subscribers.updated = () => {};
        this.subscribers.rendered = () => {};
    }

    public withProps(staticProps: Object, dynamicProps: Object): ComponentBuilder {
        this.staticProps = staticProps;
        this.dynamicProps = dynamicProps;

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

    public render(cb: Function): Element {
        const element = el(this.tag, this.staticProps, this.dynamicProps, cb);

        if (element['__JodiUI-Component']) {
            element['__JodiUI-Component'].updated = true;
        } else {
            element['__JodiUI-Component'] = {
                updated: false
            };
        }

        if (element['__JodiUI-Component'].updated) {
            this.subscribers.updated(element);
        } else {
            this.subscribers.created(element);
        }

        this.subscribers.rendered(element);

        return element;
    }
}

export function component(tag: string): ComponentBuilder {
    return new ComponentBuilder(tag);
}
