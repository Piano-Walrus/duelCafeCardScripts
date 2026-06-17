const archetype = "Junk";
const searchCondition = "NAME == %$archetype% && NAME != $name";

"commands":[
    {
        "conditions":{
            "control_self":"$searchCondition",
            "zone":0
        },
        "trigger_range":[10,14],
        "msg":"Resolve $name's on-summon effect?",
        "options":[
            "label=Add 1 \"$archetype\" card from your Deck to your hand, except \"$name\"¬search(0,255,[0],\"$searchCondition\")"
        ]
    }
]