 Ext.define("ExtMVC.controller.Etapa",{
   extend:"Ext.app.Controller",
   views:[
       "ExtMVC.view.etapa.EtapaGrid"
   ],
   models:[
       "ExtMVC.model.etapa.Etapa"
   ],
   stores:[
     "ExtMVC.store.etapa.Etapa"  
   ],
   init:function(appliaction){
       this.control({
           
       });
   }
});