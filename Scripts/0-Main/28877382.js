const archetype = "DoomZ";
const searchCondition = "IS_MONSTER && NAME == %$archetype% && NAME != $name";
const xyzCondition = "IS_MONSTER && ATTR == wind && TYPES == machine && TYPES == xyz && LVL == 4";

"commands":[
    {
        "conditions":{
            "control_self":"$searchCondition",
            "zone":0
        },
        "trigger_list":[2,10,11,12,13,14],
        "msg":"Resolve $name's effect upon being summoned or destroyed by card effect?",
        "options":[
            "label=Add 1 \"$archetype\" monster from your Deck to your hand, except \"$name\"¬search(0,255,[0],\"$searchCondition\")"
        ]
    },
    {
        "conditions":{
            "AND":[
                {
                    "control_self":"$xyzCondition",
                    "zone":1
                },
                {
                    "control_self":0,
                    "zone_range":[20,24]
                }
            ]
        },
        "msg":"Resolve $name's Quick Effect?",
        "options":[
            "label=Special Summon 1 WIND Machine Xyz Monster from your Extra Deck with the same Rank as this card's Level¬search(1,255,[1],\"$xyzCondition\")"
        ]
    }
]
