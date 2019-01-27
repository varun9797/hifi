'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _elacticSearchModel = require('../model/elacticSearchModel');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var elacticSearchController = function elacticSearchController() {
    _classCallCheck(this, elacticSearchController);

    this.elacticSearchModel = new _elacticSearchModel.elacticSearchModel();
};

exports.default = elacticSearchController;
//# sourceMappingURL=elasticSearchController.js.map