import { Component, createMemo, For } from 'solid-js';
import { setState, state, useTitleBar } from './fileMenu';

const spells = [1, 2, 3, 4, 5, 6];

const App: Component = () => {
    useTitleBar();

    const preparedSpells = createMemo(() =>
        state.spells.slice().sort((a, b) => a - b),
    );
    const unpreparedSpells = createMemo(() =>
        spells
            .filter((it) => !state.spells.includes(it))
            .slice()
            .sort((a, b) => a - b),
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
