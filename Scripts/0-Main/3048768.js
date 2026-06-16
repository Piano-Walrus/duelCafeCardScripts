const archetype = "Vaalmonica";

"commands":[
    {
        "trigger_range":[23,24],
        "options":[
            "label=Scale \"Dimonno $archetype\" in your other Pendulum Zone¬source=0¬dest={|{{$trigger-23}-1}|+23}¬target=30432463¬place=1"
        ]
    },
    {
        "msg":"Resolve $name's ignition effect?",
        "options":[
            "label=Banish 1 \"$archetype\" Normal Spell/Trap from your GY¬search(2,3,[2],\"NAME == %$archetype% && FRAME == %normal% && spell_trap == %ATTR%\",-1,20,false)"
        ]
    }
]
