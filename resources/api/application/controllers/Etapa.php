<?php
class Etapa extends CI_Controller {

    public function __construct() {
        parent::__construct();
        $this->load->model("Etapa_model", "etapa");
    }

     public function lista(){
        $rs = $this->etapa->lista();
        echo json_encode($rs);
    }

}
