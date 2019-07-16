Ext.define("ExtMVC.store.beneficiario.BeneficiarioTodos",{
   extend:"Ext.data.Store",
   model:"ExtMVC.model.beneficiario.Beneficiario",
   sorters:[
       {
           property:"beneficiarioid",
           direction:"asc"
       }
   ],
   proxy:
       {
           type:"ajax",
           api:{
               read:"resources/api/beneficiario/listaTodos"
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
                         cadena:""
                     }
             )
           }

       },callback:function(){

            alert("sasasa");

           }
       
   
});