<?php
class Asentamientohumano extends CI_Controller{
    
    public function __construct() {
        parent::__construct();
        $this->load->model("Asentamientohumano_model","asentamientohumano");
                
    }
    
    public function lista(){
        $rs=  $this->asentamientohumano->lista();
        echo json_encode($rs);
        
    }
}
