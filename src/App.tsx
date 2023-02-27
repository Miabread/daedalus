import { Component, createSignal } from 'solid-js';
import { appWindow } from '@tauri-apps/api/window';
import { open, save } from '@tauri-apps/api/dialog';
import { readTextFile, writeTextFile } from '@tauri-apps/api/fs';
import { basename } from '@tauri-apps/api/path';

const [openedPath, setOpenedPath] = createSignal<string>();
const [text, setText] = createSignal('');

const newFile = () => {
    setText(() => '');
    setOpenedPath();
};

const openFile = async () => {
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

    setText(await readTextFile(path));
    setOpenedPath(path);
};

const saveFile = async () => {
    const path =
        openedPath() ??
        (await save({
            filters: [
                {
                    name: 'Text',
                    extensions: ['txt'],
                },
            ],
        }));

    if (!path) return;

    await writeTextFile(path, text());
    setOpenedPath(path);
};

const saveAsFile = async () => {
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
    setOpenedPath(path);
};

const cancelMenuHandler = appWindow.onMenuClicked(async (event) => {
    if (event.payload === 'new') newFile();
    if (event.payload === 'open') await openFile();
    if (event.payload === 'save') await saveFile();
    if (event.payload === 'save_as') await saveAsFile();

    const name = openedPath() ? await basename(openedPath()!) : 'Untitled';
    appWindow.setTitle(`${name} - Daedalus`);
});

import.meta.hot?.dispose(async () => (await cancelMenuHandler)());

const handleKeypress = async (event: KeyboardEvent): Promise<void> => {
    if (event.key === 'n' && event.ctrlKey) newFile();
    if (event.key === 'o' && event.ctrlKey) await openFile();
    if (event.key === 's' && event.ctrlKey && !event.shiftKey) await saveFile();
    if (event.key === 's' && event.ctrlKey && event.shiftKey) {
        event.preventDefault();
        await saveAsFile();
    }

    const name = openedPath() ? await basename(openedPath()!) : 'Untitled';
    appWindow.setTitle(`${name} - Daedalus`);
};
addEventListener('keydown', handleKeypress);

import.meta.hot?.dispose(async () => {
    (await cancelMenuHandler)();
    removeEventListener('keydown', handleKeypress);
});

const App: Component = () => {
    return (
        <div class="flex flex-col bg-slate-700 h-screen w-screen justify-center items-center">
            {openedPath}
            <textarea onInput={(e) => setText(e.currentTarget.value)}>
                {text}
            </textarea>
        </div>
    );
};

export default App;
