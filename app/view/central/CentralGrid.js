 Ext.define("ExtMVC.view.central.CentralGrid", {
    extend: "Ext.grid.Panel",
    alias: "widget.centralgrid",
    title: "Mantenimiento / Central",
    itemId : 'centralgrid',
    store: "ExtMVC.store.central.Central",
    layout: {
        type: "fit"
    },
    dockedItems: [
        {
            xtype: "toolbar",
            dock: "top",

            items: [
                {
                    text :'Agregar Coordinadora',
                    itemId :'btn_cetral_coordonadora'
                }
               /* {
                    xtype: "button",
                    text: "Nuevo",
                    itemId: "btn_nuevo_central",
                    //iconCls: "icon-add",
                   
                },
                {
                    xtype: "tbseparator"
                },
                {
                    xtype: "button",
                    text: "Editar",
                    itemId: "btn_editar_central",
                    //iconCls: "icon-edit",
                   
                },
                {
                    xtype: "tbseparator"
                },
                {
                    xtype: "button",
                    text: "Eliminar",
                    itemId: "btn_eliminar_central",
                    //iconCls: "icon-delete",
                   
                }*/
               
            ]
        }
    ],
    columns: [
        {
            xtype: "rownumberer"
        },
        {
            text: "Id",
            dataIndex: "centralid",
            width: 100,
            hidden: true
        },
        {
            text: "Descripcion",
            dataIndex: "descripcion",
            flex: 1
        },
        {
            text : 'Coordinadora',
            dataIndex : 'coordinadora',
            flex: 1.5
        }
       
    ]
});
 

 

