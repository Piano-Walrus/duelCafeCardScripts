var cond = "NAME == %Argostars% && NAME != $name";

"commands":[
    {
        "conditions":{
            "AND":[
                {
                    "prev_range":[20,24]
                },
                {
                    "control_self":"$cond",
                    "zone":0
                },
                {
                    "control_self":0,
                    "zone_range":[2,3]
                }
            ]
        },
        "trigger_range":[10,14],
        "msg":"Resolve $name's effect?",
        "options":[
            "label=Add 1 \"Argostars\" card from your Deck to your hand, except \"Argostars - Lightning Tydeu\"¬search(0,255,[0],\"$cond\")"
        ]
    }
]
