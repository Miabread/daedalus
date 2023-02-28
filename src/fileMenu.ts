import { createEffect, createSignal } from 'solid-js';
import { appWindow } from '@tauri-apps/api/window';
import { open, save } from '@tauri-apps/api/dialog';
import { readTextFile, writeTextFile } from '@tauri-apps/api/fs';
import { basename } from '@tauri-apps/api/path';

const [openedPath, setOpenedPath] = createSignal<string>();
export const [hasSaved, setHasSaved] = createSignal(true);
export const [text, setText] = createSignal('');

const newFile = () => {
    setText('');
    setOpenedPath();
    setHasSaved(true);
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
    setHasSaved(true);
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
    setHasSaved(true);
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
    setHasSaved(true);
};

const cancelMenuHandler = appWindow.onMenuClicked(async (event) => {
    if (event.payload === 'new') newFile();
    if (event.payload === 'open') await openFile();
    if (event.payload === 'save') await saveFile();
    if (event.payload === 'save_as') await saveAsFile();
});

import.meta.hot?.dispose(async () => (await cancelMenuHandler)());

const handleKeypress = async (event: KeyboardEvent): Promise<void> => {
    if (event.key === 'n' && event.ctrlKey) newFile();
    if (event.key === 'o' && event.ctrlKey) await openFile();
    if (event.key === 's' && event.ctrlKey) await saveFile();
    if (event.key === 'S' && event.ctrlKey) await saveAsFile();
};
addEventListener('keydown', handleKeypress);

import.meta.hot?.dispose(async () => {
    (await cancelMenuHandler)();
    removeEventListener('keydown', handleKeypress);
});

export const useFileMenu = () => {
    createEffect(async () => {
        const save = hasSaved() ? '' : '*';
        const name = openedPath() ? await basename(openedPath()!) : 'Untitled';
        appWindow.setTitle(`${save}${name} - Daedalus`);
        console.log(save);
    });
};
