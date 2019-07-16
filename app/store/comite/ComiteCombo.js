Ext.define("ExtMVC.store.comite.ComiteCombo",{
   extend:"Ext.data.Store",
   model:"ExtMVC.model.comite.Comite",
   sorters:[
       {
           property:"codigointerno",
           direction:"asc"
       }
   ],
   proxy:
       {
           type:"ajax",
           api:{
               read:"resources/api/comite/listaPorCentralId"
           },
           writer:{
               type:"json",
               root:"data",
               encode:true
           },
           reader:{
               type:"json",
               root:"data"
           },
           extraParams:{
               data:Ext.JSON.encode
               (
                       {
                           centralid:0
                           
                       }
                )
           }
       }
       
   
});