# Scripting Guide for Contributors
The cards in the cafe refer to the JSON files in this repository to determine their effect actions under certain conditions. Contributors can code any card's effect using a series of condition keywords, trigger zone properties, and variable/function combos.

You can find all existing card scripts in the [Scripts](https://github.com/Piano-Walrus/duelCafeCardScripts/tree/main/Scripts) folder of this repository. You're free to reference these as examples, suggest edits through pull requests, or even submit new scripts to be reviewed and potentially added to the cafe!

## Zone Indexes
The cafe identifies each zone using integers:

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

Add 100 to any of the following to specifically indicate Player 2's equivalent zone:

| Zone Index  | Description |
| :--- | :--- |
| 9  | Player 1's Field Spell Zone |
| 10-14  |  Player 1's Monster Zones, from Left to Right |
| 20-22  | Player 1's Spell/Trap Zones 2-4, starting from the 2nd from the left  |
| 23  | Player 1's Right Pendulum Zone  |
| 24  | Player 1's Left Pendulum Zone  |

## Script Structure
Each script must be named after the passcode of the card it's for. For example, the script for "Labrynth Cooclock" would be named "2511.json". If a card has alternate artworks that are in the cafe, these artworks also need their own scripts, named accordingly.

***NOTE:** Any leading zeros in card passcodes must always be omitted, i.e. use* `2511` **NOT** `00002511`.

At the top of each script, you can declare and set any custom properties you deem appropriate and/or necessary (see [Custom Properties](https://github.com/Piano-Walrus/duelCafeCardScripts/blob/main/README.md#custom-properties)). You can also set a global `msg` property after any custom properties, and it will be applied to every possible pop-up menu that each of the script's commands could theoretically generate, as opposed to setting a `msg` for each command individually.

The next and final property in every script should always be `commands`, which expects a list of objects. Each object in that list can have the following properties:

| Property  | Expected Type | Description |
| :--- | :--- | :--- |
| `msg`  |  string | The use of this property in tandem with the "options" property below, causes the current command to show an options menu upon activation. This property specifies the message to display on that options menu.  |
| `options`  | string[]  | An array of strings that specify what to label each button in the options menu, AND what commands to run once each button is clicked  |
| `execute`  | string  | This property should realistically never be used, but if it's the only property in a given command object, then triggering that command will run this property's value as if it were a button's OnClick command string. Cannot be used alongside any other command properties.  |
| `trigger`, `trigger_range`, and `trigger_list`  | int, int[], int[]  | See [Triggers](https://github.com/Piano-Walrus/duelCafeCardScripts/tree/main?tab=readme-ov-file#triggers) below.  |
| **Conditions**  | Various  | See [Conditions](https://github.com/Piano-Walrus/duelCafeCardScripts/tree/main?tab=readme-ov-file#conditions) below.  |

## Triggers
Each command must have a trigger condition. There are currently four ways to specify a command's trigger condition:

| Property  | Expected Type | Description |
| :--- | :--- | :--- |
| `trigger`  |  int | The simplest trigger condition; expects a zone index (as outlined above), and sets a command to be triggered whenever the script's associated card is snapped to the specified zone index.  |
| `trigger_range`  | int[]  | This property takes an array of only two integers, and specifies a range of zone indexes rather than just one. So for example, if a card effect should trigger when a card is placed in any of the Main Monster Zones, then the command's trigger condition would be `"trigger_range":[10,14]`  |
| `trigger_list`  | int[]  | This property takes an array of any number of integers, and specifies that a card can trigger in any one of the integers provided. For example, if a card should trigger ONLY when snapped to an Extra Monster Zone, then the command's trigger condition would be `"trigger_list":[8,108]`  |

If no trigger condition is provided for a given command, then that command will execute when a card is manually triggered by either double-clicking on desktop, or double-tapping the controller trigger in VR, while holding said card.

***NOTE:** Each card can only have ONE manually-triggered command. If you need a script to have multiple manual effects, you can simply include all of those effects in the manual command's "options" array, and set the "message" property to something generic like "Resolve one of this card's manually-triggered effects?"*

## Option Buttons & Command Strings
Each option in an `options` object, or any given `execute` command string, can have multiple variable declarations, and functional parameters. Each part of a command string must be delimited by a negation symbol (`¬`), and will be executed in order from left to right. A good example of this string format would be [Runick Tip](https://github.com/Piano-Walrus/duelCafeCardScripts/blob/main/Scripts/2-Spells/31562086.json).

### Variables

| Identifier=TYPE | Description |
| :---| :--- |
| `label=STRING`  | Can only be used in option button command strings. If used, must be FIRST in the command string. Specifies the text to display on the button that will run this command when clicked. Optional when using the "rand" function; if no title is specified for a "rand" command, the title defaults to the QUANTITY passed to it. |
| `source=INT`  | Takes a zone index as an integer, and specifies the source that you intend to move cards from. |
| `dest=INT`  | Takes a zone index as an integer, and specifies the destination that you intend to move cards to.<br/>*(**NOTE:** When using "add", `dest` should be omitted)* |
| `target=LONG`  | Takes a card passcode as a long, and specifies the card passcode to search for at the source location. |

### Flags

| Flag Name | Description |
| :---| :--- |
| `opp`  | Specifies that a command string should affect the opponent rather than the current player. |
| `opp_source`  | Specifies that ONLY the designated source applies to the opponent, but NOT the destination. |
| `opp_destination`  | As with `opp_source`, this specifies that the designated destination applies to the opponent, but NOT the source. |
| `self`  | Disables all of the above flags containing "opp".<br/>This flag is enabled by default, so it should only be used **AFTER** enabling any of the above flags. |
| `up_to`  | Specifies that any number of cards less than or equal to the quantity specified in a following function may be selected. If this keyword is not used in a given command string, it will only be executed if a number of cards is found that either matches or exceeds the specified quantity (but the number of cards selected by any function will NEVER exceed that quantity). |
| `is_cost`  | Specifies that everything following this flag in any given command string is the effect's cost. |
| `is_eff`  | Disables the `is_cost` flag, therefore specifying that everything following this flag in any given command string is the card's effect, and NOT part of the cost.<br/>This flag is enabled by default, so it should only be used **AFTER** enabling `is_cost`. |
| `debug` | Should not be used; stops execution of a command string if the activating player isn't me. Used for testing new features that the live version of the world doesn't yet support. |

### Functions

| Identifier=TYPE | Description |
| :---| :--- |
| `search=INT` | Opens the "Search Deck Piles" menu, and switches to the tab corresponding to the provided integer (in order from left to right, "Main" is 0, "Extra" is 1, etc. "Side" cannot be selected).<br/><br/>***NOTE:** This function also has an optional alternate syntax outlined [below](https://github.com/Piano-Walrus/duelCafeCardScripts/blob/main/README.md#alternate-search-syntax) that provides more functionality.*|
| `rand=INT` | Selects a number of random cards equal to the provided integer, and moves them from "source" to "dest" (as such, those two variables MUST be set before calling "rand"). |
| `add=INT` | Selects a number of random cards equal to the provided integer, and reveals them as if they were searched from the "Search Deck Piles" menu. This function requires the "source" variable to be set.<br/>***NOTE:** This function can also be used with the `target` variable to only reveal a certain card passcode.* |
| `place=INT` | Selects a number of random cards equal to the provided integer, and places them in a field zone in Face-Up Attack Position. This function requires the "source" and "dest" variables, and can also be used with the `target` variable to place a specific card |
| `add_lp=INT` | Add the provided integer to a player's current LP. <br/>***NOTE:** The provided integer* ***can*** *be negative to subtract LP.* |
| `add_exact_lp=INT` | Essentially the same as "add_lp", except that if you provide a negative number, it will only subtract LP if the player's current LP is greater than the absolute value of the value provided (in other words, use this when scripting costs that must be paid ***exactly***, i.e. with cards like [Solemn Strike](https://github.com/Piano-Walrus/duelCafeCardScripts/blob/main/Scripts/3-Traps/40605147.json)). |
| `div_lp=INT` | Divides a player's current LP by the provided integer. |
| `set_lp=INT` | Sets a player's LP to the provided integer.<br/>***NOTE:** The provided value* ***cannot*** *be negative.* |
| `excavate_until=STRING` | Starts from the top of the designated "source" pile, and looks for a card whose name contains the provided string, then reveals that card as if it were searched from the "Search Deck Piles" menu. |
| `draw(INT)` | Draws a number of cards from the target player's main deck equal to the provided integer. |
| `break_if(STRING)` | Completely stops execution of the current command if the logical expression provided returns true when evaluated. |

### Alternate Search Syntax
The following alternate syntax can also be used for the `search` function:

`search(TAB_INDEX, DEST, SOURCES, CRITERIA, PASSCODE, ZONE_INDEX, SHOULD_PAY_COST)`

The parameters for this function are explained below:

| Parameter | Type | Description |
| :-- | :-- | :-- |
| TAB_INDEX | int | Just like with the default search syntax, this parameter represents the index of the tab that should be shown first when the "Search Deck Piles" menu is opened. |
| DEST | int | The zone index that searched cards should be moved to.<br/><br/>For standard behaviour (revealing cards upon clicking "Spawn" instead of sending them to any specific location), set this parameter to 255.|
| SOURCES | int[] | Representing all the available tab indexes that should be shown to the player after the "Search Deck Piles" menu is opened. |
| CRITERIA | string | A string representing criteria by which the menu should filter out certain cards. This string is expected to be a logical expression (See [Logical Expressions](https://github.com/Piano-Walrus/duelCafeCardScripts/blob/main/README.md#logical-expressions)). Otherwise, the system will only show cards containing the string you provide.<br/><br/>If you provide an empty string (`\"\"`), or if you only provide the previous 3 parameters, then the system will not filter the card list, and will instead just show all the cards at the selected location. |
| PASSCODE | long | If a card's script should run after a single card is searched, provide this value with its passcode.<br/><br/>If you instead want the system to attempt to run the script for "whichever single card was searched", set this parameter to -1.<br/>If you do not wish to use this feature, set this parameter to 0. |
| ZONE_INDEX | int | If you set PASSCODE to a value other than 0, then set this parameter to the zone index that you'd like the desired card script to trigger from. For example, if PASSCODE is the passcode of a spell card, or if you set PASSCODE to -1 and expect the player to only search spell cards, then you can set ZONE_INDEX to 22 to have the system run the desired cards "On-Snapped-To-Spell/Trap-Zone" effect.<br/><br/>If you do not wish to use this feature, set this parameter to -1, but if PASSCODE is also set to -1, note that the searched card may trigger if it would otherwise trigger at the location it is sent to. |
| SHOULD_PAY_COST | bool | Defaults to `true` if not specified. When set to `false`, and `PASSCODE` and `ZONE_INDEX` are set to trigger the searched card, the system will ignore any costs for any of the card's effects, and only allow for effects to be resolved. |

***NOTE:** When using the above alternate *`search`* syntax, if you do not intend for the searched card to trigger, you can simply omit the *`PASSCODE`*, *`ZONE_INDEX`*, and *`SHOULD_PAY_COST`* parameters, and they will default to *`0`*, *`-1`*, *`true`* respectively. However, each function parameter must always be provided in the correct order, so if you omit *`ZONE_INDEX`*, you must also omit *`SHOULD_PAY_COST`*, etc.* <br/>

***NOTE pt. ii:** The `TAB_INDEX` and `SOURCES` parameters of this function are the only places in the entire automation system where zone indexes "102" and "103" are allowed to represent "Opponent's GY" and "Opponent's Banished" respectively.*

Good examples of this alternate syntax would be [Selettrice Vaalmonica](https://github.com/Piano-Walrus/duelCafeCardScripts/blob/main/Scripts/0-Main/23093373.json), [Dimonno Vaalmonica](https://github.com/Piano-Walrus/duelCafeCardScripts/blob/main/Scripts/0-Main/30432463.json), and [Pot of Prosperity](https://github.com/Piano-Walrus/duelCafeCardScripts/blob/main/Scripts/2-Spells/84211599.json).

### Post-Search Actions
After using the `search` function, you may want a command to perform other actions that must specifically occur AFTER a card is searched. To accomplish this, you can use the `then` keyword immediately after using `search` to halt the command's execution, then resume once the search is completed. A good example of this feature would be [Tuning](https://github.com/Piano-Walrus/duelCafeCardScripts/blob/main/Scripts/2-Spells/96363153.json).

If only one card is searched from the "Search Deck Piles" menu using the `search` function, then after the `then` keyword, you can use a few extra placeholders to get information about that searched card. Note that these work the same way as the card properties outlined in the [Logical Expressions](https://github.com/Piano-Walrus/duelCafeCardScripts/blob/main/README.md#logical-expressions) section:

| Placeholder Identifier | Type | Description |
| :-- | :-- | :-- |
| `$name_searched` | string | The name of the searched card. |
| `$desc_searched` | string | The effect text of the searched card. |
| `$types_searched` | string | The typeline of the searched card if it is a monster. |
| `$lvl_searched` | int | The level, rank, or link rating of the searched card if it is a monster. |
| `$attr_searched` | string | The attribute of the searched card (lowercase). |
| `$frame_searched` | string | The name of the current card's frame file in Unity (See [Frame File Names](https://github.com/Piano-Walrus/duelCafeCardScripts/blob/main/README.md#frame-file-names)). |
| `$atk_searched` | int | The ATK stat of the searched card if it is a monster. |
| `$def_searched` | int | The DEF stat of the searched card if it is a monster. |
| `$is_spell_or_trap_searched` | bool | Whether or not the searched card is a Spell or a Trap. |
| `$is_monster_searched` | bool | Whether or not the searched card is a monster. |
| `$can_normal_or_set_searched` | bool | If the searched card is a monster, this boolean returns true if the monster can be Normal ummoned or Set, and false otherwise. |

***Note:** Since these placeholders will only be evaluated properly after only one card is searched using the `search` function, you should follow your `then` keyword with `break_if(\"$num_searched != 1\")`. Good example scripts using these placeholders would be [Spright Smashers](https://github.com/Piano-Walrus/duelCafeCardScripts/blob/main/Scripts/2-Spells/15443125.json) and [Pre-Preparation of Rites](https://github.com/Piano-Walrus/duelCafeCardScripts/blob/main/Scripts/2-Spells/13048472.json).*

## Logical Expressions
In `control_` condition properties (Outlined [Below](https://github.com/Piano-Walrus/duelCafeCardScripts/tree/main?tab=readme-ov-file#conditions)), or in CRITERIA parameters as described above, you can — and should — write out logical expressions when applicable. These allow you to filter cards more specifically, like checking if a name starts with a value rather than simply containing it, or if a card has a specific level. These expressions use essentially the same syntax as most other programming languages; `&&` represents "AND", `||` represents "OR", `<=` represents "less than or equal to", expressions can be grouped using parenthesis, etc. However, quotation marks are not required for any strings in logical expressions; to check if a card name is ***exactly*** "Kuriboh" for example, you would just write `NAME == Kuriboh`.

When comparing string properties, you can also use `%` to represent a wildcard, but note that these can only appear on the right side of any given condition (i.e. `NAME == %Runick%` is valid, but NOT `%NAME% == Runick`). Also, note that wildcard symbols can only appear at the beginning, and/or end of any given string.

The card properties you're able to check in any given logical expression are as follows:

| Property | Type | Description |
| :-- | :-- | :-- |
| NAME | string | The name of the current card. |
| DESC | string | The effect text of the current card. For pendulum monsters, this represents the card's monster effect text. |
| TYPES | string | The entire typeline of the card, with some caveats. For example, when checking this property of "Junk Synchron", the system would return `[Warrior / Tuner / Effect]`, but it then goes through each type individually and compares your input to each type, case-insensitive. As a result, you can use `TYPES == beast` to filter for ONLY Beast monsters (excluding Beast-Warrior and Winged Beast), or you can use `TYPES == %Warrior%` to filter for Warrior monsters AND Beast-Warrior monsters.<br/>So when using wildcards with this parameter, you're not checking if the ***entire*** typeline contains a given string, but rather if any of a given monster's types each contain that string. |
| LVL | int | The level, rank, or link rating of the current monster. |
| ATTR | string | The name of the current card's attribute. This value will ***ALWAYS*** be all lowercase, so "FIRE" becomes "fire", etc.<br/>This property also allows you to filter for ONLY "spell" or ONLY "trap" (i.e. `ATTR == spell`). |
| FRAME | string | The name of the current card's frame file in Unity (See [Frame File Names](https://github.com/Piano-Walrus/duelCafeCardScripts/blob/main/README.md#frame-file-names)). This is helpful for determining spell/trap types like "counter" or "field". Note that this value will ***ALWAYS*** be lowercase. |
| ATK | int | The current monster's ATK stat. |
| DEF | int | The current monster's DEF stat. |
| CAN_NORMAL_OR_SET | bool | Essentially just a shortcut for checking if the card 1. is not a ritual monster, and 2. does not contain "Cannot be Normal Summoned/Set" (or a couple other varieties) in its effect text. Note that you should still use something like `IS_MONSTER` alongside this property to specify that you'd only like to search for monsters. |
| IS_SPELL_OR_TRAP | bool | Whether or not the card is a spell OR a trap. |
| IS_MONSTER | bool | Whether or not the card is a monster. |

***NOTE:** When checking a property that is only available on monster cards, you're essentially also filtering out all Spells & Traps from your search results. For example, `LVL <= 2` will not return any spells or traps, and will only return monsters whose levels are 2 or lower.*

### Frame File Names
![Unity screenshot of every possible frame file name that could be returned by the `FRAME` property mentioned in the above table](https://github.com/Piano-Walrus/duelCafeCardScripts/blob/main/Resources/Images/card_frame_file_names.png)

## Conditions
Aside from specifying trigger zones for each command, you can also specify certain conditions to prevent any given command from being triggered if its conditions are not met. There are two ways to specify conditions: either as one object, or an array of objects.

When providing a single object to a command's `conditions` property, the system will check each condition property in that object, and if any given property evaluates to false, the condition is not met (you can think of a conditions object as one big "IF" statement, with each of the object's properties joined by "AND" clauses). You can also assign arrays of conditions objects to `OR`, `AND`, or `NOT` properties, and the system will evaluate each condition in each array accordingly (so, a condition evaluating to false in an `AND` array will cause the entire `conditions` object to return false, a condition evaluating to true in an `OR` array will cause the entire `conditions` object to return true, and a condition evaluating to true in a `NOT` array will cause the entire `conditions` object to return false).

Alternatively, when providing an array to the `conditions` property, each element of the array must be an object similar to what you would provide the `conditions` property as mentioned above. The results of each conditions object in the array will then be stored, allowing you to reference each condition individually in any given command string using `condition=[INT]` (the integer corresponding to the index of the associated conditions object in the array). This allows you to only show certain pop-up menu options under certain conditions. A good showcase of this feature is the script for [Vaalmonica Invitare](https://github.com/Piano-Walrus/duelCafeCardScripts/blob/main/Scripts/2-Spells/38491852.json).

Available properties for use inside any given `conditions` object:

| Property  | Expected Type | Description |
| :--- | :--- | :--- |
| `prev_zone`  |  int | Checks that the card was previously at the specified zone index.  |
| `prev_range`  | int[]  | Similar to `prev_zone`, except the system checks every zone index from the provided array's first index to its last index (inclusive). This property expects an array with only two values, signifying a "start index" and "end index."  |
| `prev_list`  | int[]  | Similar to `prev_zone`, except the system checks every zone index in the provided array.  |
| `lp_self`  | int[]  | Checks that the card's owner's LP value is within the provided range (the range being handled similarly to the one provided for `prev_range`).  |
| `lp_opp`  | int[]  | The same as `lp_self`, except it checks the other player's LP.  |
| `bool` | string | Expects a logical expression as a string, and evaluates to its result. For example, adding the property `"bool":"2 < 3"` to a `conditions` object would cause that object to evaluate as true.<br/>Note that identifiers like "NAME" or "FRAME" won't work here, since this expression appears outside of any command strings. |

You can also use conditions to check whether or not a given player controls certain cards. In any given conditions object, only two control-checking properties may be present: one beginning with `"control_"`, and the other beginning with `"zone_"`. The property beginning with `"zone_"` specifies which locations to check, and the property beginning with `"control_"` checks whether or not there exist any cards at those locations that match the provided criteria. The available control-checking properties are as follows:

| Property  | Expected Type(s) | Description |
| :--- | :--- | :--- |
| `control_self`  | long OR string  | Checks to see if the owner of the triggered card controls cards based on certain provided criteria. If a long is provided, checks the specified locations for cards whose passcodes equal the long provided. If a string is provided, and it is not a logical expression, checks the specified locations for cards whose names contain that string. Otherwise, checks whether or not any given card satisfies the provided logical expression. |
| `control_opp`  |  long OR string | The same as `control_self`, except it checks the other player's zones/locations.  |
| `zone`  | int  | Specifies the specific zone that `control_self` and `control_opp` are expected to check.  |
| `zone_range`  | int[]  | Expects an array of two "start index" and "end index" integers; Specifies a range of locations for `control_self` and `control_opp` to check.  |
| `zone_list`  | int[]  | Expects an array of any number of integers; `control_self` and `control_opp` will check every zone index specified in the array for cards matching the provided criteria.  |

***NOTE:** To check if a player controls ANY cards whatsoever (other than the activated card) in a given set of zones, you can set the `control_self` or `control_opp` properties to 0. Alternatively, to confirm that a player controls NO cards in a given set of zones, you can put this same condition in a `NOT` property array instead.*

## Placeholders
In any given command string, pop-up message, `control_` property, custom property (explained [below](https://github.com/Piano-Walrus/duelCafeCardScripts/blob/main/README.md#custom-properties)), or LP value string, the system will replace each of the following placeholders with their corresponding value as outlined below:

| Placeholder Identifier | Type | Description |
| :--- | :--- | :--- |
| `$player_index` | int | The index of the player who activated the triggered card.<br/>This value is one less than the player's number, so Player 1 would be index 0, and Player 2 would be index 1. |
| `$trigger`  |  int | The index of the zone from which triggered card was triggered.  |
| `$name`  | string  | The name of the triggered card.  |
| `$lp_self`  | int  | The LP of the player who owns the triggered card.  |
| `$lp_opp`  | int  | The LP of the opponent of the player who owns the triggered card.  |
| `$prev_zone` | int | The index of the zone this card was in before it was moved to `$trigger`. |
| `$num_excavated` | int | Should only be used after using `excavate_until`; Returns the number of cards excavated, excluding the card that was eventually added to hand by `excavate_until`. If no card is added, this placeholder evaluates to 255. If this placeholder is used without `excavate_until`, it will evaluate to 0. |
| `$num_searched` | int | Should only be used after using `search()`; Returns the number of cards searched by the most recent `search()` call. If no cards were searched, this placeholder will evaluate to 0. |

### Custom Properties
You can declare custom properties at the top of each card script by starting their key names with "$", and these will behave exactly like any other placeholder mentioned above. For instance, if you have a script with 3 commands, and you intend to use the phrase "Gain 500 LP" in all 3 commands, then you can create a property called `"$gainLP"` with the syntax `"$gainLP":"Gain 500 LP"`, then in each command's `"msg"` property, you can reference `"$gainLP"` and the system will replace each instance of `"$gainLP"` with "Gain 500 LP".

***NOTE:** You cannot reference a custom property in the declaration of another custom property. So for instance, you can reference `"$lp_opp"` in `"$gainLP"`, but you cannot reference `"$gainLP"` while declaring a custom `"$payLP"` property.*

## Basic Two-Operand Math
You can also perform very basic mathematical expressions throughout card scripts. These behave very similarly to placeholders, and as such can only be used in places where placeholders can be used. Note that the placeholders mentioned above ***can*** be used within mathematical expressions. You can use these, for example, to perform simple LP-related calculations when checking card activation conditions.

To use this feature, in any appropriate string, simply use the syntax `{[OPERAND1][OPERATOR][OPERAND2]}`. For example, to add both players' LP, you can use `{$lp_self+$lp_opp}`, and to subtract 1 from the zone index from which a card was triggered, you can use `{$trigger-1}`. Note that nested brackets are supported, so `{10*{8%6}}` would also work and output 20.

### Supported Operators
| Operator | Description |
| :--- | :--- |
|`+`| Addition |
|`-`| Subtraction |
|`*`| Multiplication |
|`/`| Division |
|`%`| Modulus |

You can also surround a number with `|` to get its absolute value. Note, however, that if you intend to get the absolute value of an expression, you must surround those pipes with brackets.<br/>**Example:** `{|{$trigger-1}|}` would subtract 1 from the trigger location, then return the absolute value of that result.

Two good examples of this feature would be the scripts for [Dried Winds](https://github.com/Piano-Walrus/duelCafeCardScripts/blob/main/Scripts/3-Traps/28265983.json) and [Dimonno Vaalmonica](https://github.com/Piano-Walrus/duelCafeCardScripts/blob/main/Scripts/0-Main/30432463.json).

### The Count Function
In any mathematical expression, you can also use `count(ZONE_INDEX, ?CRITERIA, ?SHOULD_TARGET_OPPONENT)` (optional fields preceded with `?`) to count the number of cards present at the provided zone index that match the provided logical expression. For example, `{count(2, \"ATTR == spell\"), true}` counts the number of spell cards in the activating player's opponent's Graveyard, and `{count(0)}` counts the number of cards currently in the activating player's Main Deck. A good example of this feature would be [Sky Striker Mobilize - Engage!](https://github.com/Piano-Walrus/duelCafeCardScripts/blob/main/Scripts/2-Spells/63166095.json)

The expected parameters of this method are explained below:
| Parameter | Type | Description |
| :-- | :-- | :-- |
| ZONE_INDEX | int | The index of the pile/zone to search. |
| CRITERIA | string | A logical expression to be checked for each card in the specified pile. |
| SHOULD_TARGET_OPPONENT | bool | If set to true, the opponent's corresponding pile/zone will be checked rather than that of the activating player. |

## Extra Notes & Tips
1. Variables should always be declared BEFORE writing functions like `rand` or `add` in commands.
    - Example: `source=0¬dest=2¬rand=2` is ***GOOD***, but `rand=2¬source=0¬dest=2` is ***BAD*** and will result in an error.

2. If you plan to script more than just a couple cards from scratch, I'd recommend installing "AutoHotKey v2" on your computer and using the script in this repository called "RazerSynapseAtHome.ahk" (I use this script daily since Razer Synapse is the worst software ever created, lol; it essentially just allows you to type `¬` by holding SHIFT+ALT then pressing the `L` key, and a couple other symbols that would otherwise be more cumbersome to type frequently).
3. You can use the cafe Discord bot to query any scripts in this repository, and get links to each of them! Simply follow the usual card query syntax (`<CARD_NAME>`) with `?script?`, and the bot will return the card's script and file URL, along with the usual card info embed.
4. If you add `#ALWAYS_AUTOMATE` at the very top of a script, that card will still be automated when a player clicks "Only Tedious Cards" when enabling Card Automation. This should only be used for cards like the Pots, [Monster Gate](https://github.com/Piano-Walrus/duelCafeCardScripts/blob/main/Scripts/2-Spells/43040603.json), [That Grass Looks Greener](https://github.com/Piano-Walrus/duelCafeCardScripts/blob/main/Scripts/2-Spells/11110587.json), etc. that move lots of cards and would be tedious to resolve manually.
