import { Item, Menu, useContextMenu } from 'solid-contextmenu';
import type { Component } from 'solid-js';

const Fuck: Component = () => {
    const ID = 1;
    const { show } = useContextMenu({ id: ID, props: 'lala' });
    return (
        <div
            class="bg-slate-800 w-full aspect-square rounded-full hover:rounded-3xl flex items-center justify-center text-3xl"
            onClick={() => {
                console.log('click');
            }}
            onContextMenu={(e) => {
                console.log('test');
                show(e, { props: 1 });
            }}
        >
            <span>A</span>
            <Menu id={ID} theme="dark">
                <Item>Test</Item>
                <Item>Test</Item>
                <Item>Test</Item>
            </Menu>
        </div>
    );
};

const App: Component = () => {
    return (
        <div class="flex bg-slate-700 h-screen w-screen text-white">
            <nav class="bg-slate-900 w-20 p-2">
                <Fuck />
            </nav>
            <nav class="bg-slate-800 w-60"></nav>
            <main></main>
        </div>
    );
};

export default App;
