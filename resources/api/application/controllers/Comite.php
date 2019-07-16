<?php

class Comite extends CI_Controller {

    public function __construct() {
        parent::__construct();
        $this->load->model("Comite_model", "comite");
    }

    public function grabar() {

        $info = $this->input->post("data");
        $data = json_decode($info);
        $arreglo["comiteid"] = $data->comiteid;
        $arreglo["centralid"] = $data->centralid;
        $arreglo["codigointerno"] = $data->codigointerno;
        $arreglo["direccion"] = $data->direccion;
        $arreglo["idsuper"] = $data->idsuper;
        $arreglo["idcoor"] = $data->idcoor;
        $arreglo["primeraprioridad"] = $data->primeraprioridad;
        $arreglo["segundaprioridad"] = $data->segundaprioridad;
        $arreglo["puntococina"] = $data->puntococina;
        $arreglo["lugar"] = $data->lugar;
        $rs = $this->comite->grabar($arreglo);
        echo json_encode($rs);
    }
    public function eliminar(){
        $arreglo["comiteid"] = $this->input->post('comiteid',0);
        $rs = $this->comite->eliminar($arreglo);
        echo json_encode($rs);
    }
    public function listaPorCentral() {
        $info = $this->input->get("data");
        $data = json_decode($info);
        $arreglo["centralid"] = $data->centralid;
        $arreglo["cadena"] = $data->cadena;
        $rs = $this->comite->listaPorCentral($arreglo);
        echo json_encode($rs);
    }

    public function listaPorCentralId() {

        $info = $this->input->get("data");
        $data = json_decode($info);
        $arreglo["centralid"] = $data->centralid;
        $rs = $this->comite->listaPorCentralId($arreglo);
        echo json_encode($rs);
    }

    public function lista() {
        $rs = $this->comite->lista();
        echo json_encode($rs);
    }

}
