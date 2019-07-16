<?php
class Manzana extends CI_Controller{
    
    public function __construct() {
        parent::__construct();
        $this->load->model("Manzana_model","manzana");
    }
    
    public function lista(){
        $rs=  $this->manzana->lista();
        echo json_encode($rs);
    }
}

