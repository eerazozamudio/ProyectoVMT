Ext.define("ExtMVC.controller.Manzana",{
   extend:"Ext.app.Controller",
   views:[
       "ExtMVC.view.manzana.ManzanaGrid"
   ],
   models:[
       "ExtMVC.model.manzana.Manzana"
   ],
   stores:[
     "ExtMVC.store.manzana.Manzana"  
   ],
   init:function(appliaction){
       this.control({
           
       });
   }
});