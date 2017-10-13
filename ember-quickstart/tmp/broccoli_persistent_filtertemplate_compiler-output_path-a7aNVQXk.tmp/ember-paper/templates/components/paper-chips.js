export default Ember.HTMLBars.template({"id":"vRSDfj8t","block":"{\"symbols\":[\"item\",\"item\",\"index\",\"&default\"],\"statements\":[[5,\"md-chips-wrap\",[[10,\"class\",[26,[\"md-chips \",[25,\"if\",[[25,\"and\",[[25,\"not\",[[19,0,[\"readOnly\"]]],null],[19,0,[\"isFocused\"]]],null],\"md-focused\"],null],\" \",[25,\"unless\",[[19,0,[\"readOnly\"]],\"md-removable\"],null],\" \",[25,\"if\",[[19,0,[\"readOnly\"]],\"md-readonly\"],null]]]],[9,\"tabindex\",\"-1\"],[10,\"onkeydown\",[25,\"action\",[[19,0,[]],\"keyDown\"],null],null],[10,\"onfocus\",[25,\"action\",[[19,0,[]],\"chipsFocus\"],null],null],[10,\"onblur\",[25,\"action\",[[19,0,[]],\"chipsBlur\"],null],null]],[[],[]],{\"statements\":[[0,\"\\n\"],[4,\"each\",[[19,0,[\"content\"]]],null,{\"statements\":[[0,\"    \"],[5,\"md-chip\",[[10,\"class\",[26,[\"md-chip md-default-theme \",[25,\"if\",[[19,0,[\"readOnly\"]],\"md-readonly\"],null],\" \",[25,\"if\",[[25,\"eq\",[[19,0,[\"activeChip\"]],[19,3,[]]],null],\"md-focused\"],null]]]],[10,\"onclick\",[25,\"action\",[[19,0,[]],\"chipClick\",[19,3,[]]],null],null]],[[],[]],{\"statements\":[[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"md-chip-content\"],[9,\"tabindex\",\"-1\"],[9,\"aria-hidden\",\"true\"],[7],[0,\"\\n\"],[4,\"if\",[[22,4]],null,{\"statements\":[[0,\"          \"],[11,4,[[19,2,[]]]],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"          \"],[6,\"span\"],[7],[1,[19,2,[]],false],[8],[0,\"\\n\"]],\"parameters\":[]}],[0,\"      \"],[8],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"md-chip-remove-container\"],[7],[0,\"\\n\"],[4,\"unless\",[[19,0,[\"readOnly\"]]],null,{\"statements\":[[0,\"          \"],[6,\"button\"],[9,\"class\",\"md-chip-remove\"],[10,\"onclick\",[25,\"action\",[[19,0,[]],\"removeItem\",[19,2,[]]],null],null],[9,\"type\",\"button\"],[9,\"aria-hidden\",\"true\"],[9,\"tabindex\",\"-1\"],[7],[0,\"\\n            \"],[1,[25,\"paper-icon\",null,[[\"icon\",\"size\"],[\"clear\",18]]],false],[0,\"\\n            \"],[6,\"span\"],[9,\"class\",\"md-visually-hidden\"],[7],[0,\" Remove \"],[8],[0,\"\\n          \"],[8],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"      \"],[8],[0,\"\\n\"],[4,\"unless\",[[19,0,[\"readOnly\"]]],null,{\"statements\":[[0,\"        \"],[6,\"span\"],[9,\"class\",\"md-visually-hidden\"],[7],[0,\" Press delete to remove this chip. \"],[8],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"parameters\":[]}],[0,\"\\n\"]],\"parameters\":[2,3]},null],[4,\"unless\",[[19,0,[\"readOnly\"]]],null,{\"statements\":[[0,\"    \"],[6,\"div\"],[9,\"class\",\"md-chip-input-container\"],[7],[0,\"\\n\"],[4,\"if\",[[25,\"or\",[[19,0,[\"requireMatch\"]],[19,0,[\"options\"]]],null]],null,{\"statements\":[[4,\"paper-autocomplete\",null,[[\"options\",\"closeOnSelect\",\"placeholder\",\"searchField\",\"search\",\"matcher\",\"noMatchesMessage\",\"onBlur\",\"onSelectionChange\",\"onSearchTextChange\",\"onFocus\",\"onOpen\",\"onCreate\"],[[19,0,[\"options\"]],true,[19,0,[\"placeholder\"]],[19,0,[\"searchField\"]],[19,0,[\"search\"]],[19,0,[\"matcher\"]],[19,0,[\"noMatchesMessage\"]],[25,\"action\",[[19,0,[]],\"inputBlur\"],null],[25,\"action\",[[19,0,[]],\"autocompleteChange\"],null],[25,\"action\",[[19,0,[]],\"searchTextChange\"],null],[25,\"action\",[[19,0,[]],\"inputFocus\"],null],[25,\"action\",[[19,0,[]],\"inputFocus\"],null],[25,\"action\",[[19,0,[]],\"addItem\"],null]]],{\"statements\":[[4,\"if\",[[22,4]],null,{\"statements\":[[0,\"            \"],[11,4,[[19,1,[]]]],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[0,\"            \"],[6,\"span\"],[7],[1,[19,1,[]],false],[8],[0,\"\\n\"]],\"parameters\":[]}]],\"parameters\":[1]},null]],\"parameters\":[]},{\"statements\":[[0,\"        \"],[1,[25,\"input\",null,[[\"tabindex\",\"placeholder\",\"aria-label\",\"value\",\"focus-in\",\"focus-out\",\"enter\"],[\"0\",[19,0,[\"placeholder\"]],\"Add Tag\",[19,0,[\"newChipValue\"]],\"inputFocus\",\"inputBlur\",[25,\"action\",[[19,0,[]],\"addItem\",[19,0,[\"newChipValue\"]]],null]]]],false],[0,\"\\n\"]],\"parameters\":[]}],[0,\"    \"],[8],[0,\"\\n\"]],\"parameters\":[]},null]],\"parameters\":[]}],[0,\"\\n\"]],\"hasEval\":false}","meta":{"moduleName":"ember-paper/templates/components/paper-chips.hbs"}});