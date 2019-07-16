<?php

class Beneficiario_model extends CI_Model {

    public function __construct() {
        parent::__construct();
    }

    public function cantidadPorComite($arreglo) {

        $array[] = $arreglo["edad"];
        $array[] = $arreglo["comiteid"];

        $sql = "select count(*) cantidad from beneficiario bene inner join socio soc on bene.socioid=soc.socioid 
           inner join comite comi on comi.comiteid=soc.comiteid where timestampdiff(year,bene.fechanaci,curdate())=? and comi.comiteid=? and bene.estado=1";

        $rs = $this->db->query($sql, $array);
        $data["cantidad"] = $rs->row("cantidad");
        return $data;
    }

    public function cantidadAdultoMayorPorComite($arreglo) {

        $array[] = $arreglo["edad"];
        $array[] = $arreglo["comiteid"];
        $array[] = $arreglo["sexoid"];

        $sql = "select count(*) cantidad from beneficiario bene inner join socio soc on bene.socioid=soc.socioid 
           inner join comite comi on comi.comiteid=soc.comiteid where timestampdiff(year,bene.fechanaci,curdate())>? and comi.comiteid=? and bene.sexoid=? and bene.estado=1";

        $rs = $this->db->query($sql, $array);
        $data["cantidad"] = $rs->row("cantidad");
        return $data;
    }

    public function existeDni($arreglo) {
        $array[0] = $arreglo["dni"];
        $sql = "select * from beneficiario where dni=? and estado=1";
        $rs = $this->db->query($sql, $array);
        $data["success"] = ($rs->num_rows() > 0) ? TRUE : FALSE;
        return $data;
    }

    public function cantidad() {

        $sql = "select count(*) as cantidad from beneficiario where estado=1";
        $rs = $this->db->query($sql);
        $data["cantidad"] = $rs->row("cantidad");
        return $data;
    }

    public function existeDniActualizar($arreglo) {
        $array[0] = $arreglo["dni"];
        $array[1] = $arreglo["beneficiarioid"];
        $sql = "select * from beneficiario where dni=? and beneficiarioid!=? and estado=1";
        $rs = $this->db->query($sql, $array);
        $data["success"] = ($rs->num_rows() > 0) ? TRUE : FALSE;
        return $data;
    }

    public function listaPorSocio($socioid) {
        $sql = "select b.beneficiarioid,
                b.socioid,
                b.apepater,
                b.apemater,
                b.nombre,
                b.dni,
                date_format(b.fechanaci,'%d/%m/%Y') as fechanaci,
                TIMESTAMPDIFF(YEAR,b.fechanaci,CURDATE()) as edad,
                b.observacion,
                b.sexoid,
                s.descripcion as sexo,
                b.discapacidad,
                b.sisof,
                b.idconbene,
                cb.descripcion as condicionbeneficiario
                from beneficiario b left join sexo s on b.sexoid=s.sexoid
                left join condicionbeneficiario cb on cb.idconbene=b.idconbene
                where b.estado=1 and b.socioid=?";
        $arreglo[] = $socioid;
        $rs = $this->db->query($sql, $arreglo);
        $data["success"] = ($rs->num_rows() > 0) ? TRUE : FALSE;
        $data["data"] = $rs->result();
        return $data;
    }

