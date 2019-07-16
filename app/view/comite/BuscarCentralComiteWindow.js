Ext.define("ExtMVC.view.comite.BuscarCentralComiteWindow", {
   extend:"Ext.window.Window", 
    alias: "widget.buscarcentralcomitewindow",
    title: "Buscar",
    width: 750,
    height: 500,
    modal: true,
    autoShow: true,
    resizable: false,
    layout: {
        type: "fit"
    },
    items:[
        {
            xtype:"centralcomitepanel"
        }
    ]
});
