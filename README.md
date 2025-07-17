# Scripting Guide for Contributors
The cards in the cafe refer to the JSON files in this repository to determine their effect actions under certain conditions. Contributors can code any card's effect using a series of condition keywords, trigger zone properties, and variable/function combos.

You can find all existing card scripts in the "Scripts" folder of this repository. You're free to use these as examples, suggest edits through pull requests, or even submit new scripts to be reviewed and potentially added to the cafe!

## Zone Indexes
The cafe identifies each zone using integers. These were decided on back when I didn't know what I was doing, so apologies in advance if some seem a bit unintuitive...

 - 0: Main Deck
 - 1: Extra Deck
 - 2: Graveyard
 - 3: Banished
 - 4: Face-Up Extra
 - 5: Face-Down Banished
 - 6: Floating/In-Hand

 - 7: Should not be used in any card scripts; used internally to mean "just recently drawn from a deck pile"

 - 8: The Extra Monster Zone closest to Player 1's Field Spell Zone
 - 108: The other Extra Monster Zone

Note: Add 100 to any of the following to specifically indicate Player 2's equivalent zone
 - 9: Player 1's Field Spell Zone
 - 10-14: Player 1's Monster Zones, from Left to Right
 - 20-22: Player 1's Spell/Trap Zones 2-4, starting from the 2nd from the left
 - 23: Player 1's Right Pendulum Zone
 - 24: Player 1's Left Pendulum Zone

## Script Structure
Each script must be named after the passcode of the card it's for. For example, the script for "Labrynth Cooclock" would be named "2511.json".

Each script is one JSON object, and should begin with the "id" property, its value being that same passcode mentioned above. Note that any leading zeros in card passcodes must always be omitted, i.e. use `2511` **NOT** `00002511`.

The next property should always be "commands", which expects a list of objects. Each object can have the following properties:

**1. "message" - Type: String**
> The use of this property in tandem with the "options" property below, causes the current command to show an options menu upon activation. This property specifies the message to display on that options menu.

**2. "options" - Type: String[]**
> An array of strings that specify what to label each button in the options menu, AND what commands to run once each button is clicked

**3. "execute" - Type: String**
> This property should realistically never be used, but if it's the only property in a given command object, then triggering that command will run this property's value as if it were a button's OnClick command string.

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

**5. opp**
> Specifies that your command should affect the opponent rather than the current player

**6. opp_source**
> Specifies that ONLY the designated source applies to your opponent, but NOT the destination

**7. opp_destination**
> As with "opp_source", this specifies that the designated destination applies to your opponent, but NOT the source

**8. up_to**
> Specifies that any number of cards less than, or equal to the quantity specified in a following function may be selected. If this keyword is not used, all functions will only work if a number of cards is found that either matches or exceeds the desired quantity (but the number of cards selected by any function will NEVER exceed the quantity specified regardless)

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


**Note:** Variables should always be declared BEFORE writing functions like "rand" or "add" in commands.
> Example: `source=0¬dest=2¬rand=2` is ***GOOD***, but `rand=2¬source=0¬dest=2` is ***BAD*** and will result in an error.
