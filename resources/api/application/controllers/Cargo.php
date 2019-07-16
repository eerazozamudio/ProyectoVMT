<?php
class Cargo extends CI_Controller {

    public function __construct() {
        parent::__construct();
        $this->load->model("Cargo_model", "cargo");
    }

     public function lista(){
        $rs = $this->cargo->lista();
        echo json_encode($rs);
    }

}
