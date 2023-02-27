import { Component, createSignal } from 'solid-js';
import { appWindow } from '@tauri-apps/api/window';
import { open, save } from '@tauri-apps/api/dialog';
import { readTextFile, writeTextFile } from '@tauri-apps/api/fs';

const [text, setText] = createSignal('lfwfwefwefew');

appWindow.onMenuClicked(async (event) => {
    if (event.payload === 'open') {
        const path = await open({
            multiple: false,
            directory: false,
            filters: [
                {
                    name: 'Text',
                    extensions: ['txt'],
                },
            ],
        });

        if (typeof path !== 'string') return;

        const content = await readTextFile(path);
        setText(content);
    }

    if (event.payload === 'save') {
        const path = await save({
            filters: [
                {
                    name: 'Text',
                    extensions: ['txt'],
                },
            ],
        });

        if (!path) return;

        await writeTextFile(path, text());
    }
});

const App: Component = () => {
    return (
        <div class="flex bg-slate-700 h-screen w-screen  justify-center items-center">
            <textarea onChange={(e) => setText(e.currentTarget.value)}>
                {text}
            </textarea>
        </div>
    );
};

export default App;
