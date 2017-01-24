/**
 * @file Textfield component.
 * @author drotharmel <diegojoaquin.rotharmel@mercadolibre.com>
 * @version 0.1
 */

(function() {
    'use strict';
    
    /**
     * Class constructor for Textfield component.
     *
     * @constructor
     * @param {HTMLElement} element The element that will be upgraded.
     */
    
    var MlTextfield = function MlTextfield(element) {
        this.element_ = element;
        
        this.init();
    };
    window['MlTextfield'] = MlTextfield;
    
    /**
     * Store strings for class names defined by this component.
     *
     * @enum {string}
     * @private
     */
    MlTextfield.prototype.cssClasses_ = {
        LABEL: 'ml-textfield__label',
        INPUT: 'ml-textfield__input',
        IS_DIRTY: 'is-dirty',
        IS_FOCUSED: 'is-focused',
        IS_DISABLED: 'is-disabled',
        IS_INVALID: 'is-invalid',
        IS_UPGRADED: 'is-upgraded',
        HAS_PLACEHOLDER: 'has-placeholder'
    };
    
    /**
     * Handle class updates.
     *
     * @private
     */
    MlTextfield.prototype.updateClasses_ = function() {
        this.checkDisabled();
        this.checkValidity();
        this.checkDirty();
        this.checkFocus();
    };
    
    /**
     * Check the disabled state and update field.
     *
     * @public
     */
    MlTextfield.prototype.checkDisabled = function() {
        if (this.input_.disabled) {
            this.element_.classList.add(this.cssClasses_.IS_DISABLED);
        } else {
            this.element_.classList.remove(this.cssClasses_.IS_DISABLED);
        }
    };
    MlTextfield.prototype['checkDisabled'] =
        MlTextfield.prototype.checkDisabled;
    
    /**
     * Check the focus state and update field.
     *
     * @public
     */
    MlTextfield.prototype.checkFocus = function() {
        if (Boolean(this.element_.querySelector(':focus'))) {
            this.element_.classList.add(this.cssClasses_.IS_FOCUSED);
        } else {
            this.element_.classList.remove(this.cssClasses_.IS_FOCUSED);
        }
    };
    MlTextfield.prototype['checkFocus'] =
        MlTextfield.prototype.checkFocus;
    
    /**
     * Check the validity state and update field.
     *
     * @public
     */
    MlTextfield.prototype.checkValidity = function() {
        if (this.input_.validity) {
            if (this.input_.validity.valid) {
                this.element_.classList.remove(this.cssClasses_.IS_INVALID);
            } else {
                this.element_.classList.add(this.cssClasses_.IS_INVALID);
            }
        }
    };
    MlTextfield.prototype['checkValidity'] =
        MlTextfield.prototype.checkValidity;
    
    /**
     * Check the dirty state and update field.
     *
     * @public
     */
    MlTextfield.prototype.checkDirty = function() {
        if(this.input_.value && this.input_.value.length > 0){
            this.element_.classList.add(this.cssClasses_.IS_DIRTY);
        } else {
            this.element_.classList.remove(this.cssClasses_.IS_DIRTY);
        }
    }
    MlTextfield.prototype['checkDirty'] = 
        MlTextfield.prototype.checkDirty;
    
    /**
     * Disable text field.
     *
     * @public
     */
      MlTextfield.prototype.disable = function() {
          this.input_.disabled = true;
          this.updateClasses_();
      };
      MlTextfield.prototype['disable'] = MlTextfield.prototype.disable;
      
    /**
     * Enable text field.
     *
     * @public
     */
    MlTextfield.prototype.enable = function() {
        this.input_.disabled = false;
        this.updateClasses_();
    };
    MlTextfield.prototype['enable'] = MlTextfield.prototype.enable;
    
    /**
     * Add state to the textfield.
     *
     * @param {string} state the state to be setted (indeterminate, invalid, focused).
     * @public
     */
    MlTextfield.prototype.addState = function(state) {
        if(state !== "invalid") this.element_.classList.remove('is-invalid');
        this.element_.classList.add('is-' + state);
    };
    MlTextfield.prototype['addState'] = MlTextfield.prototype.addState;
    
    /**
     * Remove state to the textfield.
     *
     * @param {string} state the state to be removed (indeterminate, invalid, focused).
     * @public
     */
    MlTextfield.prototype.removeState = function(state) {
        this.element_.classList.remove('is-' + state);
    };
    MlTextfield.prototype['removeState'] = MlTextfield.prototype.removeState;
    
    /**
     * Handle focus.
     *
     * @param {Event} event The event that fired.
     * @private
     */
    MlTextfield.prototype.onFocus_ = function(event) {
        this.element_.classList.add(this.cssClasses_.IS_FOCUSED);
    };
    
    /**
     * Handle lost focus.
     *
     * @param {Event} event The event that fired.
     * @private
     */
    MlTextfield.prototype.onBlur_ = function(event) {
        this.element_.classList.remove(this.cssClasses_.IS_FOCUSED);
    };
    
    /**
     * Update text field value.
     *
     * @param {string} value The value to which to set the control (optional).
     * @public
     */
    MlTextfield.prototype.change = function(value) {
        this.input_.value = value || '';
        this.updateClasses_();
    };
    MlTextfield.prototype['change'] = MlTextfield.prototype.change;
    
    /**
     * Initialize element.
     */
    MlTextfield.prototype.init = function() {
        if(this.element_) {
            this.label_ = this.element_.querySelector('.' + this.cssClasses_.LABEL);
            this.input_ = this.element_.querySelector('.' + this.cssClasses_.INPUT);
            
            if(this.input_.hasAttribute('placeholder')) {
                this.element_.classList.add(this.cssClasses_.HAS_PLACEHOLDER);
            }
            
            this.boundUpdateClassesHandler = this.updateClasses_.bind(this);
            this.boundFocusHandler = this.onFocus_.bind(this);
            this.boundBlurHandler = this.onBlur_.bind(this);
            
            //Add the specific event handlers
            this.input_.addEventListener('input', this.boundUpdateClassesHandler);
            this.input_.addEventListener('focus', this.boundFocusHandler);
            this.input_.addEventListener('blur', this.boundBlurHandler);
            
            var invalid = this.element_.classList.contains(this.cssClasses_.IS_INVALID);
            this.updateClasses_();
            this.element_.classList.add(this.cssClasses_.IS_UPGRADED);
        }
    };
    
    //Register the component in the componentHandler
    componentHandler.register({
        constructor: MlTextfield,
        classAsString: 'MlTextfield',
        cssClass: 'ml-textfield',
    });
})();
