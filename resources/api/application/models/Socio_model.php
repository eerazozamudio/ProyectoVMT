<?php

class Socio_model extends CI_Model {

    public function __construct() {
        parent::__construct();
    }

    public function trasladar($arreglo) {

        $cadena = $arreglo["cadena"];
        $arreglocadena = explode(",", $cadena);
        $this->db->trans_begin();
        foreach ($arreglocadena as $value) {
            $array[0] = $arreglo["centralid"];
            $array[1] = $arreglo["comiteid"];
            $array[2] = $value;
            $sql = "update socio set centralid=?,comiteid=? where socioid=?";
            $this->db->query($sql, $array);
        }
        if ($this->db->trans_status() === FALSE) {
            $this->db->trans_rollback();
            $data["success"] = FALSE;
        } else {
            $this->db->trans_commit();
            $data["success"] = TRUE;
        }
        return $data;
    }

    public function existeDni($arreglo) {
        $array[0] = $arreglo["dni"];
        $sql = "select * from socio where dni=? and estado=1";
        $rs = $this->db->query($sql, $array);
        $data["success"] = ($rs->num_rows() > 0) ? TRUE : FALSE;
        return $data;
    }

    public function existeDniActualizar($arreglo) {
        $array[0] = $arreglo["dni"];
        $array[1] = $arreglo["socioid"];
        $sql = "select * from socio where dni=? and socioid!=?";
        $rs = $this->db->query($sql, $array);
        $data["success"] = ($rs->num_rows() > 0) ? TRUE : FALSE;
        return $data;
    }

    public function lista($arreglo) {


        $sql = "select
socio.socioid,
socio.centralid,
central.descripcion as central,
socio.comiteid,
comite.codigointerno as codigointerno,
socio.apepater,
socio.apemater,
socio.nombre,
socio.dni,
socio.opcionid,
opcion.descripcion as opcion,
socio.sectorid,
sector.descripcion as sector,
socio.grupoid,
grupo.descripcion as grupo,
socio.etapaid,
etapa.descripcion as etapa,
socio.barrioid,
barrio.descripcion as barrio,
socio.parcelaid,
parcela.descripcion as parcela,
socio.asentamientohumanoid,
asentamientohumano.descripcion as asentamientohumano,
socio.asociacionid,
asociacion.descripcion as asociacion,
socio.cooperativaid,
cooperativa.descripcion as cooperativa,
socio.manzanaid,
manzana.descripcion as manzana,
socio.loteid,
lote.descripcion as lote,
socio.referenciaid,
referencia.descripcion as referencia,
socio.observacion
from socio 
left join central on socio.centralid=central.centralid
left join comite on socio.comiteid=comite.comiteid
left join opcion on socio.opcionid=opcion.opcionid
left join  sector on socio.sectorid=sector.sectorid
left join grupo on socio.grupoid=grupo.grupoid
left join etapa on socio.etapaid=etapa.etapaid
left join barrio on socio.barrioid=barrio.barrioid
left join parcela on socio.parcelaid=parcela.parcelaid
left join asentamientohumano on socio.asentamientohumanoid=asentamientohumano.asentamientohumanoid
left join asociacion on socio.asociacionid=asociacion.asociacionid
left join cooperativa on socio.cooperativaid=cooperativa.cooperativaid
left join manzana on socio.manzanaid=manzana.manzanaid
left join lote on socio.loteid=lote.loteid
left join referencia on socio.referenciaid=referencia.referenciaid where socio.estado=1 and socio.centralid=? and 
socio.comiteid=? and (socio.dni like ? or socio.apepater like ? or socio.apemater like ?) limit 1000";
        $param[0] = $arreglo["centralid"];
        $param[1] = $arreglo["comiteid"];
        $param[2] = '%' . $arreglo["cadena"] . '%';
        $param[3] = '%' . $arreglo["cadena"] . '%';
        $param[4] = '%' . $arreglo["cadena"] . '%';
        $rs = $this->db->query($sql, $param);
        $data["success"] = ($rs->num_rows() > 0) ? TRUE : FALSE;
        $data["data"] = $rs->result();
        return $data;
    }

