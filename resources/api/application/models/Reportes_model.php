<?php
class Reportes_model extends CI_Model{

    public function __construct() {
        parent::__construct();
    }
    //** Resumen de requerimiento del historico
    function listarResumenHistorico($arreglo){
        $sql="call sp_requerimiento_semanal_resumen_historico(?,?,?)";
        $rs=$this->db->query($sql,$arreglo);
        $data["data"] = $rs->result();
        return $data;
    }
    //** Lista todas las centrales y sus requerimiento no es historico, es la data actual depurada */
    function listaRequerimientoTodosLasCentrales($arreglo){
        $sql="call sp_requerimiento_semanal_todos()";
        $rs=$this->db->query($sql,$arreglo);
        $data["data"] = $rs->result();
        return $data;
    }

     //** Guarda la data actual de los requerimientos de la semana al historico para luego imprimirlo */
     function guardarRequerimientoSemanalHistorico($arreglo){
        $sql="call sp_requerimiento_semanal_guardar_historico(?,?,?)";
        $rs=$this->db->query($sql,$arreglo);
        $data["data"] = $rs->result();
        return $data;
    }
    // ** Valida si ya esta guardado el requerimiento por esa semana
    function validarRequerimientoSemanal($arreglo){
       $sql="call sp_requerimiento_semanal_validar_historico(?,?,?)";
       $rs=$this->db->query($sql,$arreglo);
       return $rs->result();
   }

   // ** Reporte de contraloria por idcondicion
   function reporteContraloria($condicion){
      $data = array($condicion);
      $sql="call sp_contraloria(?)";
      $rs=$this->db->query($sql,$data);
      return $rs->result();
  }







}
