const monsterCondition = "IS_MONSTER";
const gmxCondition = "NAME == %GMX%";
const dinoCondition = "TYPES == dinosaur";
const fusionCondition = "$gmxCondition && $monsterCondition && TYPES == fusion";

"commands":[
    {
        "conditions":{
            "control_self":"$monsterCondition && $gmxCondition && $dinoCondition",
            "zone":0
        },
        "trigger_range":[20,24],
        "options":[
            {
                "label":"Excavate the top cards of your Deck until you have excavated a \"GMX\" monster and a Dinosaur monster, lose 400 LP for each excavated card, then you can Fusion Summon 1 \"GMX\" Fusion Monster from your Extra Deck",
                "script":{
                    source=0;
                    dest=2;
                    excavate_until("$monsterCondition && ($gmxCondition || $dinoCondition)");
                    add_lp={0 - {$num_excavated * 400}};
                    excavate_until("$monsterCondition && {$types_searched == %Dinosaur% ? $gmxCondition : $dinoCondition}");
                    add_lp={0 - {$num_excavated * 400}};
                    search(1,255,[1],"$fusionCondition");
                }
            },
            {
                "label":"Test label",
                "script":{
                    testScript=0;
                    source=0;
                    rand=5;
                }
            }
        ]
    }
]
