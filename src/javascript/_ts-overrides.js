/*
 * Make it so builds can be bulk edited (need checkboxes)
 */
Ext.override(Rally.ui.grid.CheckboxModel, {

    _recordIsSelectable: function(record) {
        var selectable = record.self.isArtifact() && record.get('updatable');
        
        if ( /\.Build/.test(record.self.getName()) ) {
            selectable = true;
        }
        return selectable;
    }
    
});

/*
 * define the menu
 */
Ext.override(Rally.ui.menu.bulk.RecordMenu,{
    items: [
        {xtype: 'tsbulkdelete'}
    ]
});