    public function listaSocioPorComite($arreglo) {
        $sql = "select
socio.socioid,
socio.centralid,
central.descripcion as central,
socio.comiteid,
comite.codigointerno as codigointerno,
socio.apepater,
socio.apemater,
socio.nombre,
socio.dni,
socio.opcionid,
opcion.descripcion as opcion,
socio.sectorid,
sector.descripcion as sector,
socio.grupoid,
grupo.descripcion as grupo,
socio.etapaid,
etapa.descripcion as etapa,
socio.barrioid,
barrio.descripcion as barrio,
socio.parcelaid,
parcela.descripcion as parcela,
socio.asentamientohumanoid,
asentamientohumano.descripcion as asentamientohumano,
socio.asociacionid,
asociacion.descripcion as asociacion,
socio.cooperativaid,
cooperativa.descripcion as cooperativa,
socio.manzanaid,
manzana.descripcion as manzana,
socio.loteid,
lote.descripcion as lote,
socio.referenciaid,
referencia.descripcion as referencia,
socio.observacion,
case socio.opcionid 
when 1 then (select case when socio.sectorid  !=8 then (select concat(sector.descripcion,space(2),'GRUPO',space(1),grupo.descripcion,space(2),'Mz.',space(1),manzana.descripcion,space(1),'Lt.',space(1),lote.descripcion)) when socio.sectorid =8 then  (select concat(sector.descripcion,space(2),'PARCELA',space(1),parcela.descripcion,space(2),'Mz.',space(1),manzana.descripcion,space(1),'Lt.',space(1),lote.descripcion))  end)
when 2 then (select case when socio.etapaid  !=4 then (select concat('ETAPA',space(1),etapa.descripcion,space(2),'Mz.',space(1),manzana.descripcion,space(1),'Lt.',space(1),lote.descripcion,space(2),' - ',space(1),'PACHACAMAC')) when socio.etapaid =4 then  (select concat('ETAPA',space(1),etapa.descripcion,space(2),sector.descripcion,space(2),'BARRIO ',space(1),barrio.descripcion,space(2),'Mz.',space(1),manzana.descripcion,space(1),'Lt.',space(1),lote.descripcion,space(1),' - ',space(1),'PACHACAMAC'))  end)
when 3 then (select concat('AAHH.',space(1),asentamientohumano.descripcion,space(2),'Mz.',space(1),manzana.descripcion,space(1),'Lt.',space(1),lote.descripcion))
when 4 then (select case when socio.asociacionid  !=12 then (select concat('ASOC. ',space(1),asociacion.descripcion,space(2),'Mz.',space(1),manzana.descripcion,space(1),'Lt.',space(1),lote.descripcion)) when socio.asociacionid =12 then  (select concat('ASOC. ',space(1),asociacion.descripcion,space(2),'GRUPO',space(1),grupo.descripcion,space(2),'Mz.',space(1),manzana.descripcion,space(1),'Lt.',space(1),lote.descripcion))  end)
when 5 then (select concat('Coopertiva ',space(1),cooperativa.descripcion,space(2),'Mz.',space(1),manzana.descripcion,space(1),'Lt.',space(1),lote.descripcion))
end as direccion
from socio 
left join central on socio.centralid=central.centralid
left join comite on socio.comiteid=comite.comiteid
left join opcion on socio.opcionid=opcion.opcionid
left join  sector on socio.sectorid=sector.sectorid
left join grupo on socio.grupoid=grupo.grupoid
left join etapa on socio.etapaid=etapa.etapaid
left join barrio on socio.barrioid=barrio.barrioid
left join parcela on socio.parcelaid=parcela.parcelaid
left join asentamientohumano on socio.asentamientohumanoid=asentamientohumano.asentamientohumanoid
left join asociacion on socio.asociacionid=asociacion.asociacionid
left join cooperativa on socio.cooperativaid=cooperativa.cooperativaid
left join manzana on socio.manzanaid=manzana.manzanaid
left join lote on socio.loteid=lote.loteid
left join referencia on socio.referenciaid=referencia.referenciaid where socio.comiteid=? and socio.estado=1";
        $rs = $this->db->query($sql, $arreglo["comiteid"]);
        $data["success"] = ($rs->num_rows() > 0) ? TRUE : FALSE;
        $data["data"] = $rs->result();
        return $data;
    }

