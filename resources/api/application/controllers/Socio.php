<?php

class Socio extends CI_Controller {

    public function __construct() {
        parent::__construct();
        $this->load->model("Socio_model", "socio");
    }
    
    public function trasladar(){
        
        $info=$this->input->post("data");
        $data=json_decode($info);
        $arreglo["centralid"] = $data->centralid;
        $arreglo["comiteid"] = $data->comiteid;
        $arreglo["cadena"] = $data->cadena;
        $rs = $this->socio->trasladar($arreglo);
        echo json_encode($rs);
        
        
        
    }

    public function existeDni(){

        $info=$this->input->post("data");
        $data=json_decode($info);
        $arreglo["dni"]=$data->dni;
        $rs=$this->socio->existeDni($arreglo);
        echo json_encode($rs);
    }

    public function existeDniActualizar(){

        $info=$this->input->post("data");
        $data=json_decode($info);
        $arreglo["dni"]=$data->dni;
        $arreglo["socioid"]=$data->socioid;
        $rs=$this->socio->existeDniActualizar($arreglo);
        echo json_encode($rs);

    }

    public function lista() {

        $info = $this->input->get("data");
        $data = json_decode($info);
        $arreglo["centralid"] = $data->centralid;
        $arreglo["comiteid"] = $data->comiteid;
        $arreglo["cadena"] = $data->cadena;
        $rs = $this->socio->lista($arreglo);
        echo json_encode($rs);
    }
    
    public function listaTodos()
    {
        $info=  $this->input->get("data");
        $data=  json_decode($info);
        $arreglo["cadena"]=$data->cadena;
       $rs=  $this->socio->listaTodos($arreglo);
       echo json_encode($rs);
    }

    public function listarBusqueda()
    {
       $data= array( $this->input->get("nombre"));
       $rs=  $this->socio->buscarSocio($data);
       echo json_encode($rs);
    }
    public function registrarSectorGrupo() {
        $info = $this->input->post("data");
        $data = json_decode($info);

        $arreglo["centralid"] = $data->centralid;
        $arreglo["comiteid"] = $data->comiteid;
        $arreglo["apepater"] = strtoupper(utf8_encode($data->apepater));
        $arreglo["apemater"] = strtoupper(utf8_encode($data->apemater));
        $arreglo["nombre"] = strtoupper(utf8_encode($data->nombre));
        $arreglo["dni"] = $data->dni;
        $arreglo["opcionid"] = $data->opcionid;
        $arreglo["sectorid"] = $data->sectorid;
        $arreglo["grupoid"] = $data->grupoid;
        $arreglo["manzanaid"] = $data->manzanaid;
        $arreglo["loteid"] = $data->loteid;
        $arreglo["referenciaid"] = $data->referenciaid;
        $arreglo["observacion"] = strtoupper(utf8_encode($data->observacion));
        $rs = $this->socio->registrarSectorGrupo($arreglo);
        echo json_encode($rs);
    }

    public function actualizarSectorGrupo() {
        $info = $this->input->post("data");
        $data = json_decode($info);

        $arreglo["apepater"] = strtoupper(utf8_encode($data->apepater));
        $arreglo["apemater"] = strtoupper(utf8_encode($data->apemater));
        $arreglo["nombre"] = strtoupper(utf8_encode($data->nombre));
        $arreglo["dni"] = $data->dni;
        $arreglo["opcionid"] = $data->opcionid;
        $arreglo["sectorid"] = $data->sectorid;
        $arreglo["grupoid"] = $data->grupoid;
        $arreglo["manzanaid"] = $data->manzanaid;
        $arreglo["loteid"] = $data->loteid;
        $arreglo["referenciaid"] = $data->referenciaid;
        $arreglo["observacion"] = strtoupper(utf8_encode($data->observacion));
        $arreglo["centralid"] = $data->centralid;
        $arreglo["comiteid"] = $data->comiteid;
        $arreglo["socioid"] = $data->socioid;
        $rs = $this->socio->actualizarSectorGrupo($arreglo);
        echo json_encode($rs);
    }

