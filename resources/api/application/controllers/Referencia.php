<?php
class Referencia extends CI_Controller{
    
    public function __construct() {
        parent::__construct();
        $this->load->model("Referencia_model","referencia");
        
    }
    
    public function lista(){
        
        $rs=  $this->referencia->lista();
        echo json_encode($rs);
        
    }
}
