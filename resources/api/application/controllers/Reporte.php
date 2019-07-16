<?php
ini_set('max_execution_time', 300);
ini_set('memory_limit', '4095M');
if (!defined("BASEPATH"))
    exit("sin acesso directo..!");
require_once APPPATH . "/third_party/fpdf/fpdf.php";

class Reporte extends CI_Controller {

    public function __construct() {
        parent::__construct();
        $this->load->model("Socio_model", "socio");
        $this->load->model("Beneficiario_model", "beneficiario");
        $this->load->model("Central_model", "central");
        $this->load->model("comite_model", "comite");
        $this->load->model("Reportes_model", "reportes");
    }

    public function imprimirCantidadesTodos() {

        $fpdf = new FPDF("L", "mm", "A4");
        $fpdf->SetAutoPageBreak(true, 100);
        $fpdf->AddPage();
        $fpdf->AliasNbPages();
        $fpdf->SetMargins(10, 15, 10);
        $fpdf->SetAutoPageBreak(true, 10);
        $fpdf->setFont("Arial", "B", 8);

        $rscentral = $this->central->lista();
        $rscentral = $rscentral["data"];

        foreach ($rscentral as $rowcentral) {

            $fpdf->SetFillColor(224, 224, 224);

            $fpdf->cell(240, 8, $rowcentral->descripcion, 1, 1, "C", true);

            $fpdf->cell(20, 7, "", 1, 0, "C", true);
            $fpdf->cell(85, 7, utf8_decode("1° PRIORIDAD"), 1, 0, "C", true);
            $fpdf->cell(115, 7, utf8_decode("2° PRIORIDAD"), 1, 0, "C", true);
            $fpdf->cell(20, 7, "", 1, 1, "C", true);
            //  $fpdf->setX(40);
            $fpdf->cell(20, 7, "", 1, 0, "C", true);
            $fpdf->cell(70, 7, "EDAD", 1, 0, "C", true);
            $fpdf->Cell(15, 7, "", 1, 0, "C", true);

            $fpdf->cell(100, 7, "EDAD", 1, 0, "C", true);
            $fpdf->Cell(35, 7, "", 1, 1, "C", true);
            //    $fpdf->setX(40);
            $fpdf->cell(20, 7, "COMITE", 1, 0, "C", true);
            $fpdf->cell(10, 7, "0", 1, 0, "C", true);
            $fpdf->cell(10, 7, "1", 1, 0, "C", true);
            $fpdf->cell(10, 7, "2", 1, 0, "C", true);
            $fpdf->cell(10, 7, "3", 1, 0, "C", true);
            $fpdf->cell(10, 7, "4", 1, 0, "C", true);
            $fpdf->cell(10, 7, "5", 1, 0, "C", true);
            $fpdf->cell(10, 7, "6", 1, 0, "C", true);
            $fpdf->cell(15, 7, "TOTAL", 1, 0, "C", true);
            $fpdf->cell(10, 7, "7", 1, 0, "C", true);
            $fpdf->cell(10, 7, "8", 1, 0, "C", true);
            $fpdf->cell(10, 7, "9", 1, 0, "C", true);
            $fpdf->cell(10, 7, "10", 1, 0, "C", true);
            $fpdf->cell(10, 7, "11", 1, 0, "C", true);
            $fpdf->cell(10, 7, "12", 1, 0, "C", true);
            $fpdf->cell(10, 7, "13", 1, 0, "C", true);
            $fpdf->setFont("Arial", "B", 5);
            $fpdf->cell(15, 7, "A.M. MUJER", 1, 0, "C", true);
            $fpdf->cell(15, 7, "A.M. HOMBRE", 1, 0, "C", true);
            $fpdf->cell(15, 7, "T.B.C.", 1, 0, "C", true);
            $fpdf->cell(15, 7, "DISCA.", 1, 0, "C", true);
            $fpdf->setFont("Arial", "B", 8);
            $fpdf->cell(15, 7, "TOTAL", 1, 0, "C", true);
            $fpdf->setFont("Arial", "B", 7);
            $fpdf->cell(20, 7, utf8_decode("TOTAL 1° Y 2°"), 1, 1, "C", true);
            $fpdf->setFont("Arial", "", 8);

            $totalcero = 0;
            $totaluno = 0;
            $totaldos = 0;
            $totaltres = 0;
            $totalcuatro = 0;
            $totalcinco = 0;
            $totalseis = 0;
            $total1 = 0;

            $totalsiete = 0;
            $totalocho = 0;
            $totalnueve = 0;
            $totaldiez = 0;
            $totalonce = 0;
            $totaldoce = 0;
            $totaltrece = 0;
            $totalancianos = 0;
            $totalancianas = 0;
            $total2 = 0;

            $rscomite = $this->comite->listaPorCentralId(array("centralid" => $rowcentral->centralid));
            $rscomite = $rscomite["data"];

            foreach ($rscomite as $row2) {
                //  $fpdf->setX(40);
                $totalceroaseis = 0;
                $totalsieteatrece = 0;

                $rsedadcero = $this->beneficiario->cantidadPorComite(array("edad" => 0, "comiteid" => $row2->comiteid));
                $rsedaduno = $this->beneficiario->cantidadPorComite(array("edad" => 1, "comiteid" => $row2->comiteid));
                $rsedaddos = $this->beneficiario->cantidadPorComite(array("edad" => 2, "comiteid" => $row2->comiteid));
                $rsedadtres = $this->beneficiario->cantidadPorComite(array("edad" => 3, "comiteid" => $row2->comiteid));
                $rsedadcuatro = $this->beneficiario->cantidadPorComite(array("edad" => 4, "comiteid" => $row2->comiteid));
                $rsedadcinco = $this->beneficiario->cantidadPorComite(array("edad" => 5, "comiteid" => $row2->comiteid));
                $rsedadseis = $this->beneficiario->cantidadPorComite(array("edad" => 6, "comiteid" => $row2->comiteid));

                $rsedadsiete = $this->beneficiario->cantidadPorComite(array("edad" => 7, "comiteid" => $row2->comiteid));
                $rsedadocho = $this->beneficiario->cantidadPorComite(array("edad" => 8, "comiteid" => $row2->comiteid));
                $rsedadnueve = $this->beneficiario->cantidadPorComite(array("edad" => 9, "comiteid" => $row2->comiteid));
                $rsedaddiez = $this->beneficiario->cantidadPorComite(array("edad" => 10, "comiteid" => $row2->comiteid));
                $rsedadonce = $this->beneficiario->cantidadPorComite(array("edad" => 11, "comiteid" => $row2->comiteid));
                $rsedaddoce = $this->beneficiario->cantidadPorComite(array("edad" => 12, "comiteid" => $row2->comiteid));
                $rsedadtrece = $this->beneficiario->cantidadPorComite(array("edad" => 13, "comiteid" => $row2->comiteid));
                $rsmujeresancianas = $this->beneficiario->cantidadAdultoMayorPorComite(array("edad" => 55, "comiteid" => $row2->comiteid, "sexoid" => 2));
                $rshombressancianos = $this->beneficiario->cantidadAdultoMayorPorComite(array("edad" => 60, "comiteid" => $row2->comiteid, "sexoid" => 1));

                $totalceroaseis+=(int) $rsedadcero["cantidad"];
                $totalceroaseis+=(int) $rsedaduno["cantidad"];
                $totalceroaseis+=(int) $rsedaddos["cantidad"];
                $totalceroaseis+=(int) $rsedadtres["cantidad"];
                $totalceroaseis+=(int) $rsedadcuatro["cantidad"];
                $totalceroaseis+=(int) $rsedadcinco["cantidad"];
                $totalceroaseis+=(int) $rsedadseis["cantidad"];
                $total1+=(int) $totalceroaseis;

                $totalsieteatrece+=(int) $rsedadsiete["cantidad"];
                $totalsieteatrece+=(int) $rsedadocho["cantidad"];
                $totalsieteatrece+=(int) $rsedadnueve["cantidad"];
                $totalsieteatrece+=(int) $rsedaddiez["cantidad"];
                $totalsieteatrece+=(int) $rsedadonce["cantidad"];
                $totalsieteatrece+=(int) $rsedaddoce["cantidad"];
                $totalsieteatrece+=(int) $rsedadtrece["cantidad"];
                $totalsieteatrece+=(int) $rsmujeresancianas["cantidad"];
                $totalsieteatrece+=(int) $rshombressancianos["cantidad"];
                $total2+=(int) $totalsieteatrece;

                $totalcero+=(int) $rsedadcero["cantidad"];
                $totaluno+=(int) $rsedaduno["cantidad"];
                $totaldos+=(int) $rsedaddos["cantidad"];
                $totaltres+=(int) $rsedadtres["cantidad"];
                $totalcuatro+=(int) $rsedadcuatro["cantidad"];
                $totalcinco+=(int) $rsedadcinco["cantidad"];
                $totalseis+=(int) $rsedadseis["cantidad"];


                $totalsiete+=(int) $rsedadsiete["cantidad"];
                $totalocho+=(int) $rsedadocho["cantidad"];
                $totalnueve+=(int) $rsedadnueve["cantidad"];
                $totaldiez+=(int) $rsedaddiez["cantidad"];
                $totalonce+=(int) $rsedadonce["cantidad"];
                $totaldoce+=(int) $rsedaddoce["cantidad"];
                $totaltrece+=(int) $rsedadtrece["cantidad"];
                $totalancianas+=(int) $rsmujeresancianas["cantidad"];
                $totalancianos+=(int) $rshombressancianos["cantidad"];

                //  $fpdf->setX(30);
                $fpdf->cell(20, 5, $row2->codigointerno, 1, 0, "C");
                $fpdf->cell(10, 5, $rsedadcero["cantidad"], 1, 0, "C");
                $fpdf->cell(10, 5, $rsedaduno["cantidad"], 1, 0, "C");
                $fpdf->cell(10, 5, $rsedaddos["cantidad"], 1, 0, "C");
                $fpdf->cell(10, 5, $rsedadtres["cantidad"], 1, 0, "C");
                $fpdf->cell(10, 5, $rsedadcuatro["cantidad"], 1, 0, "C");
                $fpdf->cell(10, 5, $rsedadcinco["cantidad"], 1, 0, "C");
                $fpdf->cell(10, 5, $rsedadseis["cantidad"], 1, 0, "C");
                $fpdf->cell(15, 5, $totalceroaseis, 1, 0, "C", true);
                $fpdf->cell(10, 5, $rsedadsiete["cantidad"], 1, 0, "C");
                $fpdf->cell(10, 5, $rsedadocho["cantidad"], 1, 0, "C");
                $fpdf->cell(10, 5, $rsedadnueve["cantidad"], 1, 0, "C");
                $fpdf->cell(10, 5, $rsedaddiez["cantidad"], 1, 0, "C");
                $fpdf->cell(10, 5, $rsedadonce["cantidad"], 1, 0, "C");
                $fpdf->cell(10, 5, $rsedaddoce["cantidad"], 1, 0, "C");
                $fpdf->cell(10, 5, $rsedadtrece["cantidad"], 1, 0, "C");
                $fpdf->cell(15, 5, $rsmujeresancianas["cantidad"], 1, 0, "C");
                $fpdf->cell(15, 5, $rshombressancianos["cantidad"], 1, 0, "C");
                $fpdf->cell(15, 5, $totalsieteatrece, 1, 0, "C", true);
                $fpdf->cell(20, 5, ($totalceroaseis + $totalsieteatrece), 1, 1, "C", true);
            }

            $fpdf->cell(20, 7, "TOTAL", 1, 0, "C", true);
            $fpdf->cell(10, 7, $totalcero, 1, 0, "R", true);
            $fpdf->cell(10, 7, $totaluno, 1, 0, "R", true);
            $fpdf->cell(10, 7, $totaldos, 1, 0, "R", true);
            $fpdf->cell(10, 7, $totaltres, 1, 0, "R", true);
            $fpdf->cell(10, 7, $totalcuatro, 1, 0, "R", true);
            $fpdf->cell(10, 7, $totalcinco, 1, 0, "R", true);
            $fpdf->cell(10, 7, $totalseis, 1, 0, "R", true);
            $fpdf->cell(15, 7, $total1, 1, 0, "R", true);
            $fpdf->cell(10, 7, $totalsiete, 1, 0, "R", true);
            $fpdf->cell(10, 7, $totalocho, 1, 0, "R", true);
            $fpdf->cell(10, 7, $totalnueve, 1, 0, "R", true);
            $fpdf->cell(10, 7, $totaldiez, 1, 0, "R", true);
            $fpdf->cell(10, 7, $totalonce, 1, 0, "R", true);
            $fpdf->cell(10, 7, $totaldoce, 1, 0, "R", true);
            $fpdf->cell(10, 7, $totaltrece, 1, 0, "R", true);
            $fpdf->cell(15, 7, $totalancianas, 1, 0, "R", true);
            $fpdf->cell(15, 7, $totalancianos, 1, 0, "R", true);
            $fpdf->cell(15, 7, $total2, 1, 0, "R", true);
            $fpdf->cell(20, 7, ($total1 + $total2), 1, 0, "R", true);

            $fpdf->Ln(15);
        }
         $fpdf->Output();
    }

