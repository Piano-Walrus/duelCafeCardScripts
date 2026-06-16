const archetype = "Mikanko";
const searchCondition = "NAME == %$archetype% && NAME != $name";

"commands":[
    {
      	"conditions":{
			"AND":[
				{
					"prev_zone":2
				},
				{
					"control_self":"$searchCondition",
					"zone":0
				}
			]
			
        },
        "trigger":3,
        "msg":"Resolve $name's GY effect?",
        "options":[
            "label=Send 1 \"$archetype\" card from your Deck to the GY¬search(0,2,[0],\"$searchCondition\",-1,2)"
        ]
    }
]
