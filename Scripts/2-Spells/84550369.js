const archetype = "Mikanko";
const sendCondition = "NAME == %$archetype% && NAME != $name";
const setCondition = "IS_SPELL_OR_TRAP && $sendCondition";

"commands":[
    {
        "conditions":{
            "control_self":"$sendCondition",
            "zone":0
        },
        "trigger_range":[20,24],
        "options":[
            "label=Send 1 \"$archetype\" card from your Deck to the GY, except \"$name\", then you can Set 1 \"$archetype\" Spell/Trap from your Deck, except \"$name\"¬search(0,2,[0],\"$sendCondition\",-1,2)¬then¬break_if(\"{count(0,\\\"$setCondition\\\")} < 1\")¬search(0,255,[0],\"$setCondition\")"
        ]
    }
]
