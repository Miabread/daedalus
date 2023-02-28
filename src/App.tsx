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
        <div class="flex  bg-slate-700 h-screen w-screen justify-center items-center text-white">
            <ul>
                <For each={preparedSpells()}>
                    {(spell) => (
                        <li>
                            {spell}
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
            <ul>
                <For each={unpreparedSpells()}>
                    {(spell) => (
                        <li>
                            <button
                                onClick={() =>
                                    setState('spells', (x) => [...x, spell])
                                }
                            >
                                {'<-'}
                            </button>
                            {spell}
                        </li>
                    )}
                </For>
            </ul>
        </div>
    );
};

export default App;
