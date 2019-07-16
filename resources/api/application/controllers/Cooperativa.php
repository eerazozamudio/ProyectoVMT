<?php
class Cooperativa extends CI_Controller{
    
    public function __construct() {
        parent::__construct();
        $this->load->model("Cooperativa_model","cooperativa");
                
    }
    
    public function lista(){
        $rs=  $this->cooperativa->lista();
        echo json_encode($rs);
        
    }
}
