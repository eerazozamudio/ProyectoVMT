<?php
class Grupo extends CI_Controller{
    
    public function __construct() {
        parent::__construct();
        $this->load->model("Grupo_model","grupo");
    }
    function lista(){
        $rs=  $this->grupo->lista();
        echo json_encode($rs);
    }
    
    public function listaPorAsociacion(){
        $rs=  $this->grupo->listaPorAsociacion();
        echo json_encode($rs);
    }
}

