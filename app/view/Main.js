Ext.define('ExtMVC.view.Main', {
    extend: 'Ext.container.Container',
    requires: [
        'Ext.tab.Panel',
        'Ext.layout.container.Border'
    ],
    xtype: 'app-main',
    layout: {
        type: 'border'
    },
    items: [
       {
            region: "north",
            xtype: "panel",
            margins: "5 5 0 5",
            height : 50,
            bodyStyle:{"background-color":"#3E7680"}, 
            bodyPadding:3,
            layout: {
                 type : 'hbox',
                 aling : 'streach'
            } ,
            items : [
                {
                    xtype :'container',
                    flex: 1,
                    html:"<img src='resources/images/logo.jpg' width=100 height:100 >"
                },
                {
                    xtype :'container',
                    flex: 2,
                    html:"<h2 style='color:#EFEFEF'>Programa Vaso de Leche</h2>"
                }
            ]
            
            
            
        },
        {
            region: 'west',
            margins: '5 0 0 5',
            xtype: 'panel',
            title: '.:_ Menu _:.',
            width: "20%",
            collapsible: true,
            collapsed:true,
            split: true,
            layout: {
                type: "fit"
            },
            items: [
                {
                    xtype: "arbolpanel"
                }
            ]
        },
        {
         region: 'center',
         padding: 5,
         itemId: 'tbpnlMantenimiento',
         defaults: {bodyPadding: 0},
         scrollable: true,
         layout:'fit',
           items: [
            {
                title: 'Nosotros',
                bodyPadding:200,
                //layout:'fit',
                //layout:'vbox',
                items:[
                  {
                    xtype  :'image',
                    src    : 'resources/images/logo.jpg',
                    flex: 1,
                    width  : 250,
                    height : 150,
                  }
                ]
            }
            ]
     }
    ]
});
