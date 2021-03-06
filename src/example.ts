import {render} from 'jodi-ui-dom';
import {counterComponent} from './example/counter-component';
import {statefulCounterComponent} from './example/stateful-counter-component';

export function bootstrap() {
    let count = 1;

    // list of all actions in app
    const actions = {
        incrementCounter: () => {
            renderCounterComponent(++count);
        }
    };

    function renderCounterComponent(number) {
        render(document.querySelector('#app'), () => {
            counterComponent(number, actions);
        });
    }

    function renderStatefulCounterComponent() {
        render(document.querySelector('#app2'), () => {
            statefulCounterComponent(renderStatefulCounterComponent);
        });
    }

    renderCounterComponent(1);
    renderStatefulCounterComponent();
}
