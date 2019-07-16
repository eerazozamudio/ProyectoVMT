Ext.define("ExtMVC.controller.Lote",{
   extend:"Ext.app.Controller",
   views:[
       "ExtMVC.view.lote.LoteGrid"
   ],
   models:[
       "ExtMVC.model.lote.Lote"
   ],
   stores:[
     "ExtMVC.store.lote.Lote"  
   ],
   init:function(appliaction){
       this.control({
           
       });
   }
});