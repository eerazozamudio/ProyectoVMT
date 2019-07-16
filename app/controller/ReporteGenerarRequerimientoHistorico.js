Ext.define("ExtMVC.controller.ReporteGenerarRequerimientoHistorico", {
    extend: "Ext.app.Controller",
    views: [
        "ExtMVC.view.reporte.ReporteGenerarRequerimientoHistoricoPanel"
    ],
    models: [
    ],
    stores: [
    ],
    init: function (application) {
        this.control({
            /*"reportegenerarrequerimientopanel button#btnimprimir":{
                click:this.btnimprimir_onClick
            },*/
            "reportegenerarrequerimientohistoricopanel button#btnimprimirResumen":{
                click:this.btnimprimir_resumen_onClick
            },
        });
    },

    btnimprimir_resumen_onClick:function(btn,e,opc){
        panel=btn.up("panel");
        _anio   = panel.down("#txtAnio").getValue();
        _mes    = panel.down("#txtMes").getValue();
        _semana = panel.down("#txtSemana").getValue();
        
        panel.removeAll();
        panel.add({
             xtype: "uxiframe",
             src: "resources/api/reportegenerarrequerimiento/imprimirresumen?anio="+_anio+"&mes="+_mes+"&semana="+_semana
        });

      
     },
   /* btnimprimir_onClick:function(btn,e,opc){
      
       var panel=btn.up("panel");
       if(panel.down("#centralid").getValue()!=null){
           
           var id=panel.down("#centralid").getValue();
           var central=
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
        
    }*/
});