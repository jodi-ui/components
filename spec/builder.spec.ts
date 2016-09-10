import {component} from '../src/builder';
import {el, text, render} from 'jodi-ui-dom';
import {State} from '../src/state';

describe('Component Builder', () => {
    it('should render a component which calls right callbacks in right circumstances while refreshing from outside', () => {
        const node = document.createElement('foo');
        const eventsCalled = [];

        const onCreated = (events: string[], element, state: State) => {
            events.push('created');
        };

        const onUpdated = (events: string[], element) => {
            events.push('updated');
        };

        const onRendered = (events: string[], element) => {
            events.push('rendered');
        };

        const testComponent = (count) => {
            return component('section')
                .whenCreated(onCreated.bind(this, eventsCalled))
                .whenUpdated(onUpdated.bind(this, eventsCalled))
                .whenRendered(onRendered.bind(this, eventsCalled))
                .render(() => {
                    el('div', () => text(count));
                });
        };

        render(node, () => {
            testComponent(1);
            expect(node.querySelector('div').innerHTML).toEqual('1');
        });

        expect(eventsCalled.length).toEqual(2);
        expect(eventsCalled[0]).toEqual('created');
        expect(eventsCalled[1]).toEqual('rendered');

        render(node, () => {
            testComponent(2);
        });

        expect(eventsCalled.length).toEqual(4);
        expect(eventsCalled[2]).toEqual('updated');
        expect(eventsCalled[3]).toEqual('rendered');
    });

    it('should render a component which calls right callbacks in right circumstances reacting to state change', () => {
        const node = document.createElement('foo');
        const eventsCalled = [];

        const onCreated = (events: string[], element, componentState: State) => {
            events.push('created');
            componentState.set('count', 1, (state, key, newVal, oldVal) => {
                expect(state).toBe(componentState);
                expect(key).toEqual('count');
                expect(oldVal).toEqual(undefined);
                expect(newVal).toEqual(1);

                refreshUI();
            });
        };

        const onUpdated = (events: string[], element) => {
            events.push('updated');
        };

        const onRendered = (events: string[], element: HTMLElement, state: State) => {
            events.push('rendered');
            expect(element.querySelector('div').innerHTML).toEqual(state.get('count').toString());
        };

        const refreshUI = () => {
            render(node, () => {
                component('section')
                    .whenCreated(onCreated.bind(this, eventsCalled))
                    .whenUpdated(onUpdated.bind(this, eventsCalled))
                    .whenRendered(onRendered.bind(this, eventsCalled))
                    .render((state: State) => {
                        const count = state.get('count', 0);

                        el('div', () => text(count));
                    });
            });
        };

        refreshUI();

        expect(eventsCalled.length).toEqual(4);
        expect(eventsCalled[0]).toEqual('created');
        expect(eventsCalled[1]).toEqual('updated');

        // it makes sense since we executed state change and therefore triggered next render
        // before the first one finished
        expect(eventsCalled[2]).toEqual('rendered');
        expect(eventsCalled[3]).toEqual('rendered');
    });

    it('should properly render component even if lifecycle callbacks are not set', () => {
        const node = document.createElement('foo');
        let element;

        render(node, () => {
            element = component('div').render(() => {
                el('span', () => text('Test'));
            });
        });

        expect(element).toBeDefined();
        expect(element.querySelector('span').innerHTML).toEqual('Test');
    });

    it('should properly render component even if no children callback is set', () => {
        const node = document.createElement('foo');
        let element;

        render(node, () => {
            element = component('div').withProps({foo: 'bar'}).render();
        });

        expect(element).toBeDefined();
        expect(element.getAttribute('foo')).toEqual('bar');
    });
});

