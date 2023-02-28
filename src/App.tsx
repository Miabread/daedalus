import { Component, createMemo, For, Match, Switch } from 'solid-js';
import { sortSpells, SpellData, spellsData } from './data/spells';
import { setState, state, useTitleBar } from './fileMenu';
import { SpellList } from './SpellList';

const App: Component = () => {
    useTitleBar();

    const preparedSpells = createMemo(() =>
        state.spells
            .slice()
            .sort(sortSpells)
            .map((spellId) => spellsData[spellId])
            .filter((spell): spell is SpellData => !!spell),
    );

    const unpreparedSpells = createMemo(() =>
        Object.keys(spellsData)
            .filter((spellId) => !state.spells.includes(spellId))
            .slice()
            .sort(sortSpells)
            .map((spellId) => spellsData[spellId])
            .filter((spell): spell is SpellData => !!spell),
    );

    return (
        <div class="flex bg-slate-900 h-screen w-screen justify-center items-center text-white">
            <section class="w-1/2 p-20">
                <h1 class="text-center font-semibold">Prepared</h1>
                <SpellList
                    spells={preparedSpells()}
                    actions={{
                        Forget(spell) {
                            setState('spells', (x) =>
                                x.filter((it) => it !== spell.id),
                            );
                        },
                    }}
                />
            </section>
            <section class="w-1/2 p-20">
                <h1 class="text-center font-semibold">Class List</h1>
                <SpellList
                    spells={unpreparedSpells()}
                    actions={{
                        Prepare(spell) {
                            setState('spells', (x) => [...x, spell.id]);
                        },
                    }}
                />
            </section>
        </div>
    );
};

export default App;