    public function registrarSectorParcela() {
        $info = $this->input->post("data");
        $data = json_decode($info);

        $arreglo["centralid"] = $data->centralid;
        $arreglo["comiteid"] = $data->comiteid;
        $arreglo["apepater"] = strtoupper(utf8_encode($data->apepater));
        $arreglo["apemater"] = strtoupper(utf8_encode($data->apemater));
        $arreglo["nombre"] = strtoupper(utf8_encode($data->nombre));
        $arreglo["dni"] = $data->dni;
        $arreglo["opcionid"] = $data->opcionid;
        $arreglo["sectorid"] = $data->sectorid;
        $arreglo["parcelaid"] = $data->parcelaid;
        $arreglo["manzanaid"] = $data->manzanaid;
        $arreglo["loteid"] = $data->loteid;
        $arreglo["referenciaid"] = $data->referenciaid;
        $arreglo["observacion"] = strtoupper(utf8_encode($data->observacion));
        $rs = $this->socio->registrarSectorParcela($arreglo);
        echo json_encode($rs);
    }

    public function actualizarSectorParcela() {
        $info = $this->input->post("data");
        $data = json_decode($info);

        $arreglo["apepater"] = strtoupper(utf8_encode($data->apepater));
        $arreglo["apemater"] = strtoupper(utf8_encode($data->apemater));
        $arreglo["nombre"] = strtoupper(utf8_encode($data->nombre));
        $arreglo["dni"] = $data->dni;
        $arreglo["opcionid"] = $data->opcionid;
        $arreglo["sectorid"] = $data->sectorid;
        $arreglo["parcelaid"] = $data->parcelaid;
        $arreglo["manzanaid"] = $data->manzanaid;
        $arreglo["loteid"] = $data->loteid;
        $arreglo["referenciaid"] = $data->referenciaid;
        $arreglo["observacion"] = strtoupper(utf8_encode($data->observacion));
        $arreglo["centralid"] = $data->centralid;
        $arreglo["comiteid"] = $data->comiteid;
        $arreglo["socioid"] = $data->socioid;
        $rs = $this->socio->actualizarSectorParcela($arreglo);
        echo json_encode($rs);
    }

    public function registrarPachacamacEtapa() {
        $info = $this->input->post("data");
        $data = json_decode($info);

        $arreglo["centralid"] = $data->centralid;
        $arreglo["comiteid"] = $data->comiteid;
        $arreglo["apepater"] = strtoupper(utf8_encode($data->apepater));
        $arreglo["apemater"] = strtoupper(utf8_encode($data->apemater));
        $arreglo["nombre"] = strtoupper(utf8_encode($data->nombre));
        $arreglo["dni"] = $data->dni;
        $arreglo["opcionid"] = $data->opcionid;
        $arreglo["etapaid"] = $data->etapaid;
        $arreglo["manzanaid"] = $data->manzanaid;
        $arreglo["loteid"] = $data->loteid;
        $arreglo["referenciaid"] = $data->referenciaid;
        $arreglo["observacion"] = strtoupper(utf8_encode($data->observacion));
        $rs = $this->socio->registrarPachacamacEtapa($arreglo);
        echo json_encode($rs);
    }

    public function actualizarPachacamacEtapa() {
        $info = $this->input->post("data");
        $data = json_decode($info);

        $arreglo["apepater"] = strtoupper(utf8_encode($data->apepater));
        $arreglo["apemater"] = strtoupper(utf8_encode($data->apemater));
        $arreglo["nombre"] = strtoupper(utf8_encode($data->nombre));
        $arreglo["dni"] = $data->dni;
        $arreglo["opcionid"] = $data->opcionid;
        $arreglo["etapaid"] = $data->etapaid;
        $arreglo["manzanaid"] = $data->manzanaid;
        $arreglo["loteid"] = $data->loteid;
        $arreglo["referenciaid"] = $data->referenciaid;
        $arreglo["observacion"] = strtoupper(utf8_encode($data->observacion));
        $arreglo["centralid"] = $data->centralid;
        $arreglo["comiteid"] = $data->comiteid;
        $arreglo["socioid"] = $data->socioid;
        $rs = $this->socio->actualizarPachacamacEtapa($arreglo);
        echo json_encode($rs);
    }

