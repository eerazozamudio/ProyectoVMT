 Ext.define("ExtMVC.view.comite.ComiteGrid", {
    extend: "Ext.grid.Panel",
    alias: "widget.comitegrid",
    title: "Mantenimiento / Comite",
    store: "ExtMVC.store.comite.Comite",
    layout: {
        type: "fit"
    },
    itemId : 'dgvComites',
    dockedItems: [
        {
            xtype: "toolbar",
            hidden:false,
            dock: "top",
            items: [
                {
                    xtype: "button",
                    text: "Nuevo",
                    itemId: "btn_nuevo",
                    //iconCls: "icon-add",
                   // hidden:false
                },
                {
                    xtype: "tbseparator"
                },
                {
                    xtype: "button",
                    text: "Editar",
                    itemId: "btn_editar",
                    //iconCls: "icon-edit",
                   // hidden:false
                },
                {
                    xtype: "tbseparator"
                },
                {
                    xtype: "button",
                    text: "Eliminar",
                    itemId: "btn_eliminar",
                    //iconCls: "icon-delete",
                  //  hidden:false
                },
                {
                    xtype: "button",
                    text: "Agregar Comentario",
                    itemId: "btn_comentario",
                }


            ]
        },
        {
            xtype: "toolbar",
            dock: "top",
            items:[
                {
                    xtype:"textfield",
                    name:"txtBuscar",
                    itemId:"txtBuscar",
                    fieldLabel: "Buscar",
                    labelAlign:"right",
                    fieldStyle: "text-transform:uppercase",
                    labelWidth:40
               },
               {
                   xtype:"button",
                   text:"Buscar",
                   itemId:"btnBuscar",
                   //iconCls:"icon-buscar",
                   margin:"0 0 0 5",
                   fixed:true
               },
               
            ]
        }
    ],
    columns: [
        {
            xtype: "rownumberer"
        },
        {
            text: "Id",
            dataIndex: "comiteid",
            width: 100,
            hidden: true
        },
        {
            text: "Codigo",
            dataIndex: "codigointerno",
            flex: 1
        },
        {
            text:"Ubicacion",
            dataIndex:"direccion",
            flex:1.5
        },
        {
            text:"Coordinadora",
            dataIndex:"coordinadorcomite",
            flex:2
        }

    ]
});
