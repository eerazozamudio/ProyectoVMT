<?php
class Condicionbeneficiario extends CI_Controller{
    
   public function __construct(){
       parent::__construct();
       $this->load->model("Condicionbeneficiario_model","condicionbeneficiario");
   }
   
   public function lista(){
       
       $rs=$this->condicionbeneficiario->lista();
       echo json_encode($rs);
   }
    
}