    public function listaSocioPorCentral($arreglo) {
        $sql = "select
        conteo.tot,
        socio.socioid,
        socio.centralid,
        central.descripcion as central,
        socio.comiteid,
        comite.codigointerno as codigointerno,
        socio.apepater,
        socio.apemater,
        socio.nombre,
        socio.dni,
        socio.opcionid,
        opcion.descripcion as opcion,
        socio.sectorid,
        sector.descripcion as sector,
        socio.grupoid,
        grupo.descripcion as grupo,
        socio.etapaid,
        etapa.descripcion as etapa,
        socio.barrioid,
        barrio.descripcion as barrio,
        socio.parcelaid,
        parcela.descripcion as parcela,
        socio.asentamientohumanoid,
        asentamientohumano.descripcion as asentamientohumano,
        socio.asociacionid,
        asociacion.descripcion as asociacion,
        socio.cooperativaid,
        cooperativa.descripcion as cooperativa,
        socio.manzanaid,
        manzana.descripcion as manzana,
        socio.loteid,
        lote.descripcion as lote,
        socio.referenciaid,
        referencia.descripcion as referencia,
        socio.observacion,
        case socio.opcionid 
        when 1 then (select case when socio.sectorid  !=8 then (select concat(sector.descripcion,space(2),'GRUPO',space(1),grupo.descripcion,space(2),'Mz.',space(1),manzana.descripcion,space(1),'Lt.',space(1),lote.descripcion)) when socio.sectorid =8 then  (select concat(sector.descripcion,space(2),'PARCELA',space(1),parcela.descripcion,space(2),'Mz.',space(1),manzana.descripcion,space(1),'Lt.',space(1),lote.descripcion))  end)
        when 2 then (select case when socio.etapaid  !=4 then (select concat('ETAPA',space(1),etapa.descripcion,space(2),'Mz.',space(1),manzana.descripcion,space(1),'Lt.',space(1),lote.descripcion,space(2),' - ',space(1),'PACHACAMAC')) when socio.etapaid =4 then  (select concat('ETAPA',space(1),etapa.descripcion,space(2),sector.descripcion,space(2),'BARRIO ',space(1),barrio.descripcion,space(2),'Mz.',space(1),manzana.descripcion,space(1),'Lt.',space(1),lote.descripcion,space(1),' - ',space(1),'PACHACAMAC'))  end)
        when 3 then (select concat('AAHH.',space(1),asentamientohumano.descripcion,space(2),'Mz.',space(1),manzana.descripcion,space(1),'Lt.',space(1),lote.descripcion))
        when 4 then (select case when socio.asociacionid  !=12 then (select concat('ASOC. ',space(1),asociacion.descripcion,space(2),'Mz.',space(1),manzana.descripcion,space(1),'Lt.',space(1),lote.descripcion)) when socio.asociacionid =12 then  (select concat('ASOC. ',space(1),asociacion.descripcion,space(2),'GRUPO',space(1),grupo.descripcion,space(2),'Mz.',space(1),manzana.descripcion,space(1),'Lt.',space(1),lote.descripcion))  end)
        when 5 then (select concat('Coopertiva ',space(1),cooperativa.descripcion,space(2),'Mz.',space(1),manzana.descripcion,space(1),'Lt.',space(1),lote.descripcion))
        end as direccion
        from socio 
        left join central on socio.centralid=central.centralid
        left join comite on socio.comiteid=comite.comiteid
        left join opcion on socio.opcionid=opcion.opcionid
        left join  sector on socio.sectorid=sector.sectorid
        left join grupo on socio.grupoid=grupo.grupoid
        left join etapa on socio.etapaid=etapa.etapaid
        left join barrio on socio.barrioid=barrio.barrioid
        left join parcela on socio.parcelaid=parcela.parcelaid
        left join asentamientohumano on socio.asentamientohumanoid=asentamientohumano.asentamientohumanoid
        left join asociacion on socio.asociacionid=asociacion.asociacionid
        left join cooperativa on socio.cooperativaid=cooperativa.cooperativaid
        left join manzana on socio.manzanaid=manzana.manzanaid
        left join lote on socio.loteid=lote.loteid
        left join referencia on socio.referenciaid=referencia.referenciaid 
        left join (
            select s.comiteid, count(b.beneficiarioid) tot from beneficiario b
            left join socio s on s.socioid=b.socioid  
            where b.estado =1
            group by s.comiteid
        ) conteo on conteo.comiteid=socio.comiteid
        where socio.centralid=? and socio.estado=1";
        $rs = $this->db->query($sql, $arreglo["centralid"]);
        $data["success"] = ($rs->num_rows() > 0) ? TRUE : FALSE;
        $data["data"] = $rs->result();
        return $data;
    }