    public function imprimirCantidades() {
        $centralid = $this->input->get("id");
        $rscentral = $this->central->lista();
        $rscentral = $rscentral["data"];

        $fpdf = new FPDF("L", "mm", "A4");

        $fpdf->AddPage();
        $fpdf->AliasNbPages();
        $fpdf->SetMargins(10, 5, 10);
        //$fpdf->SetAutoPageBreak(true, 10);

        
        $rscentral = $this->central->reporte_inei($centralid);
        
        $fpdf->SetFillColor(224, 224, 224);
        $fpdf->Ln(5);
        $fpdf->Image('../../resources/images/logo.jpg',5,5,20,'JPG');
        $fpdf->Ln(5);
        $fpdf->setFont("Arial", "B", 10);
        $fpdf->cell(0,5,'RESUMEN DEL EMPADRONAMIENTO DISTRITAL DEL PROGRAMA :',0,1,'C');
        $fpdf->setFont("Arial", "B", 8);
        $fpdf->cell(30,5,'Departamento :',0,0,'L');
        $fpdf->cell(50,5,'LIMA',0,0,'L');
        $fpdf->cell(20,5,'Provincia :',0,0,'L');
        $fpdf->cell(50,5,'LIMA',0,0,'L');
        $fpdf->cell(20,5,'Distrito :',0,0,'L');
        $fpdf->cell(50,5,'VILLA EL SALVADOR',0,1,'L');

        $fpdf->cell(30,5,utf8_decode('Empadronamiemto '),0,0,'L');
        $fpdf->cell(15,5,utf8_decode('Año :'),0,0,'L');
        $fpdf->cell(15,5,'2018',1,0,'L');
        $fpdf->cell(20,5,'Semestre :',0,0,'L');
        $fpdf->cell(20,5,'',1,0,'L');
        $fpdf->cell(20,5,'Fecha :',0,0,'L');
        $fpdf->cell(20,5,'',1,1,'L');

        $fpdf->ln();
        $fpdf->cell(13, 5, " ", 'LRT', 0, "C", true);
        $fpdf->cell(50, 5, " ", 'LRT', 0, "C", true);
        $fpdf->cell(83, 5, utf8_decode("NIÑOS (edad en años cumplidos)"), 1, 0, "C", true);
        $fpdf->cell(20, 5, "MADRES", 'LRT', 0, "C", true);
        $fpdf->cell(20, 5, "MADRES", 'LRT', 0, "C", true);
        $fpdf->cell(20, 5, "PERSONAS", 'LRT', 0, "C", true);
        $fpdf->cell(20, 5, "ADULTOS", 'LRT', 0, "C", true);
        $fpdf->cell(20, 5, "DISCAP.", 'LRT', 0, "C", true);
        $fpdf->cell(20, 5, " ", 'LRT', 1, "C", true);

        $fpdf->cell(13, 5, " ", 'LRB', 0, "C", true);
        $fpdf->cell(50, 5, "COMITE LOCAL", 'LRB', 0, "C", true);
        $fpdf->cell(10, 5, "0", 1, 0, "C", true);
        $fpdf->cell(10, 5, "1", 1, 0, "C", true);
        $fpdf->cell(10, 5, "2", 1, 0, "C", true);
        $fpdf->cell(10, 5, "3", 1, 0, "C", true);
        $fpdf->cell(10, 5, "4", 1, 0, "C", true);
        $fpdf->cell(10, 5, "5", 1, 0, "C", true);
        $fpdf->cell(10, 5, "6", 1, 0, "C", true);
        $fpdf->cell(13, 5, "7-13", 1, 0, "C", true);
        $fpdf->cell(20, 5, "GESTANTES", 'LRB', 0, "C", true);
        $fpdf->cell(20, 5, "LACTANTES", 'LRB', 0, "C", true);
        $fpdf->cell(20, 5, "CON TBC", 'LRB', 0, "C", true);
        $fpdf->cell(20, 5, "MAYORES", 'LRB', 0, "C", true);
        $fpdf->cell(20, 5, " ", 'LRB', 0, "C", true);
        $fpdf->cell(20, 5, "TOTAL", 'LRB', 1, "C", true);


        $totalcero = 0;
        $totaluno = 0;
        $totaldos = 0;
        $totaltres = 0;
        $totalcuatro = 0;
        $totalcinco = 0;
        $totalseis = 0;
        $total1 = 0;

        $totalsiete = 0;
        $totalocho = 0;
        $totalnueve = 0;
        $totaldiez = 0;
        $totalonce = 0;
        $totaldoce = 0;
        $total713 = 0;
        $totalancianos = 0;
        $totalancianas = 0;
        $total2 = 0;
        $totaltbc   = 0;
        $totaldisca = 0;
        $totalml =0;
        $totalmg =0;
        $totalg  =0;
        $totdisca = 0;


        $i = 0;
        foreach ($rscentral as $row2) {


            //  $fpdf->setX(30);
            $fpdf->cell(13, 4, $i++, 1, 0, "C");
            $fpdf->cell(50, 4, $row2->codigointerno, 1, 0, "C");
            $fpdf->cell(10, 4, $row2->edad0, 1, 0, "C");
            $fpdf->cell(10, 4, $row2->edad1, 1, 0, "C");
            $fpdf->cell(10, 4, $row2->edad2, 1, 0, "C");
            $fpdf->cell(10, 4, $row2->edad3, 1, 0, "C");
            $fpdf->cell(10, 4, $row2->edad4, 1, 0, "C");
            $fpdf->cell(10, 4, $row2->edad5, 1, 0, "C");
            $fpdf->cell(10, 4, $row2->edad6, 1, 0, "C");
            $fpdf->cell(13, 4, $row2->sptotalninos713, 1, 0, "C");

            $fpdf->cell(20, 4, $row2->pptotalmg, 1, 0, "C");
            $fpdf->cell(20, 4, $row2->pptotalml, 1, 0, "C");
            $fpdf->cell(20, 4, $row2->sptotaltbc, 1, 0, "C");
            $fpdf->cell(20, 4, $row2->sptotalamayor, 1, 0, "C");
            $fpdf->cell(20, 4, $row2->pptotaldisca, 1, 0, "C");
            $fpdf->cell(20, 4, $row2->SUMA, 1, 1, "C");

            $totalcero  += $row2->edad0;
            $totaluno   += $row2->edad1;
            $totaldos   += $row2->edad2;
            $totaltres  += $row2->edad3;
            $totalcuatro += $row2->edad4;
            $totalcinco  += $row2->edad5;
            $totalseis   += $row2->edad6;
            $total713    += $row2->sptotalninos713;
            $totalancianos += $row2->sptotalamayor;
            $totaltbc      += $row2->sptotaltbc;
            $totalml       += $row2->pptotalml;
            $totalmg       += $row2->pptotalmg;
            $totdisca      += $row2->pptotaldisca;
            $totalg        +=$row2->SUMA;
        }

        $fpdf->cell(63, 4, ' ', 1, 0, "C");
        $fpdf->cell(10, 4, $totalcero, 1, 0, "C");
        $fpdf->cell(10, 4, $totaluno, 1, 0, "C");
        $fpdf->cell(10, 4, $totaldos, 1, 0, "C");
        $fpdf->cell(10, 4, $totaltres, 1, 0, "C");
        $fpdf->cell(10, 4, $totalcuatro, 1, 0, "C");
        $fpdf->cell(10, 4, $totalcinco, 1, 0, "C");
        $fpdf->cell(10, 4, $totalseis, 1, 0, "C");
        $fpdf->cell(13, 4, $total713, 1, 0, "C");

        $fpdf->cell(20, 4, $totalmg, 1, 0, "C");
        $fpdf->cell(20, 4, $totalml, 1, 0, "C");
        $fpdf->cell(20, 4, $totaltbc, 1, 0, "C");
        $fpdf->cell(20, 4, $totalancianos, 1, 0, "C");
        $fpdf->cell(20, 4, $totdisca, 1, 0, "C");
        $fpdf->cell(20, 4, $totalg, 1, 1, "C");

        $fpdf->Output();
    }
    public function imprimirComitePorCentral() {

        $central = $this->input->get("central");
        $comite = $this->input->get("comite");
        $ubicacion = $this->input->get("ubicacion");
        $comiteid = $this->input->get("comiteid");
        $arreglo["comiteid"] = $comiteid;
        $rssocio = $this->socio->listaSocioPorComite($arreglo);
        $rstotalbeneficiario = $this->beneficiario->sumaBeneficiariosPorComite($arreglo);
        $totalbeneficiario = $rstotalbeneficiario["data"]["suma"];
        
        $titulo = "PADRON DE SOCIOS POR CENTRO DE ACOPIO Y COMITES - PROGRAMA DE VASO DE LECHE";

        $fpdf = new FPDF("P", "mm", "A4");
        //$fpdf->SetMargins(30, 15 , 30);
       // $fpdf->SetAutoPageBreak(true, 1);
        $fpdf->AddPage();
        $fpdf->AliasNbPages();
        $fpdf->SetMargins(10, 25, 10);
        $fpdf->SetAutoPageBreak(true, 11.3);
        $fpdf->setFont("Arial", "B", 10);
        $fpdf->cell(0, 8, $titulo, 0, 0, "C");
        $fpdf->Ln(7);
        $fpdf->setFont("Arial", "B", 8);
        $fpdf->Cell(20, 8, $central, 0, 1, "L");
        //$fpdf->Ln(5);
        $fpdf->SetXY(12, 20);
        $fpdf->Cell(20, 8, "COMITE : ", 0, 0, "L");
        $fpdf->Cell(35, 8, $comite, 0, 0, "L");
        $fpdf->Cell(25, 8, "UBICACION : ", 0, 0, "L");
        $fpdf->Cell(60, 8, $ubicacion, 0, 0, "L");
        $fpdf->Cell(40, 8, "TOTAL BENEFICIARIOS : ", 0, 0, "L");
        $fpdf->Cell(0, 8, $totalbeneficiario, 0, 1, "L");
        $contador = 0;
        foreach ($rssocio["data"] as $rowsocio) {

            $fpdf->setFont("Arial", "B", 8);
            $fpdf->SetX(10);
            $fpdf->Cell(90, 5, "SOCIO", 1, 0, "L");
            $fpdf->Cell(20, 5, "DNI", 1, 0, "L");
            $fpdf->Cell(85, 5, "DIRECCION", 1, 1, "L");

            $fpdf->setFont("Arial", "", 8);

            $fpdf->Cell(90, 5, $rowsocio->apepater . " " . $rowsocio->apemater . " " . $rowsocio->nombre, 0, 0, "L");
            $fpdf->Cell(20, 5, $rowsocio->dni, 0, 0, "L");
            $fpdf->Cell(80, 5, $rowsocio->observacion, 0, 1, "L");

            $fpdf->SetX(15);
            $fpdf->setFont("Arial", "B", 8);
            $fpdf->Cell(10, 5, "ITEM", 1, 0, "L");
            $fpdf->Cell(130,5, "BENEFICIARIO", 1, 0, "L");
            $fpdf->Cell(20, 5, "DNI", 1, 0, "L");
            $fpdf->Cell(20, 5, "FECHA NACI.", 1, 0, "L");
            $fpdf->Cell(10, 5, "EDAD", 1, 1, "L");

            $fpdf->setFont("Arial", "", 8);
            $rsbeneficiario = $this->beneficiario->listaPorSocio($rowsocio->socioid);

            foreach ($rsbeneficiario["data"] as $rowbeneficiario) {
                $contador++;
                $fpdf->SetX(15);
                $fpdf->Cell(10, 4, $contador, 0, 0, "L");
                $fpdf->Cell(130,4,utf8_decode($rowbeneficiario->apepater . " " . $rowbeneficiario->apemater . " " . $rowbeneficiario->nombre), 0, 0, "L");
                $fpdf->Cell(20, 4, $rowbeneficiario->dni, 0, 0, "L");
                $fpdf->Cell(20,4,$rowbeneficiario->fechanaci,0,0,"L");
                $fpdf->Cell(10, 4, $rowbeneficiario->edad, 0, 1, "L");

            }
            $fpdf->Ln(5);
        }



        $fpdf->Output();
    }
    // Reporte de contraloria
    public function imprimirReporteContraloria() {

        $id   = $this->input->get("condicion");
        $rs   = $this->reportes->reporteContraloria($id);
        //$titulo = "PADRON DE SOCIOS POR CENTRALES Y COMITES - PROGRAMA DE ALIMENTACION Y VASO DE LECHE";

        $pdf = new FPDF("P", "mm", "A4");
        //$fpdf->SetMargins(30, 15 , 30);
       // $fpdf->SetAutoPageBreak(true, 1);
        $pdf->AddPage();
        $pdf->AliasNbPages();
        $pdf->SetMargins(5, 5, 5);
        $pdf->setFont("Arial", "B", 11);
        $pdf->Image('../../resources/images/logo.jpg',5,5,20,'JPG');
        $pdf->Ln(5);
        switch ($id) {
          case 1: $titulo = 'REPORTE DE MADRES GESTANTES'; break;
          case 2: $titulo = 'REPORTE DE MADRES LAPTANTES'; break;
          case 3: $titulo = 'REPORTE DE PACIENTES CON T.B.C.'; break;

        }
        $pdf->cell(0, 8, $titulo, 0, 1, "C");
        $pdf->Ln(2);
        $pdf->setFont("Arial", "B", 8);
        $pdf->cell(10,4,'Nro.',1,0,'C');
        $pdf->cell(25,4,'Central',1,0,'C');
        $pdf->cell(27,4,'Codigo Interno',1,0,'C');
        $pdf->cell(25,4,'Sector ',1,0,'C');
        $pdf->cell(60,4,'Beneficiario',1,0,'C');
        $pdf->cell(20,4,'Dni',1,0,'C');
        $pdf->cell(20,4,'Sexo',1,0,'C');
        $pdf->cell(10,4,'Edad',1,1,'C');
        $pdf->setFont("Arial", "", 7);
        $i = 0;

        foreach ($rs as $data) {
            $pdf->cell(10,4, $i++, 1, 0, "C");
            $pdf->cell(25,4, $data->central, 1, 0, "L");
            $pdf->cell(27,4,$data->codigointerno,1,0,'C');
            $pdf->cell(25,4,$data->sector,1,0,'C');
            $pdf->cell(60,4,$data->persona,1,0,'L');
            $pdf->cell(20,4,$data->dni,1,0,'C');
            $pdf->cell(20,4,$data->sex,1,0,'C');
            $pdf->cell(10,4,$data->edad,1,1,'C');
        }
          $pdf->Ln();
          $pdf->setFont("Arial", "B", 8);
          $pdf->cell(35,4,'Total Beneficiarios :',1,0,'L');
          $pdf->cell(27,4,$i,1,1,'C');

        $pdf->Output();
    }

}
