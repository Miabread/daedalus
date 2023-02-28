import { Component, createMemo, For } from 'solid-js';
import { sortSpells, spellsData } from './data/spells';
import { setState, state, useTitleBar } from './fileMenu';

const App: Component = () => {
    useTitleBar();

    const preparedSpells = createMemo(() =>
        state.spells.slice().sort(sortSpells),
    );
    const unpreparedSpells = createMemo(() =>
        Object.keys(spellsData)
            .filter((it) => !state.spells.includes(it))
            .slice()
            .sort(sortSpells),
    );

    return (
        <div class="flex bg-slate-900 h-screen w-screen justify-center items-center text-white">
            <section class="w-1/4 p-20">
                <h1 class="text-center font-semibold">Test</h1>
                <table class="w-full">
                    <thead class="border border-black rounded shadow-md">
                        <tr class="px-4 py-2 bg-slate-800 border-b border-black">
                            <th>Name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody class="border border-black rounded shadow-md">
                        <For each={preparedSpells()}>
                            {(spell) => (
                                <tr class="px-4 py-2 bg-slate-700 hover:bg-slate-600 border-b last:border-none border-black">
                                    <td>{spellsData[spell]?.title}</td>
                                    <td>
                                        <button
                                            onClick={() =>
                                                setState('spells', (x) =>
                                                    x.filter(
                                                        (it) => it !== spell,
                                                    ),
                                                )
                                            }
                                        >
                                            Forget
                                        </button>
                                    </td>
                                </tr>
                            )}
                        </For>
                    </tbody>
                </table>
            </section>
            <section class="w-1/4 p-20">
                <h1 class="text-center font-semibold">Test</h1>
                <table class="w-full">
                    <thead class="border border-black rounded shadow-md">
                        <tr class="px-4 py-2 bg-slate-800 border-b border-black">
                            <th>Name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody class="border border-black rounded shadow-md">
                        <For each={unpreparedSpells()}>
                            {(spell) => (
                                <tr class="px-4 py-2 bg-slate-700 hover:bg-slate-600 border-b last:border-none border-black">
                                    <td>{spellsData[spell]?.title}</td>
                                    <td>
                                        <button
                                            onClick={() =>
                                                setState('spells', (x) => [
                                                    ...x,
                                                    spell,
                                                ])
                                            }
                                        >
                                            Prepare
                                        </button>
                                    </td>
                                </tr>
                            )}
                        </For>
                    </tbody>
                </table>
            </section>
        </div>
    );
};

export default App;
