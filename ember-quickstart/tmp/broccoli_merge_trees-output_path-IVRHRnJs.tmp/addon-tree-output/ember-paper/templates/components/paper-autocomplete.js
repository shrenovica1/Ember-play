define("ember-paper/templates/components/paper-autocomplete", ["exports"], function (exports) {
  "use strict";

  exports.__esModule = true;
  exports.default = Ember.HTMLBars.template({ "id": "59bvx8le", "block": "{\"symbols\":[\"dropdown\",\"virtualItems\",\"option\",\"term\",\"&default\",\"&inverse\"],\"statements\":[[4,\"basic-dropdown\",null,[[\"horizontalPosition\",\"destination\",\"initiallyOpened\",\"matchTriggerWidth\",\"calculatePosition\",\"onClose\",\"onOpen\",\"registerAPI\",\"renderInPlace\",\"verticalPosition\",\"disabled\",\"contentComponent\",\"triggerComponent\"],[[25,\"readonly\",[[19,0,[\"horizontalPosition\"]]],null],[25,\"readonly\",[[19,0,[\"destination\"]]],null],[25,\"readonly\",[[19,0,[\"initiallyOpened\"]]],null],[25,\"readonly\",[[19,0,[\"matchTriggerWidth\"]]],null],[25,\"readonly\",[[19,0,[\"calculatePosition\"]]],null],[25,\"action\",[[19,0,[]],\"onClose\"],null],[25,\"action\",[[19,0,[]],\"onOpen\"],null],[25,\"action\",[[19,0,[]],\"registerAPI\"],null],[25,\"readonly\",[[19,0,[\"renderInPlace\"]]],null],[25,\"readonly\",[[19,0,[\"verticalPosition\"]]],null],[25,\"readonly\",[[19,0,[\"disabled\"]]],null],[25,\"readonly\",[[19,0,[\"contentComponent\"]]],null],[25,\"readonly\",[[19,0,[\"triggerWrapperComponent\"]]],null]]],{\"statements\":[[0,\"\\n\"],[4,\"component\",[[19,1,[\"trigger\"]]],[[\"tagName\",\"ariaDescribedBy\",\"ariaInvalid\",\"ariaLabel\",\"ariaLabelledBy\",\"ariaRequired\",\"class\",\"onKeyDown\",\"onFocus\",\"onBlur\",\"onMouseDown\",\"tabindex\",\"label\",\"disabled\"],[\"md-autocomplete\",[25,\"readonly\",[[19,0,[\"ariaDescribedBy\"]]],null],[25,\"readonly\",[[19,0,[\"ariaInvalid\"]]],null],[25,\"readonly\",[[19,0,[\"ariaLabel\"]]],null],[25,\"readonly\",[[19,0,[\"ariaLabelledBy\"]]],null],[25,\"readonly\",[[19,0,[\"required\"]]],null],[25,\"readonly\",[[19,0,[\"concatenatedTriggerClasses\"]]],null],[25,\"action\",[[19,0,[]],\"onTriggerKeydown\"],null],[25,\"action\",[[19,0,[]],\"onTriggerFocus\"],null],[25,\"action\",[[19,0,[]],\"deactivate\"],null],[25,\"action\",[[19,0,[]],\"onTriggerMouseDown\"],null],-1,[25,\"readonly\",[[19,0,[\"label\"]]],null],[25,\"readonly\",[[19,0,[\"disabled\"]]],null]]],{\"statements\":[[4,\"component\",[[19,0,[\"triggerComponent\"]]],[[\"allowClear\",\"required\",\"passThru\",\"class\",\"flex\",\"disabled\",\"buildSelection\",\"extra\",\"listboxId\",\"onFocus\",\"activate\",\"onBlur\",\"onInput\",\"onClear\",\"placeholder\",\"onKeydown\",\"searchEnabled\",\"searchField\",\"searchText\",\"validationErrorMessages\",\"select\",\"selected\",\"selectedItemComponent\"],[[25,\"readonly\",[[19,0,[\"allowClear\"]]],null],[25,\"readonly\",[[19,0,[\"required\"]]],null],[25,\"readonly\",[[19,0,[\"passThru\"]]],null],\"layout-row\",[25,\"readonly\",[[19,0,[\"flex\"]]],null],[19,0,[\"disabled\"]],[25,\"readonly\",[[19,0,[\"buildSelection\"]]],null],[25,\"readonly\",[[19,0,[\"extra\"]]],null],[25,\"readonly\",[[19,0,[\"optionsId\"]]],null],[25,\"action\",[[19,0,[]],\"onFocus\"],null],[25,\"action\",[[19,0,[]],\"activate\"],null],[25,\"action\",[[19,0,[]],\"onBlur\"],null],[25,\"action\",[[19,0,[]],\"onInput\"],null],[25,\"readonly\",[[19,0,[\"onClear\"]]],null],[25,\"readonly\",[[19,0,[\"placeholder\"]]],null],[25,\"action\",[[19,0,[]],\"onKeydown\"],null],[25,\"readonly\",[[19,0,[\"searchEnabled\"]]],null],[25,\"readonly\",[[19,0,[\"searchField\"]]],null],[25,\"readonly\",[[19,0,[\"searchText\"]]],null],[25,\"readonly\",[[19,0,[\"validationErrorMessages\"]]],null],[25,\"readonly\",[[19,0,[\"publicAPI\"]]],null],[25,\"readonly\",[[19,0,[\"selected\"]]],null],[25,\"readonly\",[[19,0,[\"selectedItemComponent\"]]],null]]],{\"statements\":[[0,\"      \"],[11,5,[[19,0,[\"publicAPI\"]],[19,0,[\"selected\"]]]],[0,\"\\n\"]],\"parameters\":[]},null]],\"parameters\":[]},null],[0,\"\\n\"],[4,\"component\",[[19,1,[\"content\"]]],[[\"class\",\"select\"],[[25,\"readonly\",[[19,0,[\"concatenatedDropdownClasses\"]]],null],[25,\"readonly\",[[19,0,[\"publicAPI\"]]],null]]],{\"statements\":[[4,\"if\",[[19,0,[\"mustShowSearchMessage\"]]],null,{\"statements\":[[0,\"      \"],[1,[25,\"component\",[[19,0,[\"searchMessageComponent\"]]],[[\"searchMessage\",\"select\"],[[25,\"readonly\",[[19,0,[\"searchMessage\"]]],null],[25,\"readonly\",[[19,0,[\"publicAPI\"]]],null]]]],false],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[4,\"if\",[[19,0,[\"mustShowNoMessages\"]]],null,{\"statements\":[[4,\"if\",[[22,6]],null,{\"statements\":[[0,\"        \"],[11,6],[0,\"\\n\"]],\"parameters\":[]},{\"statements\":[[4,\"if\",[[19,0,[\"noMatchesMessage\"]]],null,{\"statements\":[[0,\"        \"],[6,\"ul\"],[9,\"class\",\"ember-power-select-options md-autocomplete-suggestions\"],[9,\"role\",\"listbox\"],[7],[0,\"\\n          \"],[6,\"li\"],[9,\"class\",\"ember-power-select-option ember-power-select-option--no-matches-message\"],[9,\"role\",\"option\"],[3,\"action\",[[19,0,[]],\"onCreate\",[19,0,[\"publicAPI\",\"searchText\"]]]],[7],[0,\"\\n            \"],[1,[18,\"noMatchesMessage\"],false],[0,\"\\n          \"],[8],[0,\"\\n        \"],[8],[0,\"\\n      \"]],\"parameters\":[]},null]],\"parameters\":[]}]],\"parameters\":[]},{\"statements\":[[4,\"component\",[[19,0,[\"optionsComponent\"]]],[[\"class\",\"groupIndex\",\"loadingMessage\",\"id\",\"options\",\"optionsComponent\",\"select\"],[\"ember-power-select-options md-autocomplete-suggestions\",\"\",[25,\"readonly\",[[19,0,[\"loadingMessage\"]]],null],[25,\"readonly\",[[19,0,[\"optionsId\"]]],null],[25,\"readonly\",[[19,2,[]]],null],[25,\"readonly\",[[19,0,[\"optionsComponent\"]]],null],[25,\"readonly\",[[19,0,[\"publicAPI\"]]],null]]],{\"statements\":[[0,\"          \"],[11,5,[[19,3,[]],[19,4,[]]]],[0,\"\\n\"]],\"parameters\":[3,4]},null],[0,\"    \"]],\"parameters\":[]}]],\"parameters\":[]}]],\"parameters\":[2]},null]],\"parameters\":[1]},null]],\"hasEval\":false}", "meta": { "moduleName": "ember-paper/templates/components/paper-autocomplete.hbs" } });
});