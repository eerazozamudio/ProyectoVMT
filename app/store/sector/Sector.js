Ext.define("ExtMVC.store.sector.Sector", {
    extend: "Ext.data.Store",
    model: "ExtMVC.model.sector.Sector",
    sorters: [
        {
            property: "sectorid",
            direction: "asc"
        }
    ],
    proxy:{
        type:"ajax",
        api:{
            read:"resources/api/sector/lista"
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