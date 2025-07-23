# Scripting Guide for Contributors
The cards in the cafe refer to the JSON files in this repository to determine their effect actions under certain conditions. Contributors can code any card's effect using a series of condition keywords, trigger zone properties, and variable/function combos.

You can find all existing card scripts in the "Scripts" folder of this repository. You're free to reference these as examples, suggest edits through pull requests, or even submit new scripts to be reviewed and potentially added to the cafe!

## Zone Indexes
The cafe identifies each zone using integers. These were decided on back when I didn't know what I was doing, so apologies in advance if some seem a bit unintuitive...

| Zone Index  | Description |
| :--- | :--- |
| 0  | Main Deck |
| 1  |  Extra Deck |
| 2  | Graveyard  |
| 3  | Banished  |
| 4  | Face-Up Extra  |
| 5 | Face-Down Banished |
| 6 | Floating/In-Hand |
| 7 | Should not be used; internally represents "just recently drawn from a deck pile" |
| 8 | The Extra Monster Zone closest to Player 1's Field Spell Zone |
| 108 | The other Extra Monster Zone |

**Note:** Add 100 to any of the following to specifically indicate Player 2's equivalent zone

| Zone Index  | Description |
| :--- | :--- |
| 9  | Player 1's Field Spell Zone |
| 10-14  |  Player 1's Monster Zones, from Left to Right |
| 20-22  | Player 1's Spell/Trap Zones 2-4, starting from the 2nd from the left  |
| 23  | Player 1's Right Pendulum Zone  |
| 24  | Player 1's Left Pendulum Zone  |

## Script Structure
Each script must be named after the passcode of the card it's for. For example, the script for "Labrynth Cooclock" would be named "2511.json".

Each script is one JSON object, and should begin with the `"id"` property, its value being that same passcode mentioned above. Note that any leading zeros in card passcodes must always be omitted, i.e. use `2511` **NOT** `00002511`.

