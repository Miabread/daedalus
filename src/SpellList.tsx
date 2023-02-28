import { Component, For, JSX } from 'solid-js';
import { SpellData } from './data/spells';

interface Props {
    spells: SpellData[];
    actions: Record<string, (spell: SpellData) => void>;
}

export const SpellList: Component<Props> = (props) => {
    return (
        <table class="w-full">
            <thead class="border border-black rounded shadow-md">
                <tr class="px-4 py-2 bg-slate-800 border-b border-black">
                    <th class="p-2 text-left">Name</th>
                    <th class="p-2">Time</th>
                    <th class="p-2">Range</th>
                    <th class="p-2">Actions</th>
                </tr>
            </thead>
            <tbody class="border border-black rounded shadow-md">
                <For each={props.spells}>
                    {(spell) => (
                        <tr class="px-4 py-2 bg-slate-700 hover:bg-slate-600 border-b last:border-none border-black">
                            <td class="p-2">{spell.title}</td>
                            <td class="text-center p-2">
                                {spell.castingTime.amount}{' '}
                                {spell.castingTime.unit}
                            </td>
                            <td class="text-center p-2">
                                {spell.range === 'touch'
                                    ? 'Touch'
                                    : `${spell.range.amount} ${spell.range.unit}`}
                            </td>
                            <td class="text-center p-2">
                                <For each={Object.entries(props.actions)}>
                                    {([name, action]) => (
                                        <button
                                            onClick={() => action(spell)}
                                            class="underline"
                                        >
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
