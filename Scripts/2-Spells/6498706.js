const isFusion = "TYPES == fusion";

"commands":[
    {
        "conditions":{
            "control_self":"$isFusion && DESC == \"% && DESC == %\" + %",
            "zone":1
        },
        "trigger_range":[20,24],
        "options":[
            {
                "label":"Reveal 1 Fusion Monster in your Extra Deck, then Special Summon 1 of the Fusion Materials mentioned on it from your hand or Deck",
                "script":{
                    search(1,4,[1],"$isFusion && DESC == \"% && DESC == %\" + %");
                    then;
                    $revealedCard=$name_searched;
                    break_if("$num_searched != 1");
                    break_if("{count(0, \"IS_MONSTER && $desc_searched == \\\"NAME\\\" + %\")} < 1");
                    search(0,255,[0],"IS_MONSTER && $desc_searched == \"NAME\" + %");
                    then;
                    source=4;
                    dest=1;
                    excavate_until("NAME == $revealedCard");
                }
            }
        ]
    }
]