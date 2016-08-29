import {render} from 'jodi-ui-dom';
import {counterComponent} from './example/counter-component';

let count = 1;

// list of all actions in app
const actions = {
    incrementCounter: () => {
        renderUI(++count);
    }
};

function renderUI(number) {
    render(document.querySelector('#app'), () => {
        counterComponent(number, actions);
    });
}

renderUI(1);
