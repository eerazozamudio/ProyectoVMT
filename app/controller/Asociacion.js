Ext.define("ExtMVC.controller.Asociacion",{
   extend:"Ext.app.Controller",
   views:[
       "ExtMVC.view.asociacion.AsociacionGrid"
   ],
   models:[
       "ExtMVC.model.asociacion.Asociacion"
   ],
   stores:[
     "ExtMVC.store.asociacion.Asociacion"  
   ],
   init:function(appliaction){
       this.control({
           
       });
   }
});