    public function listaTodos($arreglo) {

        $sql = "select
socio.socioid,
socio.centralid,
central.descripcion as central,
socio.comiteid,
comite.codigointerno as codigointerno,
socio.apepater,
socio.apemater,
socio.nombre,
socio.dni,
socio.opcionid,
opcion.descripcion as opcion,
socio.sectorid,
sector.descripcion as sector,
socio.grupoid,
grupo.descripcion as grupo,
socio.etapaid,
etapa.descripcion as etapa,
socio.barrioid,
barrio.descripcion as barrio,
socio.parcelaid,
parcela.descripcion as parcela,
socio.asentamientohumanoid,
asentamientohumano.descripcion as asentamientohumano,
socio.asociacionid,
asociacion.descripcion as asociacion,
socio.cooperativaid,
cooperativa.descripcion as cooperativa,
socio.manzanaid,
manzana.descripcion as manzana,
socio.loteid,
lote.descripcion as lote,
socio.referenciaid,
referencia.descripcion as referencia,
socio.observacion,
socio.estado
from socio 
left join central on socio.centralid=central.centralid
left join comite on socio.comiteid=comite.comiteid
left join opcion on socio.opcionid=opcion.opcionid
left join  sector on socio.sectorid=sector.sectorid
left join grupo on socio.grupoid=grupo.grupoid
left join etapa on socio.etapaid=etapa.etapaid
left join barrio on socio.barrioid=barrio.barrioid
left join parcela on socio.parcelaid=parcela.parcelaid
left join asentamientohumano on socio.asentamientohumanoid=asentamientohumano.asentamientohumanoid
left join asociacion on socio.asociacionid=asociacion.asociacionid
left join cooperativa on socio.cooperativaid=cooperativa.cooperativaid
left join manzana on socio.manzanaid=manzana.manzanaid
left join lote on socio.loteid=lote.loteid
left join referencia on socio.referenciaid=referencia.referenciaid where socio.estado=1 and socio.apepater like ? or
socio.apemater like ? or socio.nombre like ? or socio.dni like ? or central.descripcion like ? or
comite.codigointerno like ? limit 1000";
        $param[] = '%' . $arreglo["cadena"] . '%';
        $param[] = '%' . $arreglo["cadena"] . '%';
        $param[] = '%' . $arreglo["cadena"] . '%';
        $param[] = '%' . $arreglo["cadena"] . '%';
        $param[] = '%' . $arreglo["cadena"] . '%';
        $param[] = '%' . $arreglo["cadena"] . '%';
        $rs = $this->db->query($sql, $param);
        $data["success"] = ($rs->num_rows() > 0) ? TRUE : FALSE;
        $data["data"] = $rs->result();
        return $data;
    }

    public function registrarSectorGrupo($arreglo) {
        $sql = "insert into socio";
        $sql.="(centralid,comiteid,apepater,apemater,nombre,dni,opcionid,sectorid,grupoid,manzanaid,loteid,referenciaid,observacion,estado)";
        $sql.="values";
        $sql.="(?,?,?,?,?,?,?,?,?,?,?,?,?,1)";
        $rs = $this->db->query($sql, $arreglo);
        $data["success"] = $rs;
        $data["ultimoid"] = $this->db->insert_id();
        return $data;
    }