    public function registrarPachacamacEtapaSectorBarrio() {
        $info = $this->input->post("data");
        $data = json_decode($info);

        $arreglo["centralid"] = $data->centralid;
        $arreglo["comiteid"] = $data->comiteid;
        $arreglo["apepater"] = strtoupper(utf8_encode($data->apepater));
        $arreglo["apemater"] = strtoupper(utf8_encode($data->apemater));
        $arreglo["nombre"] = strtoupper(utf8_encode($data->nombre));
        $arreglo["dni"] = $data->dni;
        $arreglo["opcionid"] = $data->opcionid;
        $arreglo["etapaid"] = $data->etapaid;
        $arreglo["sectorid"] = $data->sectorid;
        $arreglo["barrioid"] = $data->barrioid;
        $arreglo["manzanaid"] = $data->manzanaid;
        $arreglo["loteid"] = $data->loteid;
        $arreglo["referenciaid"] = $data->referenciaid;
        $arreglo["observacion"] = strtoupper(utf8_encode($data->observacion));
        $rs = $this->socio->registrarPachacamacEtapaSectorBarrio($arreglo);
        echo json_encode($rs);
    }

    public function actualizarPachacamacEtapaSectorBarrio() {
        $info = $this->input->post("data");
        $data = json_decode($info);

        $arreglo["apepater"] = strtoupper(utf8_encode($data->apepater));
        $arreglo["apemater"] = strtoupper(utf8_encode($data->apemater));
        $arreglo["nombre"] = strtoupper(utf8_encode($data->nombre));
        $arreglo["dni"] = $data->dni;
        $arreglo["opcionid"] = $data->opcionid;
        $arreglo["etapaid"] = $data->etapaid;
        $arreglo["sectorid"] = $data->sectorid;
        $arreglo["barrioid"] = $data->barrioid;
        $arreglo["manzanaid"] = $data->manzanaid;
        $arreglo["loteid"] = $data->loteid;
        $arreglo["referenciaid"] = $data->referenciaid;
        $arreglo["observacion"] = strtoupper(utf8_encode($data->observacion));
        $arreglo["centralid"] = $data->centralid;
        $arreglo["comiteid"] = $data->comiteid;
        $arreglo["socioid"] = $data->socioid;
        $rs = $this->socio->actualizarPachacamacEtapaSectorBarrio($arreglo);
        echo json_encode($rs);
    }

    public function registrarAAHH() {
        $info = $this->input->post("data");
        $data = json_decode($info);

        $arreglo["centralid"] = $data->centralid;
        $arreglo["comiteid"] = $data->comiteid;
        $arreglo["apepater"] = strtoupper(utf8_encode($data->apepater));
        $arreglo["apemater"] = strtoupper(utf8_encode($data->apemater));
        $arreglo["nombre"] = strtoupper(utf8_encode($data->nombre));
        $arreglo["dni"] = $data->dni;
        $arreglo["opcionid"] = $data->opcionid;
        $arreglo["aahhid"] = $data->aahhid;
        $arreglo["manzanaid"] = $data->manzanaid;
        $arreglo["loteid"] = $data->loteid;
        $arreglo["referenciaid"] = $data->referenciaid;
        $arreglo["observacion"] = strtoupper(utf8_encode($data->observacion));
        $rs = $this->socio->registrarAAHH($arreglo);
        echo json_encode($rs);
    }

    public function actualizarAAHH() {
        $info = $this->input->post("data");
        $data = json_decode($info);


        $arreglo["apepater"] = strtoupper(utf8_encode($data->apepater));
        $arreglo["apemater"] = strtoupper(utf8_encode($data->apemater));
        $arreglo["nombre"] = strtoupper(utf8_encode($data->nombre));
        $arreglo["dni"] = $data->dni;
        $arreglo["opcionid"] = $data->opcionid;
        $arreglo["aahhid"] = $data->aahhid;
        $arreglo["manzanaid"] = $data->manzanaid;
        $arreglo["loteid"] = $data->loteid;
        $arreglo["referenciaid"] = $data->referenciaid;
        $arreglo["observacion"] = strtoupper(utf8_encode($data->observacion));
        $arreglo["centralid"] = $data->centralid;
        $arreglo["comiteid"] = $data->comiteid;
        $arreglo["socioid"] = $data->socioid;
        $rs = $this->socio->actualizarAAHH($arreglo);
        echo json_encode($rs);
    }

