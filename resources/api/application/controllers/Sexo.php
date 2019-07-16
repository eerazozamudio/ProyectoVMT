<?php
class Sexo extends CI_Controller{
    
    public function __construct() {
        parent::__construct();
        $this->load->model("Sexo_model","sexo");
    }
    function lista(){
        $rs=  $this->sexo->lista();
        echo json_encode($rs);
    }
     
}

