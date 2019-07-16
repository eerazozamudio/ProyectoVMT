<?php
class Supervisor_model extends CI_Model{
    
    public function __construct() {
        parent::__construct();
    }
    
    function  lista(){
        
        $sql="select * from supervisor ";
        $rs=  $this->db->query($sql);
        $data["success"]=($rs->num_rows()>0)?TRUE:FALSE;
        $data["data"]=$rs->result();
        return $data;
        
    }
    
     public function listaCombo(){
         
         $sql="select idsuper,concat(apellidos,space(1),nombres)as supervisor from supervisor";
         $rs=  $this->db->query($sql);
         $data["success"]=($rs->num_rows()>0)?TRUE:FALSE;
         $data["data"]=$rs->result();
         return $data;
         
     }
    
     public function grabar($arreglo) {

        if ($arreglo["idsuper"] == 0) {
            $array[] = $arreglo["apellidos"];
            $array[] =$arreglo["nombres"];
            $array[] =$arreglo["telefono"];
            
            
            $sql = "insert into supervisor(apellidos,nombres,telefono)values ";
            $sql.="(?,?,?)";
        } else {
            $array[] = $arreglo["apellidos"];
            $array[] =$arreglo["nombres"];
            $array[] =$arreglo["telefono"];
             $array[]=$arreglo["idsuper"];
            $sql = "update supervisor set apellidos=?,";
            $sql.="nombres=?,telefono=? where";
            $sql.=" idsuper=?";
        }
        $rs = $this->db->query($sql, $array);
        $data["success"] = $rs;
        return $data;
    }
    
    public function eliminar($arreglo) {
        $array[] = $arreglo["idsuper"];
        $sql = "delete from supervisor where idsuper=?";
        $rs = $this->db->query($sql, $array);
        $data["success"] = $rs;
        return $data;
    }
    
   
}
