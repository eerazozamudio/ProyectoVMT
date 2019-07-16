<?php
class Coordinador extends CI_Controller {

    public function __construct() {
        parent::__construct();
        $this->load->model("Coordinador_model", "coordinador");
    }

     public function lista(){
         
        $rs = $this->coordinador->lista();
        echo json_encode($rs);
    }
    
    public function listaCombo(){
        
        $rs=  $this->coordinador->listaCombo();
        echo json_encode($rs);
        
    }
    
     public function grabar() {
         
        $info = $this->input->post("data");
        $data = json_decode($info);
        $arreglo["idcoor"] = $data->idcoor;
        $arreglo["apellidos"] = aplica_utf8($data->apellidos);
        $arreglo["nombres"]=  aplica_utf8($data->nombres);
        $arreglo["telefono"]=$data->telefono;
        $arreglo["idcargo"]=  $data->idcargo;
        $arreglo["dni"]=  $data->dni;
        $arreglo["direccion"]=  aplica_utf8($data->direccion);
        $rs = $this->coordinador->grabar($arreglo);
        echo json_encode($rs);
    }
    
    public function eliminar() {
        $info = $this->input->post("data");
        $data = json_decode($info);
        $arreglo["idcoor"] = $data->idcoor;
        $rs = $this->coordinador->eliminar($arreglo);
        echo json_encode($rs);
    }

}
