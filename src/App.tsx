import { Component } from 'solid-js';
import { setState, state, useTitleBar } from './fileMenu';

const App: Component = () => {
    useTitleBar();

    return (
        <div class="flex flex-col bg-slate-700 h-screen w-screen justify-center items-center text-white">
            <h1>{state.count}</h1>
            <button onClick={() => setState('count', (x) => x + 1)}>+1</button>
        </div>
    );
};

export default App;
