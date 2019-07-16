Ext.define("ExtMVC.view.mantenimiento.CentralComiteSocioPanel", {
    extend: "Ext.panel.Panel",
    alias: "widget.centralcomitesociopanel",
    //layout: "anchor",
    layout: 
    { type:"vbox",
     align :'stretch'
    },
    items: [
        {
            xtype:'container',
            layout:{
              type:  'hbox',
              align : 'stretch'
            },
            items:[
                {
                    title: "Mantenimiento / Central",
                    xtype: "centralgrid",
                    flex: 1
                    //anchor: "100% 30%"
                }
                ,
                {
                    title: "Mantenimiento / Comite",
                    xtype: "comitegrid",
                    flex: 2
                    //anchor: "100% 35%"
                }
            ],
            flex :1 
        },
        {
            title: "Mantenimiento / Socio",
            xtype: "sociogrid",
            flex: 1.5
            //anchor: "100% 35%"
        }
    ]
});