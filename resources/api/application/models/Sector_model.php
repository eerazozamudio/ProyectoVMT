<?php
class Sector_model extends CI_Model{
    
    public function __construct() {
        parent::__construct();
    }
    
    function lista(){
        $sql="select sectorid,descripcion from sector";
        $rs=  $this->db->query($sql);
        $data["success"]=($rs->num_rows()>0)?TRUE:FALSE;
        $data["data"]=$rs->result();
        return $data;
    }
    
    public function listaCuartaEtapa(){
        $sql="select sectorid,descripcion from sector where sectorid in(1,2)";
        $rs=  $this->db->query($sql);
        $data["success"]=($rs->num_rows()>0)?TRUE:FALSE;
        $data["data"]=$rs->result();
        return $data;
    }
    
}