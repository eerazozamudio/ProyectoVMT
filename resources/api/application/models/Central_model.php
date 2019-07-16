<?php
class Central_model extends CI_Model{

    public function __construct() {
        parent::__construct();
    }
    function lista(){
        //$sql='select centralid,descripcion from central order by 1';
        $sql ="select c.centralid,c.descripcion,c.idcoorcentral,CONCAT(s.nombres,' ',s.apellidos )coordinadora
        from central c 
        LEFT JOIN supervisor s on s.idsuper = c.idcoorcentral  order by c.descripcion";
        $rs=  $this->db->query($sql);
        $flag=($rs->num_rows()>0)?true:FALSE;
        $data["success"]=$flag;
        $data["data"]=$rs->result();
        return $data;

    }

    function listaXId($arreglo){
        $array[]=$arreglo["centralid"];
        $sql="select centralid,descripcion from central where centralid=?";
        $rs=$this->db->query($sql,$array);
        $item["centralid"]=$rs->row("centralid");
        $item["central"]=$rs->row("descripcion");
        $data["success"]=($rs->num_rows()>0)?TRUE:FALSE;
        $data["data"]=$item;
        return $data;
    }
    /* Reportes historicos
       1) listarResumenHistorico : Resumen de todas las centrales
       2) listarRequerimientoHistorico : Imprime todas las centrales y sus requerimientos
    */

    function listarResumenHistorico($arreglo){
        $sql="call sp_requerimiento_semanal_resumen_historico(?,?,?)";
        $rs=$this->db->query($sql,$arreglo);
        $data["data"] = $rs->result();
        return $data;
    }
    function listarRequerimientoHistorico($arreglo){
        $sql="call sp_requerimiento_semanal_todos()";
        $rs=$this->db->query($sql,$arreglo);
        $data["data"] = $rs->result();
        return $data;
    }
    # Reporte e Inei mejorado
    function reporte_inei($central){
        $sql="call sp_estadistica_inei(".$central.",null)";
        $rs=$this->db->query($sql);
        return $rs->result();
    }
    function centralActualizarCoordinador($arreglo){
        $sql="UPDATE central  SET idcoorcentral=? WHERE  centralid =?";
        $rs=$this->db->query($sql,$arreglo);
        $data["success"] = TRUE;        
        return $data; 
    }


}
