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
        <div class="flex bg-slate-700 h-screen w-screen justify-center items-center text-white">
            <section class="w-1/4 p-20">
                <h1 class="text-center font-semibold text-sm">Prepared</h1>
                <ul class="border border-black rounded overflow-hidden shadow-md">
                    <For each={preparedSpells()}>
                        {(spell) => (
                            <li class="px-4 py-2 bg-slate-600 hover:bg-slate-500 border-b last:border-none border-black">
                                {spellsData[spell]?.title}
                                <button
                                    onClick={() =>
                                        setState('spells', (x) =>
                                            x.filter((it) => it !== spell),
                                        )
                                    }
                                >
                                    {'->'}
                                </button>
                            </li>
                        )}
                    </For>
                </ul>
            </section>
            <section class="w-1/4 p-20">
                <h1 class="text-center font-semibold text-sm">Class List</h1>
                <ul class="border border-black rounded overflow-hidden shadow-md">
                    <For each={unpreparedSpells()}>
                        {(spell) => (
                            <li class="px-4 py-2 bg-slate-600 hover:bg-slate-500 border-b last:border-none border-black">
                                <button
                                    onClick={() =>
                                        setState('spells', (x) => [...x, spell])
                                    }
                                >
                                    {'<-'}
                                </button>
                                {spellsData[spell]?.title}
                            </li>
                        )}
                    </For>
                </ul>
            </section>
        </div>
    );
};

export default App;
