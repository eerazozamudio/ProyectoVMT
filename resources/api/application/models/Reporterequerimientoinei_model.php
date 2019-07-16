<?php

class Reporterequerimientoinei_model extends CI_Model {

    public function __construct() {
        parent::__construct();
    }

    public function requerimientoInei($arreglo) {
        $array[] = $arreglo["centralid"];
        $sql = "call sp_requerimiento_inei(?)";
        $rs = $this->db->query($sql, $array);
        $data["success"] = ($rs->num_rows() > 0) ? TRUE : FALSE;
        $data["data"] = $rs->result();
        return $data;
    }

}