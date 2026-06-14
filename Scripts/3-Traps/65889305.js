var archetype = "Argostars";
var searchCondition = "NAME == %$archetype% && NAME != $name";

"commands":[
    {
        "conditions":{
            "AND":[
                {
                    "prev_range":[20,24]
                },
                {
                    "control_self":"$searchCondition",
                    "zone":0
                },
                {
                    "control_self":0,
                    "zone_range":[2,3]
                }
            ]
        },
        "trigger_range":[10,14],
        "options":[
            "label=Add 1 \"$archetype\" card from your Deck to your hand, except \"$name\"¬search(0,255,[0],\"$searchCondition\")"
        ]
    }
]
