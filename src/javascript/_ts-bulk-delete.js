Ext.define('Rally.technicalservices.bulkdelete', {
    extend: 'Rally.ui.menu.bulk.MenuItem',
    alias: 'widget.tsbulkdelete',

    config: {
        text: 'Delete',
        handler: function() {
            this._onDeleteClicked()
        },
        predicate: function(records) {
            return _.every(records, function(record) {
                return /\.Build/.test(record.self.getName());
            });
        }
    },
    
    _onDeleteClicked: function() {
       
        if (this.onBeforeAction(this.records) === false) {
            return;
        }

        var me = this,
            records = me.records,
            successfulRecords = [];

        var promises = [];
        _.each(records, function (record) {
            // marshal into a sequence so we don't 
            // get a concurrency conflict
            var f = function() {
                console.log("Removing ", record);
                return me._deleteRecord(record);
            };
            promises.push(f);
        });
        Deft.Chain.sequence(promises).then({
            success: function(results) {
              successfulRecords = Ext.Array.flatten(results);
            },
            failure: function(error) {
              alert(error);
            }
        }).always(function() {
            Ext.callback(me.onActionComplete, null, [successfulRecords, []]);
        });
        
    },
    
    _deleteRecord: function(record) {
        var deferred = Ext.create('Deft.Deferred');
        record.destroy({
            callback: function(result, operation) {
                if(operation.wasSuccessful()) {
                    console.log("resolving:", record);
                    deferred.resolve([record]);
                } else {
                    deferred.reject(operation.Errors);
                }
            }
        });
        return deferred;
    }

});