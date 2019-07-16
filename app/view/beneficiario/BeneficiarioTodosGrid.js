 Ext.define("ExtMVC.view.beneficiario.BeneficiarioTodosGrid", {
    extend: "Ext.grid.Panel",
    alias: "widget.beneficiariotodosgrid",
    title: "Mantenimiento / Beneficiario",
    itemId : 'BeneficiarioGrid',
    store: "ExtMVC.store.beneficiario.BeneficiarioTodos",
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
                {
                   xtype:"button",
                   text:"Refrescar",
                   itemId:"btnRefrescar",
                   //iconCls:"icon-reload",
                   margin:"0 0 0 5",
                   fixed:true
               },
               {
                  xtype:"textfield",
                  itemId:"totalbeneficiario",
                  width:200,
                  fieldLabel:"Cantidad",
                  margin:"0 0 0 5",
                  labelAlign:"right",
                  readOnly:true
               },
               {
                   xtype:'label',
                   text : 'Se muestra solo los primeros 1000 en pantalla'
               },
               '->',
               {
                text : 'Modificar Socio',
                itemId : 'btn_ModificarSocio'
                },
               {
                   text : 'Activar Beneficiario',
                   itemId : 'btnActivarBeneficiario'
               }
               
            ]
        }
    ],
    columns: [
        {
            text: "Ape.Paterno",
            dataIndex: "apepater",
            flex:1
        },
        {
            text: "Ape.Materno",
            dataIndex: "apemater",
            flex:1
        },
        {
            text: "Nombre",
            dataIndex: "nombre",
            flex:1
        },
        {
            text: "DNI",
            dataIndex: "dni",
            flex:1
        },

        {
            text:"Socio",
            dataIndex:"socio",
            flex:1
        },
        {
            text:"DNI Socio",
            dataIndex:"dnisocio",
            flex:1
        },
        {
            text:"Centro Acopio",
            dataIndex:"central",
            flex:1
        },
        {
            text:"Comite",
            dataIndex:"comite",
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
 

 

