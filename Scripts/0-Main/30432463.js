const archetype = "Vaalmonica";

"commands":[
    {
        "trigger_range":[23,24],
        "options":[
            "label=Scale \"Angello $archetype\" in your other Pendulum Zone¬source=0¬dest={|{{$trigger-23}-1}|+23}¬target=3048768¬place=1"
        ]
    },
    {
        "msg":"Resolve $name's ignition effect?",
        "options":[
            "label=Banish 1 \"$archetype\" Normal Spell/Trap from your GY¬search(2,3,[2],\"IS_SPELL_OR_TRAP && NAME == %$archetype% && FRAME == %normal%\",-1,20,false)"
        ]
    }
]
