<?php
class Barrio extends CI_Controller{
    
    public function __construct() {
        parent::__construct();
        $this->load->model("Barrio_model","barrio");
    }
    function lista(){
        $rs=  $this->barrio->lista();
        echo json_encode($rs);
    }
    public function listaSectorEtapa(){
        $info=  $this->input->get("data");
        $data=  json_decode($info);
        $arreglo["opcion"]=$data->opcion;
        $rs=  $this->barrio->listaSectorEtapa($arreglo);
        echo json_encode($rs);
    }
}

