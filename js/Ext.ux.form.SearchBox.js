/**
 * Ext.ux.form.SearchBox - a search box with two buttons:
 * - clear - deletes the value in the field
 * - search - calls a search callback function (and YOU need to define it!)
 * 
 * To use, define searchFunction(value) and you've got yourself a cool search box.
 * You can optionally define clearFunction() to do something special when clear is pressed
 * (clearing the value will happen whether you define it or not)
 * 
 * xtype: 'ux-searchbox'
 * 
 * @author: Dror Ben-Gai (deebug.dev@gmail.com)
 * @date: August, 2011
 */

Ext.namespace('Ext.ux.form');

Ext.ux.form.SearchBox = Ext.extend(Ext.form.TwinTriggerField, {
    searchFunction: null, // define this when instantiating this component
    clearFunction: null, // define this to do something when 'clear' is pressed
    incremental: true,

    fieldClass: 'x-form-search-field',
    trigger1Class: 'x-form-clear-trigger',
    trigger2Class: 'x-form-search-trigger',
    enableKeyEvents: true,
    
    // public function - call it to programatically set the value for search
    setSearchValue: function(value) {
        if(value == undefined || value == null || value == '') {
            this.clear();
        } else {
            this.search(value);
        }
    },
    
    search: function(value) {
        if(this.searchFunction) {
            this.searchFunction(value);
        }
    },
    
    clear: function() {
        // clear text from box
        this.setValue('');
        if(this.clearFunction) {
            this.clearFunction();
        }
    },

    onTrigger1Click: function(e) {
        this.clear();
    },

    onTrigger2Click: function(e) {
        this.search(this.getValue());
    },
    
    listeners: {
        keyup: function(field, event) {
            if(event.getKey() == event.ENTER || event.getKey() == event.ESC) {
                // do nothing for ESC and ENTER keys
                return;
            }
            if(this.incremental && this.searchFunction) {
                this.searchFunction(this.getValue());
            }
        },
        specialkey: function(field, event) {
            if(event.getKey() == event.ENTER) {
                // pressing 'Enter' calls the search function
                this.search(this.getValue());
            } else if(event.getKey() == event.ESC) {
                // pressing ESCAPE call the clear function
                this.clear();
            }
        }
    }
});

Ext.reg('ux-searchbox', Ext.ux.form.SearchBox);
