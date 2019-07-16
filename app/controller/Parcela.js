Ext.define("ExtMVC.controller.Parcela",{
   extend:"Ext.app.Controller",
   views:[
       "ExtMVC.view.parcela.ParcelaGrid"
   ],
   models:[
       "ExtMVC.model.parcela.Parcela"
   ],
   stores:[
     "ExtMVC.store.parcela.Parcela"  
   ],
   init:function(appliaction){
       this.control({
           
       });
   }
});