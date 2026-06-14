var archetype = "Sky Striker";
var addLabel = "Add 1 \"$archetype\" card from your Deck to your hand";
var condition = "(NAME == %$archetype% || DESC == %his card is always treated as a \"$archetype\" card%) && NAME != $name";
var search = "search(0,255,[0],\"$condition\")";

"commands":[
  {
    "conditions":[
      {
        "AND":[
          {
            "control_self":"$condition",
            "zone":0
          },
          {
            "NOT":[
              {
                "control_self":0,
                "zone_range":[10,14]
              },
              {
                "bool":"{count(2, \"ATTR == spell\")} >= 3"
              }
            ]
          }
        ]
      },
      {
        "AND":[
          {
            "control_self":"$condition",
            "zone":0
          },
          {
            "bool":"{count(2, \"ATTR == spell\")} >= 3"
          },
          {
            "NOT":[
              {
                "control_self":0,
                "zone_range":[10,14]
              }
            ]
          }
        ]
      }
    ],
    "trigger_range":[20,24],
    "options":[
      "label=$addLabel ONLY¬condition=0¬$search",
      "label=$addLabel, then draw 1 card¬condition=1¬$search¬then¬draw(1)"
    ]
  }
]
