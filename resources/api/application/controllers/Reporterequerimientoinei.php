<?php

ini_set('max_execution_time', 300);
ini_set('memory_limit', '4095M');
if (!defined("BASEPATH"))
    exit("sin acesso directo..!");
require_once APPPATH . "/third_party/fpdf/fpdf.php";

class Reporterequerimientoinei extends CI_Controller {

    public function __construct() {
        parent::__construct();
        $this->load->model("Reporterequerimientoinei_model", "reporterequerimientoinei");
        $this->load->model("Central_model", "central");
    }

    public function imprimir() {

        $centralid = $this->input->get("id");
        $rscentral = $this->central->listaXId(array("centralid" => $centralid));
        $rs = $this->reporterequerimientoinei->requerimientoInei(array("centralid" => $centralid));

        $fpdf = new FPDF("L", "mm", "A4");
        $fpdf->SetAutoPageBreak(true, 100);
        $fpdf->AddPage();
        $fpdf->AliasNbPages();
        $fpdf->SetMargins(10, 15, 10);
        $fpdf->SetAutoPageBreak(true, 10);
        $fpdf->setFont("Arial", "B", 8);

        $fpdf->cell(275, 8, "FORMATO UNICO PARA INEI", 1, 1, "C", FALSE);
        $fpdf->ln(5);
        $fpdf->cell(50, 8, $rscentral["data"]["central"], 0, 1, "L", FALSE);
        $fpdf->ln(5);

        $item = 0;
        $fpdf->setFont("Arial", "B", 6);

        $fpdf->cell(5, 8, "Nro", 1, 0, "L", FALSE);
        $fpdf->cell(15, 8, "Cod.Interno", 1, 0, "L", FALSE);
        $fpdf->cell(60, 8, "Direccion", 1, 0, "C", FALSE);
        $fpdf->cell(9, 8, "0", 1, 0, "C", FALSE);
        $fpdf->cell(9, 8, "1", 1, 0, "C", FALSE);
        $fpdf->cell(9, 8, "2", 1, 0, "C", FALSE);
        $fpdf->cell(9, 8, "3", 1, 0, "C", FALSE);
        $fpdf->cell(9, 8, "4", 1, 0, "C", FALSE);
        $fpdf->cell(9, 8, "5", 1, 0, "C", FALSE);
        $fpdf->cell(9, 8, "6", 1, 0, "C", FALSE);
        $fpdf->cell(9, 8, "7-13", 1, 0, "C", FALSE);
        $fpdf->cell(9, 8, "M-Gest", 1, 0, "C", FALSE);
        $fpdf->cell(9, 8, "M-LACT", 1, 0, "C", FALSE);
        $fpdf->cell(9, 8, 'Discap.', 1, 0, "C", FALSE);
        $fpdf->cell(9, 8, 'Tbc', 1, 0, "C", FALSE);
         $fpdf->cell(9, 8, "A.M.Muj", 1, 0, "C", FALSE);
         $fpdf->cell(9, 8, "A.M.Hom", 1, 0, "C", FALSE);
         $fpdf->cell(9, 8, "A.M.", 1, 1, "C", FALSE);





        $fpdf->setFont("Arial", "B", 7);
        foreach ($rs["data"] as $row) {
            $item++;
            $fpdf->cell(5, 8, $item, 1, 0, "L", FALSE);
            $fpdf->cell(15, 8, $row->codigointerno, 1, 0, "L", FALSE);
            $fpdf->cell(60, 8, $row->direccion, 1, 0, "L", FALSE);
            $fpdf->cell(9, 8, $row->ninos0, 1, 0, "C", FALSE);
            $fpdf->cell(9, 8, $row->ninos1, 1, 0, "C", FALSE);
            $fpdf->cell(9, 8, $row->ninos2, 1, 0, "C", FALSE);
            $fpdf->cell(9, 8, $row->ninos3, 1, 0, "C", FALSE);
            $fpdf->cell(9, 8, $row->ninos4, 1, 0, "C", FALSE);
            $fpdf->cell(9, 8, $row->ninos5, 1, 0, "C", FALSE);
            $fpdf->cell(9, 8, $row->ninos6, 1, 0, "C", FALSE);
            $fpdf->cell(9, 8, $row->ninos713, 1, 0, "C", FALSE);
            $fpdf->cell(9, 8, $row->pptotalmg, 1, 0, "C", FALSE);
            $fpdf->cell(9, 8, $row->pptotalml, 1, 0, "C", FALSE);
            $fpdf->cell(9, 8, $row->pptotaldisca, 1, 0, "C", FALSE);
            $fpdf->cell(9, 8, $row->sptotaltbc, 1, 0, "C", FALSE);
            $fpdf->cell(9, 8, $row->sptotalamayorm, 1, 0, "C", FALSE);
            $fpdf->cell(9, 8, $row->sptotalamayorh, 1, 0, "C", FALSE);
            $fpdf->cell(9, 8, $row->sptotalamayor, 1, 1, "C", FALSE);
        }

        $fpdf->Output();
    }

}
