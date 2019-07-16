<?php
class Parcela extends CI_Controller {

    public function __construct() {
        parent::__construct();
        $this->load->model("Parcela_model", "parcela");
    }

     public function lista(){
        $rs = $this->parcela->lista();
        echo json_encode($rs);
    }

}
