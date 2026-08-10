const archetype = "Elemental HERO";
const halfLp = "Pay half your LP";

"commands":[
  {
    "conditions":{
      "NOT":[
        {
          "control_self":0,
          "zone_list":[8,108,10,11,12,13,14]
        }
      ]
    },
    "trigger_range":[20,24],
    "msg":"Resolve $name's effect?",
    "options":[
      {
        "label":"$halfLp ONLY",
        "script":{
          is_cost;
          div_lp=2;
        }
      },
      {
        "label":"$halfLp, then Special Summon 1 Level 4 or lower \"$archetype\" monster from your Deck",
        "script":{
          is_cost;
          div_lp=2;
          is_eff;
          search(0,255,[0],"IS_MONSTER && NAME == %$archetype% && LVL <= 4");
        }
      }
    ]
  }
]
