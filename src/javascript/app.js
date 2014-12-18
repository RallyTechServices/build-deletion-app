Ext.define('CustomApp', {
    extend: 'Rally.app.App',
    componentCls: 'app',
    logger: new Rally.technicalservices.Logger(),
    defaults: { margin: 10 },
    items: [
        {xtype:'container',itemId:'message_box'},
        {xtype:'container',itemId:'display_box'},
        {xtype:'tsinfolink'}
    ],
    launch: function() {
        var m_name = 'Build',
            m_fields = ['BuildDefinition','Number','CreationDate','Status'];
        
        this._makeGrid(m_name, m_fields);
    },
    _makeGrid: function(model_name, model_fields){        
        var store = Ext.create('Rally.data.wsapi.Store', {
            model: model_name,
            fetch: model_fields,
            autoLoad: true
        });
        this.down('#display_box').add({
            xtype: 'rallygrid',
            store: store,
            enableBulkEdit: true,
            columnCfgs: model_fields
        });
    }
});