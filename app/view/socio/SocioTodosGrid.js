 Ext.define("ExtMVC.view.socio.SocioTodosGrid", {
    extend: "Ext.grid.Panel",
    alias: "widget.sociotodosgrid",
    title: "Mantenimiento / Socio",
    store: "ExtMVC.store.socio.SocioTodos",
    layout: {
        type: "fit"
    },
    dockedItems: [
       
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
                {
                   xtype:"button",
                   text:"Refrescar",
                   itemId:"btnRefrescar",
                   //iconCls:"icon-reload",
                   margin:"0 0 0 5",
                   fixed:true
               },
               {
                xtype: "tbseparator"
                },
               {
                xtype:"button",
                text:"Activar",
                itemId:"btnActivar",
                //iconCls:"icon-reload",
                margin:"0 0 0 5",
                fixed:true
            }
               
            ]
        }
    ],
    columns: [
       {
            xtype: "rownumberer",
            width:50
        },
        {
            text: "Id",
            dataIndex: "socioid",
            width: 100,
            hidden: true
        },
        {
            text: "Ape.Paterno",
            dataIndex: "apepater",
            flex: 2
        },
        {
            text: "Ape.Materno",
            dataIndex: "apemater",
            flex: 2
        },
        {
            text: "Nombre",
            dataIndex: "nombre",
            flex: 2
        },
        {
            text: "DNI",
            dataIndex: "dni",
            flex: 1
        },
        {
            text:"Centro Acopio",
            dataIndex:"central",
            flex:1.5
        },
        {
            text:"Comite",
            dataIndex:"codigointerno",
            flex:1
        },
        {
            text:"Estado",
            dataIndex:"estado",
            flex:1,
            renderer:function(v,s){
                if (v <= 0){
                  s.style = "color:red;font-Size:15px";
                  return 'Inactivo';
                }
                else{
                  s.style = "font-Size:15px";
                  return 'Activo';
                }

                
            }
        }
       
    ]
});
 

 

