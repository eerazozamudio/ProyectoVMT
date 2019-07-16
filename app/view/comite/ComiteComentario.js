Ext.define("ExtMVC.view.comite.ComiteComentario", {
    extend: "Ext.window.Window",
    alias: "widget.comitecomentarioform",
    title: "Comite Comentarios",
    width: 500,
    height: 250,
    modal: true,
    autoShow: true,
    resizable: false,
    layout: {
        type: "anchor"
    },
    items: [
        {
            xtype: "form",
            style: "border-style:none",
            itemId: "form1",
            padding: "15 15 0 15",
            frame: true,
            items: [
                {
                    xtype: "fieldset",
                    title: "Datos ",
                    padding: "10 10 10 10",
                    items: [
                        {
                            xtype: "textfield",
                            name: "comiteid",
                            itemId: "comiteid",
                            hidden: true,
                            value : 0,
                            readOnly: true
                        },
                        {
                            xtype: "textfield",
                            name: "centralid",
                            itemId: "centralid",
                            hidden: true,
                            readOnly: true
                        },
                        {
                            xtype:'datefield',
                            value : new Date(),
                            fieldLabel : 'Fecha',
                            name : 'fecha',
                            itemId : 'fecha'
                        },
                        {
                            xtype: "textarea",
                            name: "comentario",
                            itemId: "comenatario",
                            fieldLabel: "Comentario",
                            allowBlank: true,
                            width: 400
                        }




                    ]
                }
            ]
        }
    ],
    buttons: [
        {
            xtype: "button",
            itemId: "btn_grabar",
            text: "Grabar",
            //iconCls: "icon-save"
        },
        {
            xtype: "button",
            itemId: "btn_cancelar",
            text: "Cancelar",
            //iconCls: "icon-cancel"
        }

    ]
});
