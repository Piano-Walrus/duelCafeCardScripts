var archetype = "Radiant Typhoon";
var mst = "Mystical Space Typhoon";
var searchRtCondition = "NAME == %$archetype% && NAME != $name";
var searchMstCondition = "NAME == $mst";
var searchCondition = "($rtCondition) || $searchMstCondition";

"commands":[
    {
        "conditions":{
            "control_self":"$searchCondition",
            "zone_list":[0,2]
        },
        "trigger_range":[10,14],
        "msg":"Resolve $name's on-summon effect?",
        "options":[
            "label=Add 1 \"$archetype\" card (except \"$archetype Krosea\") and/or 1 \"$mst\" from your Deck and/or GY to your hand¬search(0,255,[0,2],\"$searchCondition\")¬then¬break_if(\"$num_searched != 1\")¬search(0,255,[0,2],\"{$name_searched == $mst ? $searchRtCondition : $searchMstCondition}\")"
        ]
    }
]