    public function listaTodos($arreglo) {

        $sql = "select
bene.beneficiarioid,
bene.socioid,
concat(soc.apepater,space(1),soc.apemater,space(1),soc.nombre) as socio,
soc.dni as dnisocio,
bene.apepater,
bene.apemater,
bene.nombre,
bene.dni,
date_format(bene.fechanaci,'%d/%m/%Y') as fechanaci,
bene.sexoid,
sex.descripcion as sexo,
bene.observacion,
soc.comiteid,
comi.codigointerno as comite,
soc.centralid,
cent.descripcion as central,
bene.discapacidad,
bene.sisof,
bene.idconbene,
cb.descripcion as condicionbeneficiario,
bene.estado
from beneficiario bene left join sexo sex on bene.sexoid=sex.sexoid 
left join  socio soc on bene.socioid=soc.socioid left join
comite comi on soc.comiteid=comi.comiteid left join 
central cent on soc.centralid=cent.centralid
left join condicionbeneficiario cb on cb.idconbene=bene.idconbene
where bene.apepater like ? or
bene.apemater like ?  or bene.nombre like ? or bene.dni like ? or concat(soc.apepater,space(1),soc.apemater,space(1),soc.nombre) like ?
or soc.dni like ? and bene.estado=1 limit 1000";
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

    public function sumaBeneficiariosPorComite($arreglo) {
        $sql = "select (select count(*) from beneficiario where socioid=socio.socioid and estado=1) as suma  from socio where comiteid=? ";
        $rs = $this->db->query($sql, $arreglo);
        $suma = 0;
        foreach ($rs->result() as $value) {
            if($value->suma > 0)
                $suma+=$value->suma;
        }
        $data["success"] = ($rs->num_rows() > 0) ? TRUE : FALSE;
        $data["data"] = array("suma" => $suma);
        return $data;
    }

    public function registrar($arreglo) {
        $sql = "insert into beneficiario
                (socioid,apepater,apemater,nombre,dni,fechanaci,sexoid,observacion,discapacidad,sisof,idconbene)
                values
                (?,?,?,?,?,?,?,?,?,?,?)";
        $rs = $this->db->query($sql, $arreglo);
        $data["success"] = $rs;
        $data["ultimoid"] = $this->db->insert_id();
        return $data;
    }
    public function activarbeneficiario($arreglo) {
        $sql = "call sp_beneficiario_activar(?)";
        $rs = $this->db->query($sql, $arreglo);
        $data["success"] = ($rs->num_rows() > 0) ? TRUE : FALSE;
        $data["data"] = $rs->result();
        return $data;
    }
    
    public function actualizar($arreglo) {
        $sql = "update beneficiario
                set
                apepater=?,
                apemater=?,
                nombre=?,
                dni=?,
                fechanaci=?,
                sexoid=?,
                observacion=?,
                discapacidad=?,
                sisof=?,
                idconbene=?
                where socioid=? and beneficiarioid=?";
        $rs = $this->db->query($sql, $arreglo);
        $data["success"] = $rs;
        return $data;
    }

    public function eliminar($arreglo) {
        $sql = "update beneficiario set estado = 0 where beneficiarioid=?";
        $rs = $this->db->query($sql, $arreglo);
        $data["success"] = $rs;
        return $data;
    }

    public function cantidadPorComiteTbc($arreglo) {
        $array[] = $arreglo["comiteid"];

        $sql = "select count(*) cantidad from beneficiario bene inner join socio soc on bene.socioid=soc.socioid 
           inner join comite comi on comi.comiteid=soc.comiteid where comi.comiteid=?  and bene.idconbene =3 and bene.estado=1";

        $rs = $this->db->query($sql, $array);
        $data["cantidad"] = $rs->row("cantidad");
        return $data;
    }
    public function cantidadPorComiteDiscacitado($arreglo) {
        $array[] = $arreglo["comiteid"];

        $sql = "select count(*) cantidad from beneficiario bene inner join socio soc on bene.socioid=soc.socioid 
           inner join comite comi on comi.comiteid=soc.comiteid where comi.comiteid=?  and bene.idconbene =5 and bene.estado=1";

        $rs = $this->db->query($sql, $array);
        $data["cantidad"] = $rs->row("cantidad");
        return $data;
    }
    public function centrosDeSalud() {
        $sql = "SELECT * FROM centromedico";
        $rs = $this->db->query($sql);
        $data["success"] = ($rs->num_rows() > 0) ? TRUE : FALSE;
        $data["data"] = $rs->result();
        return $data;
    }
    public function modificarSocio($arreglo) {
        $sql = "call sp_beneficiario_cambiar_socio(?,?)";
        $rs = $this->db->query($sql, $arreglo);
        $data["success"] = $rs;
        return $data;
    }

    

}
