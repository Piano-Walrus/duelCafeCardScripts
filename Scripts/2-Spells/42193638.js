const arch = "Vaalmonica";
const gainMsg = "label=Gain 500 LP";
const takeMsg = "label=Take 500 damage";
const noEff = "(No Effect)";

"commands":[
    {
        "trigger_range":[20,24],
        "msg":"Gain LP or take damage to resolve one of $name's effects?",
        "options":[
            "$gainMsg, then excavate cards until you excavate a \"$arch\" card, then add that card to your hand¬source=0¬add_lp=500¬excavate_until($arch)",
            "$takeMsg, then send 1 \"$arch\" card from your Deck to your GY¬search(0, 2, [0], \"$arch\", -1, 2, true)¬add_lp=-500",
            "$gainMsg only $noEff¬add_lp=500",
            "$takeMsg only $noEff¬add_lp=-500"
        ]
    }
]
