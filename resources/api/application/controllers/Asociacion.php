<?php
class Asociacion extends CI_Controller {

    public function __construct() {
        parent::__construct();
        $this->load->model("Asociacion_model", "asociacion");
    }

     public function lista(){
        $rs = $this->asociacion->lista();
        echo json_encode($rs);
    }

}