    public function actualizarSectorGrupo($arreglo) {

        $sql1 = "update socio set ";
        $sql1.=" sectorid=null,
                grupoid=null,
                etapaid=null,
                barrioid=null,
                parcelaid=null,
                asentamientohumanoid=null,
                asociacionid=null,
                cooperativaid=null ";
        $sql1.=" where centralid=? and comiteid=? and socioid=?";
        $arregloclear[] = $arreglo["centralid"];
        $arregloclear[] = $arreglo["comiteid"];
        $arregloclear[] = $arreglo["socioid"];
        $sql2 = "update socio";
        $sql2.=" set 
                apepater=?,
                apemater=?,
                nombre=?,
                dni=?,
                opcionid=?,
                sectorid=?,
                grupoid=?,
                manzanaid=?,
                loteid=?,
                referenciaid=?,
                observacion=?";
        $sql2.=" where centralid=? and comiteid=? and socioid=?";
        $this->db->trans_begin();
        $this->db->query($sql1, $arregloclear);
        $this->db->query($sql2, $arreglo);
        if ($this->db->trans_status() === FALSE) {
            $this->db->trans_rollback();
            $data["success"] = FALSE;
        } else {
            $this->db->trans_commit();
            $data["success"] = TRUE;
        }
        return $data;
    }

    public function registrarSectorParcela($arreglo) {
        $sql = "insert into socio";
        $sql.="(centralid,comiteid,apepater,apemater,nombre,dni,opcionid,sectorid,parcelaid,manzanaid,loteid,referenciaid,observacion,estado)";
        $sql.="values";
        $sql.="(?,?,?,?,?,?,?,?,?,?,?,?,?,1)";
        $rs = $this->db->query($sql, $arreglo);
        $data["success"] = $rs;
        $data["ultimoid"] = $this->db->insert_id();
        return $data;
    }

    public function actualizarSectorParcela($arreglo) {

        $sql1 = "update socio set ";
        $sql1.=" sectorid=null,
                grupoid=null,
                etapaid=null,
                barrioid=null,
                parcelaid=null,
                asentamientohumanoid=null,
                asociacionid=null,
                cooperativaid=null ";
        $sql1.=" where centralid=? and comiteid=? and socioid=?";
        $arregloclear[] = $arreglo["centralid"];
        $arregloclear[] = $arreglo["comiteid"];
        $arregloclear[] = $arreglo["socioid"];
        $sql2 = "update socio set ";
        $sql2.="apepater=?,
                apemater=?,
                nombre=?,
                dni=?,
                opcionid=?,
                sectorid=?,
                parcelaid=?,
                manzanaid=?,
                loteid=?,
                referenciaid=?,
                observacion=? ";
        $sql2.=" where centralid=? and comiteid=? and socioid=? ";
        $this->db->trans_begin();
        $this->db->query($sql1, $arregloclear);
        $this->db->query($sql2, $arreglo);
        if ($this->db->trans_status() === FALSE) {
            $this->db->trans_rollback();
            $data["success"] = FALSE;
        } else {
            $this->db->trans_commit();
            $data["success"] = TRUE;
        }
        return $data;
    }

    public function registrarPachacamacEtapa($arreglo) {
        $sql = "insert into socio";
        $sql.="(centralid,comiteid,apepater,apemater,nombre,dni,opcionid,etapaid,manzanaid,loteid,referenciaid,observacion,estado)";
        $sql.="values";
        $sql.="(?,?,?,?,?,?,?,?,?,?,?,?,1)";
        $rs = $this->db->query($sql, $arreglo);
        $data["success"] = $rs;
        $data["ultimoid"] = $this->db->insert_id();
        return $data;
    }

    public function actualizarPachacamacEtapa($arreglo) {
        $sql1 = "update socio set ";
        $sql1.=" sectorid=null,
                grupoid=null,
                etapaid=null,
                barrioid=null,
                parcelaid=null,
                asentamientohumanoid=null,
                asociacionid=null,
                cooperativaid=null ";
        $sql1.=" where centralid=? and comiteid=? and socioid=?";
        $arregloclear[] = $arreglo["centralid"];
        $arregloclear[] = $arreglo["comiteid"];
        $arregloclear[] = $arreglo["socioid"];
        $sql2 = "update socio set ";
        $sql2.="apepater=?,
                apemater=?,
                nombre=?,
                dni=?,
                opcionid=?,
                etapaid=?,
                manzanaid=?,
                loteid=?,
                referenciaid=?,
                observacion=? ";
        $sql2.="where centralid=? and comiteid=? and socioid=? ";
        $this->db->trans_begin();
        $this->db->query($sql1, $arregloclear);
        $this->db->query($sql2, $arreglo);
        if ($this->db->trans_status() === FALSE) {
            $this->db->trans_rollback();
            $data["success"] = FALSE;
        } else {
            $this->db->trans_commit();
            $data["success"] = TRUE;
        }
        return $data;
    }

