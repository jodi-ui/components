import {openComponent} from './components';
import {el, text, render} from 'jodi-ui-dom';

let count = 1;

// list of all actions in app
const actions = {
    incrementCounter: () => {
        refreshState(++count);
    }
};

// component is just a function you can use
// underneath it uses openComponent which in turns uses regular jodi-ui-dom's functions
// It gives you one advantage thou - 3 lifecycle callbacks.
// LCC might be very helpful when dealing with stuff that cannot be simply re-rendered
// and needs some manual operations (like video player that should be paused with state's change).
//
// There's no internal state concept yet. TODO implement. Store it directly on node

// interface containing only actions related to current component
interface CounterActionCreators {
    incrementCounter: Function
}

function counter (number, actions: CounterActionCreators) { // clean function, no global stateful dependencies, uses other clean functions like openComponent
    openComponent('div', () => {
        el('div', {'style': 'background: seagreen; padding: 1rem;'}, () => {
            el('div', () => text(number));
            el('button', {'onclick': actions.incrementCounter}, () => text('Increment'));
        });
    }, (onCreated, onUpdated, onRendered) => {
        onCreated(element => {
            console.log('component created', element);
        });

        onUpdated(element => {
            console.log('component updated', element);
            // e.g.
            // if (!state.playing) {
            //   element.querySelector('video').pause();
            // }
        });

        onRendered(element => {
            console.log('component rendered', element);
        });
    });
}

function refreshState(number) {
    render(document.querySelector('#app'), () => {
        counter(number, actions);
    });
}

refreshState(1);