Next, you can declare and set any custom properties you deem appropriate and/or necessary (outlined in [this section](https://github.com/Piano-Walrus/duelCafeCardScripts/tree/main?tab=readme-ov-file#placeholders)). You can also set a global `"msg"` property after the `"id"` property, and it will be applied to every possible pop-up menu that each of the script's commands could theoretically generate, as opposed to setting a `"msg"` for each command individually.

The next and final property should always be `"commands"`, which expects a list of objects. Each object can have the following properties:

**1. "msg" - Type: String**
> The use of this property in tandem with the "options" property below, causes the current command to show an options menu upon activation. This property specifies the message to display on that options menu.

**2. "options" - Type: String[]**
> An array of strings that specify what to label each button in the options menu, AND what commands to run once each button is clicked

**3. "execute" - Type: String**
> This property should realistically never be used, but if it's the only property in a given command object, then triggering that command will run this property's value as if it were a button's OnClick command string. Cannot be used alongside any other command properties.

Finally, each command must have a trigger condition. There are currently four ways to specify a command's trigger condition:

**1. "trigger" - Type: Integer**
> The simplest trigger condition; expects a zone index (as outlined above), and sets a command to be triggered whenever the script's associated card is snapped to the specified zone index.

**2. "trigger_range" - Type: Integer[]**
> This property takes an array of only two integers, and specifies a range of zone indexes rather than just one. So for example, if a card effect should trigger when a card is placed in any of the Main Monster Zones, then the command's trigger condition would be `"trigger_range":[10,14]`

**3. "trigger_list" - Type: Integer[]**
> This property takes an array of any number of integers, and specifies that a card can trigger in any one of the integers provided. For example, if a card should trigger ONLY when snapped to an Extra Monster Zone, then the command's trigger condition would be `"trigger_list":[8,108]`

**4. null**
> If no trigger condition is provided for a given command, then that command will execute when a card is manually triggered by double-clicking/double-tapping the trigger while holding said card. 
> **Note:** Each card can only have ONE manually-triggered command. If you need a script to have multiple manual effects, you can simply include all of those effects in the manual command's "options" array, and set the "message" property to something generic like "Resolve one of this card's manually-triggered effects?"

## Option Buttons & Command Strings
Each option in "options", or any given "execute" command string, can have multiple variable declarations, and functional parameters. Each part of a command string must be delimited by a negation symbol (`¬`)

### Variables
**1. label=[STRING]**
> Can only be used in option button command strings. If used, must be FIRST in the command string. Specifies the text to display on the button that will run this command when clicked. Optional when using the "rand" function; if no title is specified for a "rand" command, the title defaults to the QUANTITY passed to it.

**2. source=[INTEGER]**
> Takes a zone index as an integer, and specifies the source that you intend to move cards from

**3. dest=[INTEGER]**
> Takes a zone index as an integer, and specifies the destination that you intend to move cards to
> *(**Note:** When using "add", dest should be omitted)*

**4. target=[STRING]**
> Takes a card passcode as a string, and specifies the card passcode to search for at the source location

### Flags
**1. opp**
> Specifies that your command should affect the opponent rather than the current player

**2. opp_source**
> Specifies that ONLY the designated source applies to the opponent, but NOT the destination

**3. opp_destination**
> As with "opp_source", this specifies that the designated destination applies to the opponent, but NOT the source

**4. up_to**
> Specifies that any number of cards less than or equal to the quantity specified in a following function may be selected. If this keyword is not used in a given command string, it will only be executed if a number of cards is found that either matches or exceeds the specified quantity (but the number of cards selected by any function will NEVER exceed that quantity)

### Functions
**1. search=[TAB_INDEX]**
> Opens the "Search Deck Piles" menu, and switches to the tab corresponding to TAB_INDEX (in order from left to right, "Main" is 0, "Extra" is 1, etc. "Side" cannot be selected)

**2. rand=[QUANTITY]**
> Selects a number of random cards equal to QUANTITY, and moves them from "source" to "dest" (as such, those two variables MUST be set before calling "rand")

**3. add=[QUANTITY]**
> Selects a number of random cards equal to QUANTITY, and reveals them as if they were searched from the "Search Deck Piles" menu. This function requires the "source" variable to be set. HOWEVER this function can also be used with the "target" variable to only reveal a certain card passcode

**4. place=[QUANTITY]**
> Selects a number of random cards equal to QUANTITY, and places them in a field zone in Face-Up Attack Position. This function requires the "source" and "dest" variables, and can also be used with the "target" variable to place a specific card

**5. add_lp=[QUANTITY]**
> Add QUANTITY to a player's current LP. Note that QUANTITY ***can*** be negative to subtract LP

**6. add_exact_lp=[QUANTITY]**
> Essentially the same as "add_lp", except that if you provide a negative number, it will only subtract LP if the player's current LP is greater than the absolute value of the value provided (in other words, use this when scripting costs that must be paid ***exactly***, i.e. with cards like "Solemn Strike")

**7. div_lp=[QUANTITY]**
> Divides a player's current LP by QUANTITY

**8. set_lp=[QUANTITY]**
> Sets a player's LP to QUANTITY. Note that the value provided ***cannot*** be negative

**9. excavate_until=[TEXT]**
> Starts from the top of the designated "source" pile, and looks for a card whose name contains "TEXT", then reveals that card as if it were searched from the "Search Deck Piles" menu

## Conditions
Aside from specifying trigger zones for each command, you can also specify certain conditions to prevent any given command from being triggered if its conditions are not met. There are two ways to specify conditions: either as one object, or an array of objects.

When providing a single object to a command's `"conditions"` property, the system will check each condition property in that object, and if any given property evaluates to "false", the condition is not met (you can think of a conditions object as one big "IF" statement, with each of the object's properties joined by "AND" clauses). You can also assign arrays of conditions objects to "OR", "AND", or "NOT" properties, and the system will evaluate each condition in each array accordingly (so, a condition evaluating to false in an "AND" array will cause the entire "conditions" object to return false, a condition evaluating to true in an "OR" array will cause the entire "conditions" object to return true, and a condition evaluating to true in a "NOT" array will cause the entire "conditions" object to return false).

Alternatively, when providing an array to the `"conditions"` property, each element of the array must be an object similar to what you would provide the `"conditions"` property as mentioned above. The results of each conditions object in the array will then be stored, allowing you to reference each condition individually in any given command string using "condition=[CONDITION_INDEX]". This allows you to only show certain pop-up menu options under certain conditions. A good showcase of this feature is the script for [Vaalmonica Invitare](https://github.com/Piano-Walrus/duelCafeCardScripts/blob/main/Scripts/2-Spells/38491852.json).

Available properties for use inside any given "conditions" object:

| Property  | Expected Type | Description |
| :--- | :--- | :--- |
| `prev_zone`  |  int | Checks that the card was previously at the specified zone index.  |
| `prev_range`  | int[]  | Similar to `prev_zone`, except the system checks every zone index from the provided array's first index to its last index (inclusive). This property expects an array with only two values, signifying a "start index" and "end index."  |
| `prev_list`  | int[]  | Similar to `prev_zone`, except the system checks every zone index in the provided array.  |
| `lp_self`  | int[]  | Checks that the card's owner's LP value is within the provided range (the range being handled similarly to the one provided for `prev_range`).  |
| `lp_opp`  | int[]  | The same as `lp_self`, except it checks the other player's LP.  |

You can also use conditions to check whether or not a given player controls certain cards. In any given conditions object, only two control-checking properties may be present: one beginning with `"control_"`, and the other beginning with `"zone_"`. The "zone_" property specifies which locations to check, and the `"control_"` property checks whether or not there exist any cards at those locations that match the provided criteria. The available control-checking properties are as follows:

| Property  | Expected Type(s) | Description |
| :--- | :--- | :--- |
| `control_self`  | long OR string  | Checks to see if the owner of the triggered card controls cards based on certain provided criteria. If a long is provided, checks the specified locations for cards whose passcodes equal the long provided. If a string is provided, checks the specified locations for cards whose names contain that string.  |
| `control_opp`  |  long OR string | The same as `control_self`, except it checks the other player's zones/locations.  |
| `zone`  | int  | Specifies the specific zone that `control_self` and `control_opp` are expected to check.  |
| `zone_range`  | int[]  | Expects an array of two "start index" and "end index" integers; Specifies a range of locations for `control_self` and `control_opp` to check.  |
| `zone_list`  | int[]  | Expects an array of any number of integers; `control_self` and `control_opp` will check every zone index specified in the array for cards matching the provided criteria.  |

## Placeholders
In any given command string, pop-up message, custom property (explained [below](https://github.com/Piano-Walrus/duelCafeCardScripts/blob/main/README.md#custom-properties)), or LP value string, the system will replace each of the following placeholders with their corresponding value as outlined below:

| Placeholder Identifier | Type | Description |
| :--- | :--- | :--- |
| `$trigger`  |  int | Represents the index of the zone from which triggered card was triggered.  |
| `$name`  | string  | Represents the name of the triggered card.  |
| `$lp_self`  | int  | Represents the LP of the player who owns the triggered card.  |
| `$lp_opp`  | int  | Represents the LP of the opponent of the player who owns the triggered card.  |

### Custom Properties
You can declare custom properties on each card script by starting their key names with "$", and these will behave exactly like any other placeholder mentioned above. For instance, if you have a script with 3 commands, and you intend to use the phrase like "Pay 500 LP" in all 3 commands, you can create a property called `"$gainLP"` under the script's "id" property, then in each command's `"msg"` property, you can reference `"$gainLP"` and the system will replace each instance of `"$gainLP"` with "Gain 500 LP". Note, however, that you cannot reference a custom property in the declaration of another custom property. So for instance, you can reference `"$lp_opp"` in `"$gainLP"`, but you cannot reference `"$gainLP"` while declaring a custom `"$payLP"` property.

## Basic Two-Operand Math
You can also perform very basic mathematical expressions throughout card scripts. These behave very similarly to placeholders, and as such can only be used in places where placeholders can be used. Note that the placeholders mentioned above ***can*** be used within mathematical expressions. You can use these, for example, to perform simple LP-related calculations when checking card activation conditions.

To use this feature, in any appropriate string, simply use the syntax `{[OPERAND1][OPERATOR][OPERAND2]}`. For example, to add both players' LP, you can use `{$lp_self+$lp_opp}`, and to subtract 1 from the zone index from which a card was triggered, you can use `{$trigger-1}`. Note that nested brackets are supported, so `{10*{8%6}}` would also work and output 20.

A good showcase of this feature is the script for [Dried Winds](https://github.com/Piano-Walrus/duelCafeCardScripts/blob/main/Scripts/3-Traps/28265983.json).

## Extra Notes & Tips
1. Variables should always be declared BEFORE writing functions like "rand" or "add" in commands.
    - Example: `source=0¬dest=2¬rand=2` is ***GOOD***, but `rand=2¬source=0¬dest=2` is ***BAD*** and will result in an error.

2. If you plan to script more than just a couple cards from scratch, I'd recommend installing "AutoHotKey v2" on your computer and using the script in this repository called "RazerSynapseAtHome.ahk" (I use this script daily since Razer Synapse is the worst software ever created, lol; it essentially just allows you to type `¬` by holding SHIFT+ALT then pressing the `L` key, and a couple other symbols that would otherwise be more cumbersome to type frequently)
