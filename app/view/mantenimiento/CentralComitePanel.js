Ext.define("ExtMVC.view.mantenimiento.CentralComitePanel", {
    extend: "Ext.panel.Panel",
    alias: "widget.centralcomitepanel",
    layout: "anchor",
    items: [
        {
            title: "Mantenimiento / Central",
            xtype: "centralbuscargrid",
            anchor: "100% 40%"
        }
        ,
        {
            title: "Mantenimiento / Comite",
            xtype: "comitebuscargrid",
            anchor: "100% 60%"
        } 
    ]
});