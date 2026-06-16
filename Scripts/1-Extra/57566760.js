const archetype = "Mikanko";
const searchCondition = "ATTR == spell && FRAME == %equip%";

"commands":[
    {
        "conditions":{
            "control_self":"$searchCondition",
            "zone_list":[0,2]
        },
        "trigger_list":[8,108,10,11,12,13,14],
        "msg":"Resolve $name's on-summon effect?",
        "options":[
            "label=Add 1 Equip Spell from your Deck or GY to your hand¬search(0,255,[0,2],\"$searchCondition\")"
        ]
    }
]
