const archetype = "Vaylantz";
const searchCondition = "FRAME == %field_spell% && NAME == %$archetype% && NAME != $name";
const opponentFieldSpellZone = "{{{|{$player_index - 1}|}*100}+9}";

"commands":[
    {
        "conditions":{
            "control_self":"$searchCondition",
            "zone":0
        },
        "trigger_list":[9,109],
        "msg":"Resolve $name's on-activation effect?",
        "options":[
            {
                "label":"Place 1 \"$archetype\" Field Spell from your Deck face-up in your opponent's Field Zone, except \"$name\"",
                "script":{
                    debug;
                    opp;
                    source=$opponentFieldSpellZone;
                    dest=2;
                    up_to;
                    rand=75;
                    self;
                    rand=75;
                    opp;
                    search(0, $opponentFieldSpellZone, [0], "$searchCondition");
                }
            }
        ]
    }
]
