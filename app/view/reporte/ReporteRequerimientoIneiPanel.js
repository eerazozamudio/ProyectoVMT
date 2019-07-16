Ext.define("ExtMVC.view.reporte.ReporteRequerimientoIneiPanel",{
   extend:"Ext.panel.Panel",
   alias:"widget.reporterequerimientoineipanel",
   layout:{
       type:"fit"
   },
   dockedItems:[
       {
           xtype:"toolbar",
           dock:"top",
           height:65,
           layout:{
               type:"vbox"
           },
           items:[
               {
                   xtype:"container",
                   padding:"5 5 5 5",
                   layout:{
                       type:"hbox"
                   },
                   items:[
                       {
                           xtype:"textfield",
                           name:"centralid",
                           itemId:"centralid",
                           readOnly:true,
                           hidden:true

                       },
                       {

                           xtype:"textfield",
                           name:"central",
                           itemId:"central",
                           fieldLabel:"Centro Acopio",
                           readOnly:true,
                           hidden:false,
                           labelAlign:"right",
                           labelWidth:60
                       },
                       {
                            xtype:"button",
                            text:"...",
                            itemId:"btnbuscar",
                            margin:"0 0 0 5"
                        },
                        {
                            xtype:"button",
                            itemId:"btnimprimir",
                            text:"Imprimir",
                            margin:"0 0 0 5",
                            hidden:true
                        },
                        {
                            xtype:"button",
                            itemId:"btnimprimir2",
                            text:"Imprimir Cantidad X Central",
                            margin:"0 0 0 50"
                        },
                        {
                            xtype:"button",
                            itemId:"btnimprimir3",
                            text:"Imprimir Canttidad Todos",
                            margin:"0 0 0 50",
hidden:true
                        }




                   ]
               },
               {
                   xtype:"container",
                    padding:"0 5 0 5",
                   layout:{
                       type:"hbox"
                   },
                   items:[
                        {
                           xtype:"textfield",
                           name:"comiteid",
                           itemId:"comiteid",
                           readOnly:true,
                           hidden:true
                        },
                        {
                            xtype:"textfield",
                            fieldLabel:"Comite",
                            name:"comite",
                            itemId:"comite",
                            readOnly:true,
                            hidden:false,
                            labelAlign:"right",
                            labelWidth:60
                        },
                        {
                            xtype:"textfield",
                            fieldLabel:"Ubicacion",
                            name:"ubicacion",
                            itemId:"ubicacion",
                            width:250,
                            readOnly:true,
                            hidden:false,
                            labelAlign:"right",
                            labelWidth:60
                        }


                   ]
               }

           ]
       }
   ]

});
