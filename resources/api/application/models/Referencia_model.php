<?php
class Referencia_model extends CI_Model{
    
    public function __construct() {
        parent::__construct();
    }
    
    public function lista(){
        
        $sql="select referenciaid,descripcion from referencia";
        $rs=  $this->db->query($sql);
        $data["success"]=($rs->num_rows()>0)?TRUE:FALSE;
        $data["data"]=$rs->result();
        return $data;
        
    }
}