    public function registrarAsociacion() {
        $info = $this->input->post("data");
        $data = json_decode($info);

        $arreglo["centralid"] = $data->centralid;
        $arreglo["comiteid"] = $data->comiteid;
        $arreglo["apepater"] = strtoupper(utf8_encode($data->apepater));
        $arreglo["apemater"] = strtoupper(utf8_encode($data->apemater));
        $arreglo["nombre"] = strtoupper(utf8_encode($data->nombre));
        $arreglo["dni"] = $data->dni;
        $arreglo["opcionid"] = $data->opcionid;
        $arreglo["asociacionid"] = $data->asociacionid;
        $arreglo["manzanaid"] = $data->manzanaid;
        $arreglo["loteid"] = $data->loteid;
        $arreglo["referenciaid"] = $data->referenciaid;
        $arreglo["observacion"] = strtoupper(utf8_encode($data->observacion));
        $rs = $this->socio->registrarAsociacion($arreglo);
        echo json_encode($rs);
    }

    public function actualizarAsociacion() {
        $info = $this->input->post("data");
        $data = json_decode($info);

        $arreglo["apepater"] = strtoupper(utf8_encode($data->apepater));
        $arreglo["apemater"] = strtoupper(utf8_encode($data->apemater));
        $arreglo["nombre"] = strtoupper(utf8_encode($data->nombre));
        $arreglo["dni"] = $data->dni;
        $arreglo["opcionid"] = $data->opcionid;
        $arreglo["asociacionid"] = $data->asociacionid;
        $arreglo["manzanaid"] = $data->manzanaid;
        $arreglo["loteid"] = $data->loteid;
        $arreglo["referenciaid"] = $data->referenciaid;
        $arreglo["observacion"] = strtoupper(utf8_encode($data->observacion));
        $arreglo["centralid"] = $data->centralid;
        $arreglo["comiteid"] = $data->comiteid;
        $arreglo["socioid"] = $data->socioid;
        $rs = $this->socio->actualizarAsociacion($arreglo);
        echo json_encode($rs);
    }

    public function registrarAsociacionGrupo() {
        $info = $this->input->post("data");
        $data = json_decode($info);

        $arreglo["centralid"] = $data->centralid;
        $arreglo["comiteid"] = $data->comiteid;
        $arreglo["apepater"] = strtoupper(utf8_encode($data->apepater));
        $arreglo["apemater"] = strtoupper(utf8_encode($data->apemater));
        $arreglo["nombre"] = strtoupper(utf8_encode($data->nombre));
        $arreglo["dni"] = $data->dni;
        $arreglo["opcionid"] = $data->opcionid;
        $arreglo["asociacionid"] = $data->asociacionid;
        $arreglo["grupoid"] = $data->grupoid;
        $arreglo["manzanaid"] = $data->manzanaid;
        $arreglo["loteid"] = $data->loteid;
        $arreglo["referenciaid"] = $data->referenciaid;
        $arreglo["observacion"] = strtoupper(utf8_encode($data->observacion));
        $rs = $this->socio->registrarAsociacionGrupo($arreglo);
        echo json_encode($rs);
    }

    public function actualizarAsociacionGrupo() {
        $info = $this->input->post("data");
        $data = json_decode($info);


        $arreglo["apepater"] = strtoupper(utf8_encode($data->apepater));
        $arreglo["apemater"] = strtoupper(utf8_encode($data->apemater));
        $arreglo["nombre"] = strtoupper(utf8_encode($data->nombre));
        $arreglo["dni"] = $data->dni;
        $arreglo["opcionid"] = $data->opcionid;
        $arreglo["asociacionid"] = $data->asociacionid;
        $arreglo["grupoid"] = $data->grupoid;
        $arreglo["manzanaid"] = $data->manzanaid;
        $arreglo["loteid"] = $data->loteid;
        $arreglo["referenciaid"] = $data->referenciaid;
        $arreglo["observacion"] = strtoupper(utf8_encode($data->observacion));
        $arreglo["centralid"] = $data->centralid;
        $arreglo["comiteid"] = $data->comiteid;
        $arreglo["socioid"] = $data->socioid;
        $rs = $this->socio->actualizarAsociacionGrupo($arreglo);
        echo json_encode($rs);
    }

