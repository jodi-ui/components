import {component} from '../../index';
import {el, text, s} from 'jodi-ui-dom';

const onCreated = element => {
    console.log('component created', element);
};

const onUpdated = element => {
    console.log('component updated', element);
};

const onRendered = element => {
    console.log('component rendered', element);
};

export const counterComponent = (number, actions: CounterActionCreators) => component('div')
    .whenCreated(onCreated)
    .whenUpdated(onUpdated)
    .whenRendered(onRendered)
    .render(() => {
        el('div', s({'style': 'background: seagreen; padding: 1rem;'}), () => {
            el('h2', () => text('Counter'));
            el('div', () => text(number));
            el('button', s({
                'onclick': actions.incrementCounter
            }), () => text('Increment'));
        });
    });


// interface containing only actions related to current component
interface CounterActionCreators {
    incrementCounter: Function
}
