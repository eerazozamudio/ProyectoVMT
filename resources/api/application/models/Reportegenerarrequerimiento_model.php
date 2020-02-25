<?php

class Reportegenerarrequerimiento_model extends CI_Model {

    public function __construct() {
        parent::__construct();
    }

    public function generarRequerimiento($arreglo) {
        $array[] = $arreglo["centralid"];
       
        $sql = "call sp_requerimiento_semanal(?)";
        $rs = $this->db->query($sql, $array);
        $data["success"] = ($rs->num_rows() > 0) ? TRUE : FALSE;
        $data["data"] = $rs->result();
        return $data;
    }

}
