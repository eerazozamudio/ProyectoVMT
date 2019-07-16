<?php
class Coordinador_model extends CI_Model{
    
    public function __construct() {
        parent::__construct();
    }
    
    function  lista(){
        
        $sql="select co.idcoor,co.nombres,co.apellidos,co.idcargo,c.descripcion as cargo,co.telefono,co.estado, co.dni,co.direccion from coordinador co left join cargo c ";
        $sql.="on co.idcargo=c.idcargo";
        $rs=  $this->db->query($sql);
        $data["success"]=($rs->num_rows()>0)?TRUE:FALSE;
        $data["data"]=$rs->result();
        return $data;
        
    }
    
    public function listaCombo(){
        
        $sql="select idcoor,concat(apellidos,space(1),nombres)as coordinador from coordinador";
        $rs=$this->db->query($sql);
        $data["success"]=($rs->num_rows()>0)?TRUE:FALSE;
        $data["data"]=$rs->result();
        return $data;
        
    }
    
     public function grabar($arreglo) {
        
        if ($arreglo["idcoor"] == 0) {
            $array[] = $arreglo["apellidos"];
            $array[] =$arreglo["nombres"];
            $array[] =$arreglo["telefono"];
            $array[] =$arreglo["idcargo"];
            $array[] =$arreglo["dni"];
            $array[] =$arreglo["direccion"];
            
            $sql = "insert into coordinador(apellidos,nombres,telefono,idcargo,dni,direccion)values ";
            $sql.="(?,?,?,?,?,?)";
        } else {
            $array[] = $arreglo["apellidos"];
            $array[] =$arreglo["nombres"];
            $array[] =$arreglo["telefono"];
            $array[] =$arreglo["idcargo"];
            $array[] =$arreglo["dni"];
            $array[] =$arreglo["direccion"];
            $array[]=$arreglo["idcoor"];
           
            $sql = "update coordinador set apellidos=?,";
            $sql.="nombres=?,telefono=?,idcargo=?,dni=?,direccion=?  where";
            $sql.=" idcoor=?";
        }
        $rs = $this->db->query($sql, $array);
        $data["success"] = $rs;
        return $data;
    }
    
    public function eliminar($arreglo) {
        $array[] = $arreglo["idcoor"];
        $sql = "delete from coordinador where idcoor=?";
        $rs = $this->db->query($sql, $array);
        $data["success"] = $rs;
        return $data;
    }
    
   
}
