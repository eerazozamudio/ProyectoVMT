Ext.define("ExtMVC.controller.ReporteRequerimientoInei", {
    extend: "Ext.app.Controller",
    views: [
        "ExtMVC.view.reporte.ReporteRequerimientoIneiPanel"
    ],
    models: [
    ],
    stores: [
    ],
    init: function (application) {
        this.control({
            "reporterequerimientoineipanel button#btnimprimir":{
                click:this.btnimprimir_onClick
            }
        });
    },
    btnimprimir_onClick:function(btn,e,opc){
      
       var panel=btn.up("panel");
       if(panel.down("#centralid").getValue()!=null){
           
           var id=panel.down("#centralid").getValue();
           var central=
           panel.removeAll();
            panel.add({
            xtype: "uxiframe",
            src: "resources/api/reporterequerimientoinei/imprimir?id="+id
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