    public function registrarCooperativa() {
        $info = $this->input->post("data");
        $data = json_decode($info);

        $arreglo["centralid"] = $data->centralid;
        $arreglo["comiteid"] = $data->comiteid;
        $arreglo["apepater"] = strtoupper(utf8_encode($data->apepater));
        $arreglo["apemater"] = strtoupper(utf8_encode($data->apemater));
        $arreglo["nombre"] = strtoupper(utf8_encode($data->nombre));
        $arreglo["dni"] = $data->dni;
        $arreglo["opcionid"] = $data->opcionid;
        $arreglo["cooperativaid"] = $data->cooperativaid;
        $arreglo["manzanaid"] = $data->manzanaid;
        $arreglo["loteid"] = $data->loteid;
        $arreglo["referenciaid"] = $data->referenciaid;
        $arreglo["observacion"] = strtoupper(utf8_encode($data->observacion));
        $rs = $this->socio->registrarCooperativa($arreglo);
        echo json_encode($rs);
    }

    public function actualizarCooperativa() {
        $info = $this->input->post("data");
        $data = json_decode($info);

        $arreglo["apepater"] = strtoupper(utf8_encode($data->apepater));
        $arreglo["apemater"] = strtoupper(utf8_encode($data->apemater));
        $arreglo["nombre"] = strtoupper(utf8_encode($data->nombre));
        $arreglo["dni"] = $data->dni;
        $arreglo["opcionid"] = $data->opcionid;
        $arreglo["cooperativaid"] = $data->cooperativaid;
        $arreglo["manzanaid"] = $data->manzanaid;
        $arreglo["loteid"] = $data->loteid;
        $arreglo["referenciaid"] = $data->referenciaid;
        $arreglo["observacion"] = strtoupper(utf8_encode($data->observacion));
        $arreglo["centralid"] = $data->centralid;
        $arreglo["comiteid"] = $data->comiteid;
        $arreglo["socioid"] = $data->socioid;
        $rs = $this->socio->actualizarCooperativa($arreglo);
        echo json_encode($rs);
    }

    public function registrarOtros(){

        $info = $this->input->post("data");
        $data = json_decode($info);

        $arreglo["centralid"] = $data->centralid;
        $arreglo["comiteid"] = $data->comiteid;
        $arreglo["apepater"] = strtoupper(utf8_encode($data->apepater));
        $arreglo["apemater"] = strtoupper(utf8_encode($data->apemater));
        $arreglo["nombre"] = strtoupper(utf8_encode($data->nombre));
        $arreglo["dni"] = $data->dni;
        $arreglo["opcionid"] = $data->opcionid;
        $arreglo["referenciaid"] = $data->referenciaid;
        $arreglo["observacion"] = strtoupper(utf8_encode($data->observacion));
        $rs = $this->socio->registrarOtros($arreglo);
        echo json_encode($rs);

    }

     public function actualizarOtros() {
        $info = $this->input->post("data");
        $data = json_decode($info);

        $arreglo["apepater"] = strtoupper(utf8_encode($data->apepater));
        $arreglo["apemater"] = strtoupper(utf8_encode($data->apemater));
        $arreglo["nombre"] = strtoupper(utf8_encode($data->nombre));
        $arreglo["dni"] = $data->dni;
        $arreglo["opcionid"] = $data->opcionid;
        $arreglo["referenciaid"] = $data->referenciaid;
        $arreglo["observacion"] = strtoupper(utf8_encode($data->observacion));
        $arreglo["centralid"] = $data->centralid;
        $arreglo["comiteid"] = $data->comiteid;
        $arreglo["socioid"] = $data->socioid;
        $rs = $this->socio->actualizarOtros($arreglo);
        echo json_encode($rs);
    }


    public function eliminar() {
        $info = $this->input->post("data");
        $data = json_decode($info);

        $arreglo["socioid"] = $data->socioid;
        $rs = $this->socio->eliminar($arreglo);
        echo json_encode($rs);
    }
    public function activar() {
        $id = $this->input->post("idsocio");
        $data = array($id);
        $rs = $this->socio->activar($data);
        echo json_encode($rs);
    }


}
