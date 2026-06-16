const archetype = "Fur Hire";
const recycleCondition = "NAME == %$archetype%";
const searchCondition = "IS_SPELL_OR_TRAP && $recycleCondition";

"commands":[
    {
        "conditions":{
            "control_self":"$searchCondition",
            "zone":0
        },
        "trigger_range":[10,14],
        "msg":"Resolve $name's on-summon effect?",
        "options":[
            "label=Add 1 Spell/Trap \"$archetype\" from your Deck to your hand¬search(0,255,[0],\"$searchCondition\")"
        ]
    },
    {
        "conditions":{
            "AND":[
                {
                    "control_self":"$recycleCondition",
                    "zone":2
                },
                {
                    "control_self":"IS_MONSTER && $recycleCondition",
                    "zone_list":[8,108,10,11,12,13,14]
                }
            ]
        },
        "trigger":3,
        "msg":"Resolve $name's GY effect?",
        "options":[
            "label=Add to your hand, or Special Summon, 1 card \"$archetype\" in your GY¬search(2,255,[2],\"$recycleCondition\")"
        ]
    }
]
