<?php

class Barrio_model extends CI_Model {

    public function __construct() {
        parent::__construct();
    }

    function lista() {

        $sql = "select barrioid,descripcion from barrio";
        $rs = $this->db->query($sql);
        $data["success"] = ($rs->num_rows() > 0) ? TRUE : FALSE;
        $data["data"] = $rs->result();
        return $data;
    }

    public function listaSectorEtapa($arreglo) {

        if ($arreglo["opcion"] == 1) {
            $sql = "select barrioid,descripcion from barrio where barrioid in(1,2)";
        } else if ($arreglo["opcion"] == 2) {
            $sql = "select barrioid,descripcion from barrio where barrioid in(1,2,3,4)";
        } else if ($arreglo["opcion"] == 0) {
            $data["success"] = FALSE;
            $data["data"] = NULL;
            return $data;
        }
        $rs = $this->db->query($sql);
        $data["success"] = ($rs->num_rows() > 0) ? TRUE : FALSE;
        $data["data"] = $rs->result();
        return $data;
    }

}
