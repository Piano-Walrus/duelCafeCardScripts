var archetype = "Fiendsmith";
var searchCondition = "IS_SPELL_OR_TRAP && NAME == %$archetype%";

"commands":[
    {
        "conditions":{
            "AND":[
                {
                    "prev_range":[6,7]
                },
                {
                    "control_self":"$searchCondition",
                    "zone":0
                }
            ]
        },
        "trigger":2,
        "options":[
            "label=Add 1 \"$archetype\" Spell/Trap from your Deck to your hand¬search(0,255,[0],\"$searchCondition\")"
        ]
    }
]
