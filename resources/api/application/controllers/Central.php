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
    function eliminarcentral()
    {
        $data = array(
            $this->input->post('idcentral')
        );
        $rs=  $this->central->centralEliminar($data);
        echo json_encode($rs);
    }
    function usuariovalidar(){
        $data = array(
            $this->input->post('usuario'),
            $this->input->post('clave'),
        );
        $rs=  $this->central->validar($data);
    
        echo json_encode($rs);
    }
    

}

