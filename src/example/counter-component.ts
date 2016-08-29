import {component} from '../../index';
import {el, text} from 'jodi-ui-dom';

// There's no internal state concept yet. TODO implement. Store it directly on node
export function counterComponent (number, actions: CounterActionCreators) {
    const render = () => {
        el('div', {'style': 'background: seagreen; padding: 1rem;'}, () => {
            el('div', () => text(number));
            el('button', {'onclick': actions.incrementCounter}, () => text('Increment'));
        });
    };

    const onCreated = element => {
        console.log('component created', element);
    };

    const onUpdated = element => {
        console.log('component updated', element);
    };

    const onRendered = element => {
        console.log('component rendered', element);
    };

    return component('div')
        .whenCreated(onCreated)
        .whenUpdated(onUpdated)
        .whenRendered(onRendered)
        .render(render);
}

// interface containing only actions related to current component
interface CounterActionCreators {
    incrementCounter: Function
}
