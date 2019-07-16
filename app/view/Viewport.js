Ext.define('ExtMVC.view.Viewport', {
    extend: 'Ext.container.Viewport',
    requires:[
        'Ext.layout.container.Fit',
        'ExtMVC.view.Main'
    ],

    layout: {
        type: 'fit'
    },

    items: [{
        xtype: 'app-main'
    }]
});
