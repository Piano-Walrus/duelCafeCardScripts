const mst = "Mystical Space Typhoon";
const archetype = "Radiant Typhoon";
const searchCondition = "NAME == $mst";
const placeCondition = "NAME == %$archetype% && FRAME == %continuous_trap%";

"commands":[
    {
        "conditions":{
            "control_self":"$searchCondition",
            "zone_list":[0,2]
        },
        "trigger_list":[8,108,10,11,12,13,14],
        "msg":"Resolve $name's on-summon effect?",
        "options":[
            "label=Add 1 \"$mst\" card from your Deck or GY to your hand¬search(0,255,[0,2],\"$searchCondition\")"
        ]
    },
    {
        "conditions":{
            "control_self":"$placeCondition",
            "zone_list":[0,2]
        },
        "msg":"Resolve $name's trigger effect?",
        "options":[
            "label=Place 1 \"$archetype\" Continuous Trap from your Deck or GY, face-up on your field¬search(0,255,[0,2],\"$placeCondition\")"
        ]
    }
]
