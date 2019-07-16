Ext.define("ExtMVC.controller.Opcion",{
   extend:"Ext.app.Controller",
   views:[
       "ExtMVC.view.opcion.OpcionGrid"
   ],
   models:[
       "ExtMVC.model.opcion.Opcion"
   ],
   stores:[
     "ExtMVC.store.opcion.Opcion"  
   ],
   init:function(appliaction){
       this.control({
           
       });
   }
});