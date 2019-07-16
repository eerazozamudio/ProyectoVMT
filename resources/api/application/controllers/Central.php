<?php
class Central extends CI_Controller{
    
    public function __construct() {
        parent::__construct();
        $this->load->model("Central_model","central");
        
    }
    function lista(){
        $rs=  $this->central->lista();
        echo json_encode($rs);
    }
    function actulizarcoordinadora()
    {
        $data = array(
            $this->input->post('idcor'),
            $this->input->post('idcentral')
        );
        $rs=  $this->central->centralActualizarCoordinador($data);
        echo json_encode($rs);
    }

}

