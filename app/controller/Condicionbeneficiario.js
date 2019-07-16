Ext.define("ExtMVC.controller.Condicionbeneficiario",{
   extend:"Ext.app.Controller",
   views:[
       
   ],
   models:[
       "ExtMVC.model.condicionbeneficiario.Condicionbeneficiario"
   ],
   stores:[
       "ExtMVC.store.condicionbeneficiario.Condicionbeneficiario",
       "ExtMVC.store.Centro"
   ],
   init:function(application){
       this.control({
           
       });
   }
   
   
});