/**
 * @file componentHandler
 * @author drotharmel <diegojoaquin.rotharmel@mercadolibre.com>
 * @version 0.0.1
 */
 
var componentHandler = (function () {
    'use strict';
    
    //TODO: define getters for this two arrays
    var registeredComponents_ = [];
    var createdComponents_ = [];
    
    /**
     * Upgrade all registered components found in the DOM.
     * @public
     */
    function upgradeAllRegistered_() {
        registeredComponents_.forEach(function (item) {
            var elementsInDOM = document.querySelectorAll('.' + item.cssClass);
            
            [].forEach.call(elementsInDOM, function (el) {
                var instance = new item.constructor(el);
                createdComponents_.push(instance);
            });
            
        });
    }
    
    /**
     * Registers a class for future use.
     *
     * @param {componentHandler.ComponentConfigPublic} config
     */
    function  registerComponent_(config) {
        registeredComponents_.push(config);
    }
    
    /* 
     * Reveal public function to outside.
     */
    return {
        register: registerComponent_,
        upgradeAllRegistered: upgradeAllRegistered_
    };
})();

window.addEventListener('load', function() {
  'use strict';

  if ('classList' in document.createElement('div') &&
      'querySelector' in document &&
      'addEventListener' in window && Array.prototype.forEach) {
    componentHandler.upgradeAllRegistered();
  }
});
