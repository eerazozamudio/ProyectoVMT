<?php
class Lote extends CI_Controller{
    
    public function __construct() {
        parent::__construct();
        $this->load->model("Lote_model","lote");
    }
    public function lista(){
        $rs=  $this->lote->lista();
        echo json_encode($rs);
    }
}
