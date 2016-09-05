import {component} from '../../index';
import {el, text} from 'jodi-ui-dom';
import {State} from '../state';

const onCreated = element => {
    console.log('component 2 created', element);
};

const onUpdated = element => {
    console.log('component 2 updated', element);
};

const onRendered = element => {
    console.log('component 2 rendered', element);
};

export const statefulCounterComponent = () => component('div')
    .whenCreated(onCreated)
    .whenUpdated(onUpdated)
    .whenRendered(onRendered)
    .render((state: State) => {
        const number = state.get('number', 1);
        el('div', {'style': 'background: seagreen; padding: 1rem;'}, () => {
            el('h2', () => text('Stateful counter'));
            el('div', () => text(number));
            el('button', {}, {
                'onclick': () => state.set('number', number + 1)
            }, () => text('Increment'));
        });
    });
