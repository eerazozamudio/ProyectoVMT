<?php
class Opcion extends CI_Controller{
    
    public function __construct() {
        parent::__construct();
        $this->load->model("Opcion_model","opcion");
    }
    public function lista(){
        
        $rs=  $this->opcion->lista();
        echo json_encode($rs);
        
    }
    
}