    public function registrarPachacamacEtapaSectorBarrio($arreglo) {
        $sql = "insert into socio";
        $sql.="(centralid,comiteid,apepater,apemater,nombre,dni,opcionid,etapaid,sectorid,barrioid,manzanaid,loteid,referenciaid,observacion,estado)";
        $sql.="values";
        $sql.="(?,?,?,?,?,?,?,?,?,?,?,?,?,?,1)";
        $rs = $this->db->query($sql, $arreglo);
        $data["success"] = $rs;
        $data["ultimoid"] = $this->db->insert_id();
        return $data;
    }

    public function actualizarPachacamacEtapaSectorBarrio($arreglo) {
        $sql1 = "update socio set ";
        $sql1.=" sectorid=null,
                grupoid=null,
                etapaid=null,
                barrioid=null,
                parcelaid=null,
                asentamientohumanoid=null,
                asociacionid=null,
                cooperativaid=null ";
        $sql1.=" where centralid=? and comiteid=? and socioid=?";
        $arregloclear[] = $arreglo["centralid"];
        $arregloclear[] = $arreglo["comiteid"];
        $arregloclear[] = $arreglo["socioid"];
        $sql2 = "update socio set ";
        $sql2.="apepater=?,
                apemater=?,
                nombre=?,
                dni=?,
                opcionid=?,
                etapaid=?,
                sectorid=?,
                barrioid=?,
                manzanaid=?,
                loteid=?,
                referenciaid=?,
                observacion=? ";
        $sql2.="where centralid=? and comiteid=? and socioid=?";
        $this->db->trans_begin();
        $this->db->query($sql1, $arregloclear);
        $this->db->query($sql2, $arreglo);
        if ($this->db->trans_status() === FALSE) {
            $this->db->trans_rollback();
            $data["success"] = FALSE;
        } else {
            $this->db->trans_commit();
            $data["success"] = TRUE;
        }
        return $data;
    }

    public function registrarAAHH($arreglo) {

        $sql = "insert into socio";
        $sql.="(centralid,comiteid,apepater,apemater,nombre,dni,opcionid,asentamientohumanoid,manzanaid,loteid,referenciaid,observacion,estado)";
        $sql.="values";
        $sql.="(?,?,?,?,?,?,?,?,?,?,?,?,1)";
        $rs = $this->db->query($sql, $arreglo);
        $data["success"] = $rs;
        $data["ultimoid"] = $this->db->insert_id();
        return $data;
    }

    public function actualizarAAHH($arreglo) {
        $sql1 = "update socio set ";
        $sql1.=" sectorid=null,
                grupoid=null,
                etapaid=null,
                barrioid=null,
                parcelaid=null,
                asentamientohumanoid=null,
                asociacionid=null,
                cooperativaid=null ";
        $sql1.=" where centralid=? and comiteid=? and socioid=?";
        $arregloclear[] = $arreglo["centralid"];
        $arregloclear[] = $arreglo["comiteid"];
        $arregloclear[] = $arreglo["socioid"];
        $sql2 = "update socio set ";
        $sql2.="apepater=?,
                apemater=?,
                nombre=?,
                dni=?,
                opcionid=?,
                asentamientohumanoid=?,
                manzanaid=?,
                loteid=?,
                referenciaid=?,
                observacion=?
                where centralid=? and comiteid=? and socioid=?";
        $this->db->trans_begin();
        $this->db->query($sql1, $arregloclear);
        $this->db->query($sql2, $arreglo);
        if ($this->db->trans_status() === FALSE) {
            $this->db->trans_rollback();
            $data["success"] = FALSE;
        } else {
            $this->db->trans_commit();
            $data["success"] = TRUE;
        }
        return $data;
    }

