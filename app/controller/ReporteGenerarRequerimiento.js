Ext.define("ExtMVC.controller.ReporteGenerarRequerimiento", {
    extend: "Ext.app.Controller",
    views: [
        "ExtMVC.view.reporte.ReporteGenerarRequerimientoPanel"
    ],
    models: [
    ],
    stores: [
    ],
    init: function (application) {
        this.control({
            "reportegenerarrequerimientopanel button#btnimprimir":{
                click:this.btnimprimir_onClick
            },
            "reportegenerarrequerimientopanel button#btnimprimirResumen":{
                click:this.btnimprimir_resumen_onClick
            },
            "reportegenerarrequerimientopanel button#btnGuardarHistorico":{
                click:this.btnguardar_requerimiento_semanal
            },
            "reportegenerarrequerimientopanel button#btnimprimirGuias":{
                click:this.btnimprimirGuias_onClick
            },
            "reportegenerarrequerimientopanel button#btnimprimirGuiasLeche":{
                click:this.btnimprimirGuiasLeche_onClick
            },
            

        });
    },
    btnguardar_requerimiento_semanal:function(btn,e,opc){
        panel   = btn.up("panel");
        _anio   = panel.down("#txtAnio").getValue();
        _mes    = panel.down("#txtMes").getValue();
        _semana = panel.down("#txtNumeroSemana").getValue();
        _msg    = Ext.ComponentQuery.query('#panReporteRequerimiento')[0];

        Ext.Ajax.request({
            url :'resources/api/reportegenerarrequerimiento/validarrequerimientosemanal',
            params:{
              anio   : _anio,
              mes    : _mes,
              semana : _semana
            },
            success:function(response){
              obj =  Ext.JSON.decode( response.responseText);
              if(obj.existe>0){
                Ext.Msg.alert("Alerta","Ya existe un requerimiento guardado de esta semana " + _semana);return false;
              }else{
                myMask = new Ext.LoadMask(_msg, {msg:"... Guardando Información"});
                myMask.show();
                Ext.Ajax.request({
                    url :'resources/api/reportegenerarrequerimiento/guardarRequerimiento',
                    params:{
                      anio   : _anio,
                      mes    : _mes,
                      semana : _semana
                    },
                    success:function(response){
                       obj =  Ext.JSON.decode( response.responseText);
                       if(obj.data[0].myerror ==0){
                          myMask.destroy();
                          Ext.Msg.alert("Guardado","Se ha guardado los historicos del requerimiento revisar en historicos");return false;
                       }else{
                           myMask.destroy();
                           Ext.Msg.alert("Error","Surgio un error, vuelva a intentar o comunicar a soporte");return false;
                       }

                    }
                });
              }
            }
        });



    },
    btnimprimir_resumen_onClick:function(btn,e,opc){
        panel=btn.up("panel");
        _anio   = panel.down("#txtAnio").getValue();
        _mes    = panel.down("#txtMes").getValue();
        _semana = panel.down("#txtSemana").getValue();

        var id=panel.down("#centralid").getValue();
        //var central=
        panel.removeAll();
        panel.add({
             xtype: "uxiframe",
             src: "resources/api/reportegenerarrequerimiento/imprimirresumen?anio="+_anio+"&mes="+_mes+"&semana="+_semana
        });
     },
     btnimprimirGuias_onClick:function(btn,e,opc){
       var panel        = btn.up("panel");
       if(panel.down("#centralid").getValue()!=null){
            id=panel.down("#centralid").getValue();
            
            panel.removeAll();
            
           
            w = Ext.create('Ext.window.Window',{
                autoShow:true,
                title : 'Ingresar fecha entrega',
                width : 315, height:170,
                layout:'vbox',
                bodyPadding : 10,
                items:[//eddy
                  {xtype:'datefield',fieldLabel:'Fecha',value:new Date(),itemId:'btnFechaEntrega',flex:1},
                  {xtype:'numberfield',fieldLabel:'Número Semana',value:0,itemId:'nfNumeroSemana',flex: 1}
                ],
                modal:true,
                buttons:[
                  {
                    text : 'Imprimir',
                    handler:function(e){
                         f = Ext.ComponentQuery.query('#btnFechaEntrega')[0].getRawValue();
                         s = Ext.ComponentQuery.query('#nfNumeroSemana')[0].getValue();
                         if(f){
                           panel.add({
                                  xtype: "uxiframe",
                                  src: "resources/api/reportegenerarrequerimiento/imprimirguia?id="+id+"&fentrega="+ f.toString()+"&nsemana="+ s.toString()
                           });
                           w.close();
                        }else{
                          Ext.Msg.alert("Error","Ingresar Fecha");
                        }
                    }
                  }
                ],
                
            });


       }else{

            Ext.Msg.show({
                title: "Mensaje",
                msg: "Seleccione una Central...!",
                buttons: Ext.Msg.OK,
                buttonText: {
                    ok: "Aceptar"
                },
                icon: Ext.Msg.ERROR
            });
       }
     },
     btnimprimirGuiasLeche_onClick:function(btn,e,opc){
        var panel        = btn.up("panel");
        if(panel.down("#centralid").getValue()!=null){
             id=panel.down("#centralid").getValue();
             
             panel.removeAll();
             
            
             w = Ext.create('Ext.window.Window',{
                 autoShow:true,
                 title : 'Ingresar fecha entrega',
                 width : 315, height:170,
                 layout:'vbox',
                 bodyPadding : 10,
                 items:[
                   {xtype:'datefield',fieldLabel:'Fecha',value:new Date(),itemId:'btnFechaEntrega',flex:1},
                   {xtype:'numberfield',fieldLabel:'Número Semana',value:0,itemId:'nfNumeroSemana',flex: 1}
                 ],
                 modal:true,
                 buttons:[
                   {
                     text : 'Imprimir',
                     handler:function(e){
                          f = Ext.ComponentQuery.query('#btnFechaEntrega')[0].getRawValue();
                          s = Ext.ComponentQuery.query('#nfNumeroSemana')[0].getValue();
                          if(f){
                            panel.add({
                                   xtype: "uxiframe",
                                   src: "resources/api/reportegenerarrequerimiento/imprimirguialeche?id="+id+"&fentrega="+ f.toString()+"&nsemana="+ s.toString()
                            });
                            w.close();
                         }else{
                           Ext.Msg.alert("Error","Ingresar Fecha");
                         }
                     }
                   }
                 ],
                 
             });
 
 
        }else{
 
             Ext.Msg.show({
                 title: "Mensaje",
                 msg: "Seleccione una Central...!",
                 buttons: Ext.Msg.OK,
                 buttonText: {
                     ok: "Aceptar"
                 },
                 icon: Ext.Msg.ERROR
             });
        }
      },
    btnimprimir_onClick:function(btn,e,opc){
       var panel=btn.up("panel");
       if(panel.down("#centralid").getValue()!=null){
            id=panel.down("#centralid").getValue();
            panel.removeAll();
            panel.add({
             xtype: "uxiframe",
             src: "resources/api/reportegenerarrequerimiento/imprimir?id="+id
            });


       }else{

            Ext.Msg.show({
                title: "Mensaje",
                msg: "Seleccione una Central...!",
                buttons: Ext.Msg.OK,
                buttonText: {
                    ok: "Aceptar"
                },
                icon: Ext.Msg.ERROR
            });
       }

    }
});
