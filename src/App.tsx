import type { Component } from 'solid-js';

const App: Component = () => {
    return (
        <div class="flex bg-slate-800 h-screen w-screen text-white">
            <nav class="bg-slate-900 w-1/12">
                <div class="bg-slate-800 w-full aspect-square">100</div>
            </nav>
            <nav></nav>
            <main></main>
        </div>
    );
};

export default App;
