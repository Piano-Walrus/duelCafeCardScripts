const archetype = "Kashtira";
const searchCondition = "IS_MONSTER && NAME == %$archetype%";

"commands":[
    {
        "conditions":{
            "control_self":"$searchCondition",
            "zone":0
        },
        "msg":"Resolve $name's ignition effect?",
        "options":[
            "label=Add 1 \"$archetype\" monster from your Deck to your hand¬search(0,255,[0],\"$searchCondition\")"
        ]
    }
]