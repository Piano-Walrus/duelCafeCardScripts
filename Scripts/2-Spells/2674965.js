var archetype = "Argostars";

"commands":[
    {
        "conditions":[
            {
                "control_self":"FRAME == %continuous_trap%",
                "zone_range":[10,14]
            },
            {
                "control_self":"NAME == %$archetype%",
                "zone_range":[2,3]
            }
        ],
        "msg":"Resolve one of $name's effects?",
        "options":[
            "label=Pay 1000 LP; add 1 \"$archetype\" card from your GY or banishment to your hand¬is_cost¬add_lp=-1000¬is_eff¬search(2,255,[2,3],\"NAME == %$archetype%\")",
            "label=Inflict 500 damage to your opponent¬condition=0¬opp¬add_lp=-500"
        ]
    }
]
