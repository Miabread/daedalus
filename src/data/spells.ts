type Source = 'players_handbook';
type Level = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
type School =
    | 'abjuration'
    | 'conjuration'
    | 'divination'
    | 'enchantment'
    | 'evocation'
    | 'illusion'
    | 'necromancy'
    | 'transmutation';
type UnitAmount<T> = { amount: number; unit: T };
type CastingTime = UnitAmount<'action'>;
type Range = 'touch' | UnitAmount<'feet'>;
type Components = { V?: boolean; S?: boolean; M?: string };
type Duration = UnitAmount<'round' | 'minute'>;
type ClassName =
    | 'artificer'
    | 'bard'
    | 'cleric'
    | 'druid'
    | 'paladin'
    | 'ranger'
    | 'sorcerer'
    | 'warlock'
    | 'wizard';

export interface SpellData {
    id: string;
    title: string;
    source: Source;
    level: Level;
    school: School;
    ritual?: boolean;
    castingTime: CastingTime;
    range: Range;
    components: Components;
    duration: Duration;
    concentration?: boolean;
    spellLists: ClassName[];
    description: string[];
}

export const sortSpells = (a: string, b: string) => {
    const dataA = spellsData[a];
    const dataB = spellsData[b];

    if (!dataA || !dataB) return a.localeCompare(b);

    return dataA.title.localeCompare(dataB.title);
};

export const getWikiLink = (spell: string) => {
    return 'http://dnd5e.wikidot.com/spell:' + spell.replace('_', '-');
};

export const spellsData: Record<string, SpellData | undefined> = {
    guidance: {
        id: 'guidance',
        title: 'Guidance',
        source: 'players_handbook',
        level: 0,
        school: 'divination',
        castingTime: { amount: 1, unit: 'action' },
        range: 'touch',
        components: { V: true, S: true },
        duration: { amount: 1, unit: 'minute' },
        concentration: true,
        spellLists: ['artificer', 'cleric', 'druid'],
        description: [
            'You touch one willing creature. Once before the spell ends, the target can roll a d4 and add the number rolled to one ability check of its choice. It can roll the die before or after making the ability check. The spell then ends.',
        ],
    },
    message: {
        id: 'message',
        title: 'Message',
        source: 'players_handbook',
        level: 0,
        school: 'transmutation',
        castingTime: { amount: 1, unit: 'action' },
        range: { amount: 120, unit: 'feet' },
        components: { V: true, S: true, M: 'a short piece of copper wire' },
        duration: { amount: 1, unit: 'round' },
        spellLists: ['artificer', 'bard', 'sorcerer', 'wizard'],
        description: [
            'You point your finger toward a creature within range and whisper a message. The target (and only the target) hears the message and can reply in a whisper that only you can hear.',
            "You can cast this spell through solid objects if you are familiar with the target and know it is beyond the barrier. Magical silence, 1 foot of stone, 1 inch of common metal, a thin sheet of lead, or 3 feet of wood blocks the spell. The spell doesn't have to follow a straight line and can travel freely around corners or through openings.",
        ],
    },
    faerie_fire: {
        id: 'faerie_fire',
        title: 'Faerie Fire',
        source: 'players_handbook',
        level: 1,
        school: 'evocation',
        castingTime: { amount: 1, unit: 'action' },
        range: { amount: 60, unit: 'feet' },
        components: { V: true },
        duration: { amount: 1, unit: 'minute' },
        concentration: true,
        spellLists: ['artificer', 'bard', 'druid'],
        description: [
            'Each object in a 20-foot cube within range is outlined in blue, green, or violet light (your choice).',
            'Any creature in the area when the spell is cast is also outlined in light if it fails a Dexterity saving throw. For the duration, objects and affected creatures shed dim light in a 10-foot radius.',
            "Any attack roll against an affected creature or object has advantage if the attacker can see it, and the affected creature or object can't benefit from being invisible.",
        ],
    },
};
