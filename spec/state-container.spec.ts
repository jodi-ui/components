import {StateContainer} from '../src/state-container';

describe('StateContainer', () => {
    it('should get you a default value of given key if such key does not exist in state', () => {
        const state = new StateContainer(() => {});
        expect(state.get('foo', 'bar')).toEqual('bar');
    });

    it('should store set value and dispatch a callback when it\'s done', () => {
        let callbackWasCalled = false;
        const callback = () => {
            callbackWasCalled = true;
        };
        const state = new StateContainer(callback);

        state.set('lorem', 'ipsum');
        expect(callbackWasCalled).toBeTruthy();
        expect(state.get('lorem')).toEqual('ipsum');
    });
});