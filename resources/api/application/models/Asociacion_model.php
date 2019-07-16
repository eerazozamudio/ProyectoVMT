<?php
class Asociacion_model extends CI_Model{
    
    public function __construct() {
        parent::__construct();
    }
    
    function  lista(){
        
        $sql="select asociacionid,descripcion from asociacion";
        $rs=  $this->db->query($sql);
        $data["success"]=($rs->num_rows()>0)?TRUE:FALSE;
        $data["data"]=$rs->result();
        return $data;
        
    }
    
   
}