    public function registrarAsociacion($arreglo) {
        $sql = "insert into socio";
        $sql.="(centralid,comiteid,apepater,apemater,nombre,dni,opcionid,asociacionid,manzanaid,loteid,referenciaid,observacion,estado)";
        $sql.="values";
        $sql.="(?,?,?,?,?,?,?,?,?,?,?,?,1)";
        $rs = $this->db->query($sql, $arreglo);
        $data["success"] = $rs;
        $data["ultimoid"] = $this->db->insert_id();
        return $data;
    }

    public function actualizarAsociacion($arreglo) {
        $sql1 = "update socio set ";
        $sql1.=" sectorid=null,
                grupoid=null,
                etapaid=null,
                barrioid=null,
                parcelaid=null,
                asentamientohumanoid=null,
                asociacionid=null,
                cooperativaid=null ";
        $sql1.=" where centralid=? and comiteid=? and socioid=?";
        $arregloclear[] = $arreglo["centralid"];
        $arregloclear[] = $arreglo["comiteid"];
        $arregloclear[] = $arreglo["socioid"];
        $sql2 = "update socio set ";
        $sql2.="apepater=?,
                apemater=?,
                nombre=?,
                dni=?,
                opcionid=?,
                asociacionid=?,
                manzanaid=?,
                loteid=?,
                referenciaid=?,
                observacion=?
                where centralid=? and comiteid=? and socioid=?";
        $this->db->trans_begin();
        $this->db->query($sql1, $arregloclear);
        $this->db->query($sql2, $arreglo);
        if ($this->db->trans_status() === FALSE) {
            $this->db->trans_rollback();
            $data["success"] = FALSE;
        } else {
            $this->db->trans_commit();
            $data["success"] = TRUE;
        }
        return $data;
    }

    public function registrarAsociacionGrupo($arreglo) {
        $sql = "insert into socio";
        $sql.="(centralid,comiteid,apepater,apemater,nombre,dni,opcionid,asociacionid,grupoid,manzanaid,loteid,referenciaid,observacion,estado)";
        $sql.="values";
        $sql.="(?,?,?,?,?,?,?,?,?,?,?,?,?,1)";
        $rs = $this->db->query($sql, $arreglo);
        $data["success"] = $rs;
        $data["ultimoid"] = $this->db->insert_id();
        return $data;
    }

    public function actualizarAsociacionGrupo($arreglo) {
        $sql1 = "update socio set ";
        $sql1.=" sectorid=null,
                grupoid=null,
                etapaid=null,
                barrioid=null,
                parcelaid=null,
                asentamientohumanoid=null,
                asociacionid=null,
                cooperativaid=null ";
        $sql1.=" where centralid=? and comiteid=? and socioid=?";
        $arregloclear[] = $arreglo["centralid"];
        $arregloclear[] = $arreglo["comiteid"];
        $arregloclear[] = $arreglo["socioid"];
        $sql2 = "update socio set ";
        $sql2.="apepater=?,
                apemater=?,
                nombre=?,
                dni=?,
                opcionid=?,
                asociacionid=?,
                grupoid=?,
                manzanaid=?,
                loteid=?,
                referenciaid=?,
                observacion=?
                where centralid=? and comiteid=? and socioid=?";
        $this->db->trans_begin();
        $this->db->query($sql1, $arregloclear);
        $this->db->query($sql2, $arreglo);
        if ($this->db->trans_status() === FALSE) {
            $this->db->trans_rollback();
            $data["success"] = FALSE;
        } else {
            $this->db->trans_commit();
            $data["success"] = TRUE;
        }
        return $data;
    }

    public function registrarCooperativa($arreglo) {
        $sql = "insert into socio";
        $sql.="(centralid,comiteid,apepater,apemater,nombre,dni,opcionid,cooperativaid,manzanaid,loteid,referenciaid,observacion,estado)";
        $sql.="values";
        $sql.="(?,?,?,?,?,?,?,?,?,?,?,?,1)";
        $rs = $this->db->query($sql, $arreglo);
        $data["success"] = $rs;
        $data["ultimoid"] = $this->db->insert_id();
        return $data;
    }

