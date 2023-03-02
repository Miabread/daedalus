import { Component, createMemo, For, Match, Switch } from 'solid-js';
import { createStore } from 'solid-js/store';
import * as spells from './data/spells';
import { setState, state, useTitleBar } from './fileMenu';
import { SpellList } from './SpellList';

interface SortingOptions {
    level?: spells.Level;
    school?: spells.School;
    className?: spells.ClassName;
}

const isDefined = <T,>(value: T | undefined): value is T => value !== undefined;

const App: Component = () => {
    useTitleBar();

    const [sortingOptions, setSortingOptions] = createStore({} as SortingOptions);

    const sortSpells = (spellIds: string[]) =>
        spellIds
            .map((spellId) => spells.data[spellId])
            .filter((spell): spell is spells.SpellData => !!spell)
            .filter(
                (spell) =>
                    (!isDefined(sortingOptions.level) || sortingOptions.level === spell.level) &&
                    (!isDefined(sortingOptions.school) || sortingOptions.school === spell.school) &&
                    (!isDefined(sortingOptions.className) || spell.spellLists.includes(sortingOptions.className)),
            )
            .sort((a, b) => {
                if (a.level > b.level) return 1;
                if (a.level < b.level) return -1;
                return a.title.localeCompare(b.title);
            });

    const preparedSpells = createMemo(() => sortSpells(state.spells.slice()));
    const unpreparedSpells = createMemo(() =>
        sortSpells(
            Object.keys(spells.data)
                .filter((spellId) => !state.spells.includes(spellId))
                .slice(),
        ),
    );

    return (
        <div class="flex flex-col justify-center items-center bg-slate-900 h-screen w-screen">
            <div class="flex justify-center items-center text-black">
                <select
                    onChange={(e) => {
                        setSortingOptions(
                            'level',
                            e.currentTarget.value ? (parseInt(e.currentTarget.value) as spells.Level) : undefined,
                        );
                    }}
                >
                    <option value="">Level</option>
                    <option disabled>──────────</option>
                    <For each={spells.levels}>{(it) => <option value={it}>{it}</option>}</For>
                </select>
                <select
                    onChange={(e) => {
                        setSortingOptions(
                            'school',
                            e.currentTarget.value ? (e.currentTarget.value as spells.School) : undefined,
                        );
                    }}
                >
                    <option value="">School</option>
                    <option disabled>──────────</option>
                    <For each={spells.schools}>{(it) => <option value={it}>{it}</option>}</For>
                </select>
                <select
                    onChange={(e) => {
                        setSortingOptions(
                            'className',
                            e.currentTarget.value ? (e.currentTarget.value as spells.ClassName) : undefined,
                        );
                    }}
                >
                    <option value="">Class</option>
                    <option disabled>──────────</option>
                    <For each={spells.classNames}>{(it) => <option value={it}>{it}</option>}</For>
                </select>
            </div>
            <div class="flex justify-center items-center text-white">
                <section class="w-1/2 p-20">
                    <h1 class="text-center font-semibold">Prepared</h1>
                    <SpellList
                        spells={preparedSpells()}
                        actions={{
                            Forget(spell) {
                                setState('spells', (spells) => spells.filter((id) => id !== spell.id));
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
                                setState('spells', (spells) => [...spells, spell.id]);
                            },
                        }}
                    />
                </section>
            </div>
        </div>
    );
};

export default App;
