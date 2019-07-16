Ext.define("ExtMVC.controller.Referencia",{
   extend:"Ext.app.Controller",
   views:[
       "ExtMVC.view.referencia.ReferenciaGrid"
   ],
   models:[
       "ExtMVC.model.referencia.Referencia"
   ],
   stores:[
       "ExtMVC.store.referencia.Referencia"
   ],
   init:function(application){
       this.control({
           
       });
   }
});