import { createEffect, createSignal } from 'solid-js';
import { appWindow } from '@tauri-apps/api/window';
import { message, open, save, confirm } from '@tauri-apps/api/dialog';
import { readTextFile, writeTextFile } from '@tauri-apps/api/fs';
import { basename } from '@tauri-apps/api/path';
import { createStore } from 'solid-js/store';
import { z } from 'zod';
import { shell } from '@tauri-apps/api';

export const schema = z
    .object({
        count: z.number().default(0),
    })
    .default({});

const [openedPath, setOpenedPath] = createSignal<string>();
export const [hasSaved, setHasSaved] = createSignal(true);
const [state, setState] = createStore(schema.parse(undefined));

const updateState: typeof setState = (...args: any[]) => {
    //@ts-ignore
    setState(...args);
    setHasSaved(false);
};

export { state, updateState as setState };

const filters = [
    {
        name: 'Character',
        extensions: ['chr'],
    },
];

const menuHandlers: Record<string, (() => Promise<void>) | undefined> = {
    async new() {
        if (!hasSaved()) {
            const continueAnyways = await confirm(
                "The current character hasn't been saved. Start a new one anyways?",
                { type: 'warning' },
            );

            if (!continueAnyways) return;
        }

        setState(schema.parse(undefined));
        setOpenedPath();
        setHasSaved(true);
    },

    async open() {
        if (!hasSaved()) {
            const continueAnyways = await confirm(
                "The current character hasn't been saved. Open a new one anyways?",
                { type: 'warning' },
            );

            if (!continueAnyways) return;
        }

        const path = await open({
            multiple: false,
            directory: false,
            filters,
        });

        if (typeof path !== 'string') return;

        const content = await readTextFile(path);

        try {
            const state = schema.parse(JSON.parse(content));
            setState(state);
            setOpenedPath(path);
            setHasSaved(true);
        } catch {
            message('Invalid file format :(', { type: 'error' });
        }
    },

    async save() {
        const path = openedPath() ?? (await save({ filters }));

        if (!path) return;

        await writeTextFile(path, JSON.stringify(state));
        setOpenedPath(path);
        setHasSaved(true);
    },

    async saveAs() {
        const path = await save({ filters });

        if (!path) return;

        await writeTextFile(path, JSON.stringify(state));
        setOpenedPath(path);
        setHasSaved(true);
    },

    async github() {
        await shell.open('https://github.com/Ambread/daedalus');
    },

    async about() {
        await message(':3');
    },
};

const cancelMenuHandler = appWindow.onMenuClicked(async (event) => {
    await menuHandlers[event.payload]?.();
});

import.meta.hot?.dispose(async () => {
    (await cancelMenuHandler)();
});

export const useTitleBar = () => {
    createEffect(async () => {
        const save = hasSaved() ? '' : '*';
        const name = openedPath() ? await basename(openedPath()!) : 'Untitled';
        appWindow.setTitle(`${save}${name} - Daedalus`);
    });
};
