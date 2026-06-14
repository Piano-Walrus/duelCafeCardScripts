var archetype = "Sky Striker";
var ace = "$archetype Ace - ";
var rayeCondition = "NAME == $aceRaye";
var rozeCondition = "NAME == $aceRoze";
var bothConditions = "$rayeCondition || $rozeCondition";
var hasSpellCondition = "ATTR == spell && NAME == %$archetype%";

"commands":[
    {
        "conditions":{
            "AND":[
                {
                    "control_self":"$rayeCondition",
                    "zone_list":[0,2]
                },
                {
                    "control_self":"$rozeCondition",
                    "zone_list":[0,2]
                }
            ]
        },
        "trigger":2,
        "msg":"Resolve $name's Quick Effect?",
        "options":[
            "label=Special Summon 1 \"$aceRaye\" and 1 \"$aceRoze\" from your Deck and/or GY¬search(0,255,[0,2],\"$bothConditions\")¬then¬break_if(\"$num_searched < 2\")¬search(0,255,[0,2],\"$bothConditions\")"
        ]
    },
    {
        "conditions":{
            "control_self":"$hasSpellCondition",
            "zone_list":[0,2]
        },
        "trigger_list":[8,108,10,11,12,13,14],
        "msg":"Resolve $name's on-summon effect?",
        "options":[
            "label=Add 1 \"$archetype\" Spell from your Deck or GY to your hand¬search(0,255,[0,2],\"$hasSpellCondition\")"
        ]
    }
]
