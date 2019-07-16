Ext.define("ExtMVC.store.barrio.BarrioSectorEtapa", {
    extend: "Ext.data.Store",
    model: "ExtMVC.model.barrio.Barrio",
    sorters: [
        {
            property: "barrioid",
            direction: "asc"
        }
    ],
    proxy: {
        type: "ajax",
        api: {
            read: "resources/api/barrio/listaSectorEtapa"
        },
        writer: {
            type: "json",
            root: "data",
            encode: true
        },
        reader: {
            type: "json",
            root: "data"
        }
        ,
        extraParams: {
            data: Ext.JSON.encode
                    (
                            {
                                opcion: 0
                            }
                    )
        }
    }
});