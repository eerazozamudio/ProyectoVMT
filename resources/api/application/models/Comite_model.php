<?php

class Comite_model extends CI_Model {

    public function __construct() {
        parent::__construct();
    }

    public function listaPorCentral($arreglo) {
        //$sql = "select comiteid,codigointerno,centralid,direccion,idsuper,idcoor,primeraprioridad,segundaprioridad,puntococina,lugar from comite where estado=1 and codigointerno like ? and  centralid=?  order by codigointerno";
        $sql="select co.comiteid,co.codigointerno,co.centralid,co.direccion,c.idcoorcentral idsuper,co.idcoor,
        CONCAT(cod.nombres,' ',cod.apellidos) coordinadorcomite
        ,co.primeraprioridad,co.segundaprioridad,co.puntococina,co.lugar 
        from comite co
        left join central c on c.centralid = co.centralid
        LEFT JOIN coordinador cod on cod.idcoor = co.idcoor
        where co.estado=1 and co.codigointerno like ? and  co.centralid=?  order by co.codigointerno";
        $param["codigointerno"] = '%' . $arreglo["cadena"] . '%';
        $param["centralid"] = $arreglo["centralid"];
        $rs = $this->db->query($sql, $param);
        $flag = ($rs->num_rows() > 0) ? TRUE : FALSE;
        $data["success"] = $flag;
        $data["data"] = $rs->result();
        return $data;
    }

    public function lista() {
        $sql = "select co.comiteid,co.codigointerno,co.direccion,co.centralid,ce.descripcion as central,co.idsuper,co.idcoor,co.primeraprioridad,co.segundaprioridad,co.puntococina,co.lugar  from comite co left join central ce on co.centralid=ce.centralid and co.estado=1 limit 500";
        $rs = $this->db->query($sql);
        $flag = ($rs->num_rows() > 0) ? TRUE : FALSE;
        $data["success"] = $flag;
        $data["data"] = $rs->result();
        return $data;
    }

    public function listaPorCentralId($arreglo) {
        $array[] = $arreglo["centralid"];
        $sql = "select comiteid,centralid,codigointerno,direccion,idsuper,idcoor,primeraprioridad,segundaprioridad,puntococina,lugar  from comite where centralid=? and estado=1 order by codigointerno";
        $rs = $this->db->query($sql, $array);
        $flag = ($rs->num_rows() > 0) ? TRUE : FALSE;
        $data["success"] = $flag;
        $data["data"] = $rs->result();
        return $data;
    }

    public function grabar($arreglo) {

        if ($arreglo["comiteid"] == 0) {

            $array[] = $arreglo["centralid"];
            $array[] = $arreglo["codigointerno"];
            $array[] = $arreglo["direccion"];
            $array[] = $arreglo["idsuper"];
            $array[] = $arreglo["idcoor"];
            $array[] = $arreglo["primeraprioridad"];
            $array[] = $arreglo["segundaprioridad"];
            $array[] = $arreglo["puntococina"];
            $array[] = $arreglo["lugar"];
            $sql = "call sp_comite_insertar(?,?,?,?,?,?,?,?,?)";
            $rs = $this->db->query($sql, $array);
            $data["success"] = TRUE;
            return $data;
        } else {
            $array[] = $arreglo["comiteid"];
            $array[] = $arreglo["centralid"];
            $array[] = $arreglo["codigointerno"];
            $array[] = $arreglo["direccion"];
            $array[] = $arreglo["idsuper"];
            $array[] = $arreglo["idcoor"];
            $array[] = $arreglo["primeraprioridad"];
            $array[] = $arreglo["segundaprioridad"];
            $array[] = $arreglo["puntococina"];
            $array[] = $arreglo["lugar"];

            //$sql = "update comite  set centralid=?,codigointerno=?,direccion=?,idsuper=?,idcoor=?,primeraprioridad=?, segundaprioridad=?,puntococina=?,lugar=? where comiteid=?";
            $sql  ="call sp_comite_actualizar(?,?,?,?,?,?,?,?,?,?)";
            $rs = $this->db->query($sql, $array);
            $data["success"] = TRUE;
            return $data;
        }
    }

    public function eliminar($arreglo)
    {
            $sql = "call sp_comite_eliminar(?)";
            $rs = $this->db->query($sql, $arreglo);
            $data["success"] = TRUE;
            return $data;

    }

}
