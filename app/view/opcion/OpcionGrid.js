 Ext.define("ExtMVC.view.opcion.OpcionGrid", {
    extend: "Ext.grid.Panel",
    alias: "widget.opciongrid",
    title: "Mantenimiento / Opcion",
    store: "ExtMVC.store.opcion.Opcion",
    layout: {
        type: "fit"
    },
    dockedItems: [
        {
            xtype: "toolbar",
            dock: "top",
            items: [
                {
                    xtype: "button",
                    text: "Nuevo",
                    itemId: "btn_nuevo",
                    //iconCls: "icon-add",
                    hidden:true
                },
                {
                    xtype: "tbseparator"
                },
                {
                    xtype: "button",
                    text: "Editar",
                    itemId: "btn_editar",
                    //iconCls: "icon-edit",
                    hidden:true
                },
                {
                    xtype: "tbseparator"
                },
                {
                    xtype: "button",
                    text: "Eliminar",
                    itemId: "btn_eliminar",
                    //iconCls: "icon-delete",
                    hidden:true
                },
                {
                    xtype:"tbseparator"
                }
               
            ]
        }
    ],
    columns: [
        {
            xtype: "rownumberer"
        },
        {
            text: "Id",
            dataIndex: "opcionid",
            width: 100,
            hidden: true
        },
        {
            text: "Descripcion",
            dataIndex: "descripcion",
            flex: 2
        } 
       
    ]
});
 

 

