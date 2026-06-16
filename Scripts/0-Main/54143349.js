const archetype = "Radiant Typhoon";
const mst = "Mystical Space Typhoon";
const searchCondition = "(IS_MONSTER && NAME == %$archetype% && NAME != $name) || NAME == $mst";

"commands":[
    {
        "conditions":{
            "control_self":"$searchCondition",
            "zone":0
        },
        "trigger_range":[10,14],
        "msg":"Resolve $name's on-summon effect?",
        "options":[
            "label=Add 1 \"$archetype\" monster (except \"$name\") or 1 \"$mst\" from your Deck to your hand¬search(0,255,[0],\"$searchCondition\")"
        ]
    }
]
