var archetype = "Sky Striker Ace -";
var searchCondition = "NAME == $archetype Raye || NAME == $archetype Roze";

"commands":[
    {
        "conditions":{
            "control_self":"$searchCondition",
            "zone_list":[0,2]
        },
        "trigger":2,
        "msg":"Resolve $name's Quick Effect?",
        "options":[
            "label=Special Summon 1 \"$archetype Raye\" and 1 \"$archetype Roze\" from your Deck and/or GY¬search(0,255,[0,2],\"$searchCondition\")¬then¬break_if(\"$num_searched < 2\")¬search(0,255,[0,2],\"$searchCondition\")"
        ]
    }
]
