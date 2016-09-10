import {State} from '../src/state';

describe('State', () => {
    it('should get you a default value of given key if such key does not exist in state', () => {
        const state = new State();
        expect(state.get('foo', 'bar')).toEqual('bar');
    });

    it('should store set value and dispatch a callback when it\'s done', () => {
        let callbackWasCalled = false;
        let state;

        const callback = (state, key, newVal, oldVal) => {
            callbackWasCalled = true;
            expect(state).toBe(state);
            expect(key).toBe('lorem');
            expect(oldVal).toBe('foo');
            expect(newVal).toBe('ipsum');
        };

        state = new State();
        state.set('lorem', 'foo');
        state.set('lorem', 'ipsum', callback);

        expect(callbackWasCalled).toBeTruthy();
        expect(state.get('lorem')).toEqual('ipsum');
    });

    it('should be marked as initial unless a value was set on it', () => {
        const state = new State();
        expect(state.isInitial()).toBeTruthy();

        state.get('foo');
        expect(state.isInitial()).toBeTruthy();

        state.set('foo', 'bar');
        expect(state.isInitial()).toBeFalsy();

        state.set('foo', undefined);
        expect(state.isInitial()).toBeFalsy();

        state.set('foo', 'dolor');
        expect(state.isInitial()).toBeFalsy();

        state.set('lorem', 'ipsum');
        expect(state.isInitial()).toBeFalsy();
    });
});