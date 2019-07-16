Ext.define("ExtMVC.view.beneficiario.SocioModificar", {
    extend: "Ext.window.Window",
    alias: "widget.sociomodificar",
    title: "Modificar Socio",
    itemId : 'wfrmsociomodificar',
    width: 850,
    height: 400,
    modal: true,
    resizable: false,
    autoShow:true,
    layout: {
        type: "fit"
    },
    items: [
        {
            xtype: "frmsociomodificar",
            height:300
        }
    ]
});

