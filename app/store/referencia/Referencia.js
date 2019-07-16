Ext.define("ExtMVC.store.referencia.Referencia", {
    extend: "Ext.data.Store",
    model: "ExtMVC.model.referencia.Referencia",
    sorters: [
        {
            property: "referenciaid",
            direction: "asc"
        }
    ],
    proxy:{
        type:"ajax",
        api:{
            read:"resources/api/referencia/lista"
        },
        writer:{
            type:"json",
            root:"data",
            encode:true
        },
        reader:{
            type:"json",
            root:"data"
        }
    }
});