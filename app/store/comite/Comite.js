Ext.define("ExtMVC.store.comite.Comite",{
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
               read:"resources/api/comite/listaPorCentral"
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
                           centralid:0,
                           cadena:""
                       }
                )
           }
       }
       
   
});