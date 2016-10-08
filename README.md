# JodiUI - Components

JodiUI Components extend [JodiUI DOM](https://github.com/jodi-ui/dom) with state and lifecycle callbacks.

## Installation

```
npm install --save jodi-ui-components
```

## Usage example
Simplest component would look like that:

```ts
import {el, text, render, s} from 'jodi-ui-dom';
import {component} from 'jodi-ui-components';

const myComponent = () => {
    component('div', s({'class': 'my-component'})).render(() => {
        el('span', () => text('Hello Jodi'));
    });
};

```

Then use it wherever you need:

```ts
const node = document.querySelector('div.app');
render(node, () => {
    el('h1', () => text('MyApp'));
    myComponent();
});
```

## Lifecycle callbacks
Lifecycle callbacks allow you to execute some code after component is rendered.
There are 3 callbacks available:
 - `whenCreated` - executed only after initial render
 - `whenUpdated` - executed when component is re-rendered
 - `whenRendered` - executed after every render (both initial and update)
 
Usage:

```ts
import {el, text, render, s} from 'jodi-ui-dom';
import {component} from 'jodi-ui-components';

const myComponent = () => {
    component('div', s({'class': 'my-component'}))
        .whenCreated((element, state) => {console.log(`I'm created`, element, state);})
        .whenUpdated((element, state) => {console.log(`I'm updated`, element, state);})
        .whenRendered((element, state) => {console.log(`I'm rendered`, element, state);})
        .render((state) => {
            el('span', () => text('Hello Jodi'));
        });
};
```

As you can see all lifecycle callbacks receive current DOM Node (element) and the *state* as arguments.

## State

State lets you keep some data on component between updates. Although you are encouraged to store a state
externally using stuff like e.g. Redux you may need to use Jodi's state. States are stored directly on
DOM elements.

Usage:

```ts
// Assign a value to a key and execute the callback
state.set('key', 'value', () => {});

// Fetch a value
state.get('key', 'defaultValue');
```


