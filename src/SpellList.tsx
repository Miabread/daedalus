import { shell } from '@tauri-apps/api';
import { Component, For, JSX } from 'solid-js';
import { getWikiLink, SpellData } from './data/spells';

interface Props {
    spells: SpellData[];
    actions: Record<string, (spell: SpellData) => void>;
}

export const SpellList: Component<Props> = (props) => {
    return (
        <table class="w-full">
            <thead class="border border-black rounded shadow-md">
                <tr class="px-4 py-2 bg-slate-800 border-b border-black">
                    <th class="font-semibold p-2 text-left">Name</th>
                    <th class="font-semibold p-2">Level</th>
                    <th class="font-semibold p-2">Casting Time</th>
                    <th class="font-semibold p-2">Range</th>
                    <th class="font-semibold p-2">Duration</th>
                    <th class="font-semibold p-2">Actions</th>
                </tr>
            </thead>
            <tbody class="border border-black rounded shadow-md">
                <For each={props.spells}>
                    {(spell) => (
                        <tr class="px-4 py-2 bg-slate-700 hover:bg-slate-600 border-b last:border-none border-black">
                            <td class="p-2">
                                <span
                                    class="hover:underline font-semibold"
                                    onClick={() => shell.open(getWikiLink(spell.id))}
                                >
                                    {spell.title}
                                </span>
                            </td>
                            <td class="text-center p-2">{spell.level}</td>
                            <td class="text-center p-2">
                                {spell.castingTime.amount} {spell.castingTime.unit}
                                {spell.ritual && ' or ritual'}
                            </td>
                            <td class="text-center p-2">
                                {spell.range === 'touch' ? 'Touch' : `${spell.range.amount} ${spell.range.unit}`}
                            </td>
                            <td class="text-center p-2">
                                {spell.concentration && 'Conc '}
                                {spell.duration.amount} {spell.duration.unit}
                            </td>
                            <td class="text-center p-2">
                                <For each={Object.entries(props.actions)}>
                                    {([name, action]) => (
                                        <button onClick={() => action(spell)} class="underline">
                                            {name}
                                        </button>
                                    )}
                                </For>
                            </td>
                        </tr>
                    )}
                </For>
            </tbody>
        </table>
    );
};
