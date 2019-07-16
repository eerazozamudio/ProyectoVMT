<?php
class Sector extends CI_Controller{
    
    public function __construct() {
        parent::__construct();
        $this->load->model("Sector_model","sector");
    }
    
    function lista(){
        $rs=  $this->sector->lista();
        echo json_encode($rs);
    }
    
    function listaCuartaEtapa(){
        $rs=  $this->sector->listaCuartaEtapa();
        echo json_encode($rs);
    }
    
    
    
}
 


