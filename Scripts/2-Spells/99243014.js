const isSynchro = "TYPES == synchro";

"commands":[
    {
        "conditions":{
            "control_self":"$isSynchro && DESC == \"% && DESC == %\" + %",
            "zone":1
        },
        "trigger_range":[20,24],
        "options":[
            {
                "label":"Reveal 1 Synchro Monster in your Extra Deck, then add to your hand or Special Summon 1 of the Synchro Materials mentioned on it from your Deck or GY",
                "script":{
                    search(1,255,[1],"$isSynchro && DESC == \"% && DESC == %\" + %");
                    $revealedCard="$name_searched";
                    break_if("$num_searched != 1");
                    break_if("{count(0, \"$desc_searched == \\\"NAME\\\" + %\")} < 1");
                    search(0,255,[0,2],"$desc_searched == \"NAME\" + %");
                    source=6;
                    dest=1;
                    excavate_until("NAME == $revealedCard");
                }
            }
        ]
    }
]
