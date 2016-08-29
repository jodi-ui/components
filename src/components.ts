import {el} from 'jodi-ui-dom';

interface LifeCycleCallback {
    (element: Element): void;
}

interface LifeCycleCallbackSetter {
    (cb: LifeCycleCallback): void;
}

interface RegisterCallbacks {
    (
        onCreated: LifeCycleCallbackSetter,
        onUpdated: LifeCycleCallbackSetter,
        onRendered: LifeCycleCallbackSetter // TODO do we really need this one?
    ): void;
}

// TODO we need to be able to put properties in here
export function openComponent(tag: string, childrenFactory: Function, registerCallbacks?: RegisterCallbacks) {
    const element = el(tag, childrenFactory);

    // placeholders
    const subscribers = {
        created: (element) => {},
        updated: (element) => {},
        rendered: (element) => {}
    };

    if (registerCallbacks) {
        registerCallbacks(
            (cb) => {subscribers.created = cb},
            (cb) => {subscribers.updated = cb},
            (cb) => {subscribers.rendered = cb}
        );
    }

    if (element['__JodiUI-Component']) {
        element['__JodiUI-Component'].updated = true;
    } else {
        element['__JodiUI-Component'] = {
            updated: false
        };
    }

    if (element['__JodiUI-Component'].updated) {
        subscribers.updated(element);
    } else {
        subscribers.created(element);
    }

    subscribers.rendered(element);

    return element;
}