    public function actualizarCooperativa($arreglo) {
        $sql1 = "update socio set ";
        $sql1.=" sectorid=null,
                grupoid=null,
                etapaid=null,
                barrioid=null,
                parcelaid=null,
                asentamientohumanoid=null,
                asociacionid=null,
                cooperativaid=null ";
        $sql1.=" where centralid=? and comiteid=? and socioid=?";
        $arregloclear[] = $arreglo["centralid"];
        $arregloclear[] = $arreglo["comiteid"];
        $arregloclear[] = $arreglo["socioid"];
        $sql2 = "update socio set ";
        $sql2.="apepater=?,
                apemater=?,
                nombre=?,
                dni=?,
                opcionid=?,
                cooperativaid=?,
                manzanaid=?,
                loteid=?,
                referenciaid=?,
                observacion=?
                where centralid=? and comiteid=? and socioid=?";
        $this->db->trans_begin();
        $this->db->query($sql1, $arregloclear);
        $this->db->query($sql2, $arreglo);
        if ($this->db->trans_status() === FALSE) {
            $this->db->trans_rollback();
            $data["success"] = FALSE;
        } else {
            $this->db->trans_commit();
            $data["success"] = TRUE;
        }
        return $data;
    }

    public function registrarOtros($arreglo) {
        $sql = "insert into socio";
        $sql.="(centralid,comiteid,apepater,apemater,nombre,dni,opcionid,referenciaid,observacion,estado)";
        $sql.="values";
        $sql.="(?,?,?,?,?,?,?,?,?,1)";
        $rs = $this->db->query($sql, $arreglo);
        $data["success"] = $rs;
        $data["ultimoid"] = $this->db->insert_id();
        return $data;
    }

    public function actualizarOtros($arreglo) {
        $sql1 = "update socio set ";
        $sql1.=" sectorid=null,
                grupoid=null,
                etapaid=null,
                barrioid=null,
                parcelaid=null,
                asentamientohumanoid=null,
                asociacionid=null,
                cooperativaid=null ";
        $sql1.=" where centralid=? and comiteid=? and socioid=?";
        $arregloclear[] = $arreglo["centralid"];
        $arregloclear[] = $arreglo["comiteid"];
        $arregloclear[] = $arreglo["socioid"];
        $sql2 = "update socio set ";
        $sql2.="apepater=?,
                apemater=?,
                nombre=?,
                dni=?,
                opcionid=?,
                referenciaid=?,
                observacion=?
                where centralid=? and comiteid=? and socioid=?";
        $this->db->trans_begin();
        $this->db->query($sql1, $arregloclear);
        $this->db->query($sql2, $arreglo);
        if ($this->db->trans_status() === FALSE) {
            $this->db->trans_rollback();
            $data["success"] = FALSE;
        } else {
            $this->db->trans_commit();
            $data["success"] = TRUE;
        }
        return $data;
    }

    public function eliminar($arreglo) {

        $sql = "select count(*) as cantidad from beneficiario where socioid=? and estado = 1";
        $rs = $this->db->query($sql, $arreglo);
        if ($rs->row("cantidad") > 0) {
            $data["error"] = "CONSTRAINT";
            $data["success"] = FALSE;
        } else {
            unset($sql, $rs);
            $sql = "update socio set estado = 0 where socioid=?";
            $rs = $this->db->query($sql, $arreglo);
            $data["success"] = $rs;
            $data["error"] = "";
        }
        return $data;
    }
    public function buscarSocio($data) {

        $sql = "call sp_socio_buscar_dni(?)";
        $rs = $this->db->query($sql, $data);
        $data["success"] = ($rs->num_rows() > 0) ? TRUE : FALSE;
        $data["data"] = $rs->result();
        return $data;
    }
    public function activar($data) {
        $sql = "call sp_socio_activar(?)";
        $rs = $this->db->query($sql, $data);
        $data["success"] = ($rs->num_rows() > 0) ? TRUE : FALSE;
        $data["data"] = $rs->result();
        return $data;
    }


}
