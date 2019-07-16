<?php
class Supervisor extends CI_Controller {

    public function __construct() {
        parent::__construct();
        $this->load->model("Supervisor_model", "supervisor");
    }

     public function lista(){
        $rs = $this->supervisor->lista();
        echo json_encode($rs);
    }
    
    public function listaCombo(){
        
        $rs = $this->supervisor->listaCombo();
        echo json_encode($rs);
    }
    
     public function grabar() {
         
        $info = $this->input->post("data");
        $data = json_decode($info);
        $arreglo["idsuper"] = $data->idsuper;
        $arreglo["apellidos"] = aplica_utf8($data->apellidos);
        $arreglo["nombres"]=  aplica_utf8($data->nombres);
        $arreglo["telefono"]=$data->telefono;
        $rs = $this->supervisor->grabar($arreglo);
        echo json_encode($rs);
    }
    
    public function eliminar() {
        $info = $this->input->post("data");
        $data = json_decode($info);
        $arreglo["idsuper"] = $data->idsuper;
        $rs = $this->supervisor->eliminar($arreglo);
        echo json_encode($rs);
    }

}
