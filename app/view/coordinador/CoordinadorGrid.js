 Ext.define("ExtMVC.view.coordinador.CoordinadorGrid", {
    extend: "Ext.grid.Panel",
    alias: "widget.coordinadorgrid",
    title: "Mantenimiento / Coordinador",
    store: "ExtMVC.store.coordinador.Coordinador",
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
                    hidden:false
                },
                {
                    xtype: "tbseparator"
                },
                {
                    xtype: "button",
                    text: "Editar",
                    itemId: "btn_editar",
                    //iconCls: "icon-edit",
                    hidden:false
                },
                {
                    xtype: "tbseparator"
                },
                {
                    xtype: "button",
                    text: "Eliminar",
                    itemId: "btn_eliminar",
                    //iconCls: "icon-delete",
                    hidden:false
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
            dataIndex: "idcoor",
            width: 100,
            hidden: true
        },
        {
            text: "Nombres",
            dataIndex: "nombres",
            flex :1
        },
         {
            text: "Apellidos",
            dataIndex: "apellidos",
            flex :1
        },
        {
            text: "Dni",
            dataIndex: "dni",
            flex : 1
        },
         {
            text: "Cargo",
            dataIndex: "cargo",
            flex :2
        },
         {
            text: "Telefono",
            dataIndex: "telefono",
            flex: 1
        } 
       
    ]
});
 

 

