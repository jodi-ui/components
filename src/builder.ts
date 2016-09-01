import {el, render} from 'jodi-ui-dom';
import {LifeCycleCallback} from './interfaces';
import {StateContainer} from './state-container';

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

    public render(cb: (state?: StateContainer) => void): Element {
        return el(this.tag, this.staticProps, this.dynamicProps, (element) => {

            // figure out if we've got fresh component
            // assign markers and state container if not
            if (element['__JodiUI-Component']) {
                element['__JodiUI-Component'].updated = true;
            } else {
                element['__JodiUI-Component'] = {
                    updated: false,
                    state: new StateContainer(() => {
                        render(element.parentElement, () => {
                            this.render(cb);
                        });
                    })
                };
            }

            cb(element['__JodiUI-Component'].state);

            if (element['__JodiUI-Component'].updated) {
                this.subscribers.updated(element, element['__JodiUI-Component'].state);
            } else {
                this.subscribers.created(element, element['__JodiUI-Component'].state);
            }

            this.subscribers.rendered(element, element['__JodiUI-Component'].state);
        });
    }
}

export function component(tag: string): ComponentBuilder {
    return new ComponentBuilder(tag);
}
