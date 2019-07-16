<?php

ini_set('max_execution_time', 300);
ini_set('memory_limit', '4010.55M');
/*if (!defined("BASEPATH"))
    exit("sin acesso directo..!");*/
require_once APPPATH . "/third_party/fpdf/fpdf.php";

class Reportegenerarrequerimiento extends CI_Controller {

    public function __construct() {
        parent::__construct();
        $this->load->model("Reportegenerarrequerimiento_model", "reportegenerarrequerimiento");
        $this->load->model("Central_model", "central");
        $this->load->model("Reportes_model", "reportes");
    }
    public function getNumeroSemana(){
        $data["semana"] = numero_semana();
        echo json_encode($data);
    }
    public function validarrequerimientosemanal(){
      $anio    = $this->input->post("anio");
      $mes     = $this->input->post("mes");
      $semana  = $this->input->post("semana");
      $data    = array($anio,$mes,$semana);
      $rs = $this->reportes->validarRequerimientoSemanal($data);
      echo json_encode($rs[0]);
    }
    public function guardarRequerimiento(){
          $anio    = $this->input->post("anio");
          $mes     = $this->input->post("mes");
          $semana  = $this->input->post("semana");
          $data    = array($anio,$mes,$semana);
          $rs = $this->reportes->guardarRequerimientoSemanalHistorico($data);
          echo json_encode($rs);
    }
    public function imprimirguia(){
         $centralid      = $this->input->get("id");
         $fechaentrega   = $this->input->get("fentrega");
         $nsemana   = $this->input->get("nsemana");
         
         $rscentral = $this->central->listaXId(array("centralid" => $centralid));

         $rs = $this->reportegenerarrequerimiento->generarRequerimiento(array("centralid" => $centralid));
         //$cordinadora=$rs["data"][0]->supervisor;
         //$cordinadora_dni=$rs["data"][0]->supervisordni;

         $primeraprioridad=0;
         $segundaprioridad=0;
         $totalbeneficiarios=0;
         $primeraprioridad=7;
         $segundaprioridad=3;
         $total06  = 0;
         $totalmg  = 0;
         $totalml  = 0;
         $totaldis = 0;
         $total713 = 0;
         $totaltbc = 0;
         $totalanc = 0;
         $direccioncentro='';
        
         $pdf = new FPDF("P", "mm", "A4");
         $pdf->SetAutoPageBreak(true, 70);
         $pdf->AliasNbPages();
         $pdf->SetMargins(10, 10, 10);
         $pdf->SetAutoPageBreak(true, 3); //7
         $i=1;
         $g=1;
         foreach ($rs["data"] as $row)
         {
            
            $total06  = $row->pptotalninos06;
            $totalmg  = $row->pptotalmg;
            $totalml  = $row->pptotalml;
            $totaldis = $row->pptotaldisca;
            $total713 = $row->sptotalninos713;
            $totaltbc = $row->sptotaltbc;
            $totalanc = $row->sptotalamayor;
            $cordinadora=$row->coordinador;
            $cordinadora_dni=$row->cordinadordni;
            $direccioncentro = $row->descripcion;

           /*
           [descripcion] => SECTOR 1 GRUPO 1
           [codigointerno] => 01AP002
           [pptotalninos06] => 26
           [pptotalmg] => 0
           [pptotalml] => 0
           [pptotaldisca] => 2
           [sptotalninos713] => 47
           [sptotaltbc] => 0
           [sptotalamayor] => 30
           [primeraprioridad] => 7
           [segundaprioridad] => 6
           [supervisor] => JEFERSON FARFAN
           [coordinador] => FIDELA POMA LUCIANO
           [direccion] =>
           [central] => CENTRAL 01
           [idcomite] => 1
           [cordinadordni] => 0000001
           [supervisordni] => AAA
           [numerosemana] => 16
           [pptotalleche] => 28
           [pptotalcereal] => 15
           [sptotalleche] => 77
           [sptotalcereal] => 36
           [totalleche] => 105
           [lechescaja] => 2
           [lecheunidad] => 9
           [totalcereal] => 51
           [cerealsaco] => 0
           [cerealunidad] => 51 )

            */
           //print_r($row);die();
        if($i==1){
           $pdf->AddPage();
           $y = $pdf->getY();
           $pdf->Image('../../resources/images/logo.jpg',$y + 15 ,5,20,'JPG');
           $pdf->setFont("Arial", "", 8);
           $pdf->Ln(10);
           $pdf->Multicell(50, 3, "Sub-Gerencia de Programas Sociales Programa de Vaso de Leche", 0, "C");
           
           $pdf->setXY(150,10);
           $pdf->Multicell(50, 4, "GUIA DE ENTREGA", 1, "C");
           $pdf->setXY(150,$pdf->getY());
           $pdf->Multicell(20, 4, utf8_decode("N° -"), 1, "C");
           $pdf->setXY(170,$pdf->getY() - 4);
           $pdf->Multicell(30, 4, str_pad($g++,5,'0',STR_PAD_LEFT), 1, "C");
           $pdf->Ln();
           $pdf->Cell(166,5,'SEMANA :',0,0,'R');
           $pdf->Cell(0,5,$nsemana,1,1,'C');
           $pdf->Cell(166,5,'FECHA ENTREGA :',0,0,'R');
           $pdf->Cell(0,5,$fechaentrega,1,1,'C');
           $pdf->Ln();
           $pdf->setFont("Arial", "", 8);
           $pdf->Cell(80,5,$rscentral["data"]["central"],1,0,'C');
           $pdf->Cell(57,5,'PERIODO DE ABASTECIMIENTO',1,0,'C');
           $pdf->Cell(0,5,'Nota',1,1,'C');
           $pdf->Cell(23,5,'Coor. General:',1,0,'C');
           $pdf->Cell(57,5,$cordinadora,1,0,'C');
           $pdf->Cell(57,5,
            utf8_decode('1°pri:  del   ').date('d/m/Y').'   al   '.
            date('d/m/Y'),
           1,1,'L');
           $pdf->Cell(23,5,'D.N.I.',1,0,'C');
           $pdf->Cell(57,5,$cordinadora_dni,1,0,'C');
           $pdf->Cell(57,5,
            utf8_decode('2°pri:  del   ').date('d/m/Y').'   al   '.
            date('d/m/Y'),
           1,1,'L');
           $pdf->Cell(100,5,'DATOS DEL BENEFICIARIO','LTB',0,'C');
           $pdf->Cell(0,5,utf8_decode('LEY N° 24059 - 27470 - 27712'),'RTB',1,'C');

           $pdf->Cell(78,5,'Primera Prioridad  '.$primeraprioridad .'  dias',1,0,'C');
           $pdf->Cell(80,5,'Segunda Prioridad  '.$segundaprioridad .'  dias',1,0,'C');
           $pdf->Cell(0,5,aplica_utf8('Total'),1,1,'C');
           $fila = $pdf->getY();
           $pdf->MultiCell(15,4,aplica_utf8('Niños-0 a 6años'),1,'C');
           $pdf->setXY(25,$fila);
           $pdf->MultiCell(15,4,aplica_utf8('Madres Gest.'),1,'C');
           $pdf->setXY(40,$fila);
           $pdf->MultiCell(15,4,aplica_utf8('Madres Lact.'),1,'C');
           $pdf->setXY(55,$fila);
           $pdf->MultiCell(15,4,aplica_utf8('Discapacidad'),1,'C');
           $pdf->setXY(70,$fila);
           $pdf->MultiCell(18,8,aplica_utf8('Sub. Total'),1,'C');

           $pdf->setXY(88,$fila);
           $pdf->MultiCell(18,4,aplica_utf8('Niños 7 a 13 años'),1,'C');
           $pdf->setXY(106,$fila);
           $pdf->MultiCell(20,8,aplica_utf8('TBC'),1,'C');
           $pdf->setXY(126,$fila);
           $pdf->MultiCell(20,4,aplica_utf8('Ancianos/Otros'),1,'C');
           $pdf->setXY(146,$fila);
           $pdf->MultiCell(22,8,aplica_utf8('Sub. Total'),1,'C');
           $pdf->setXY(168,$fila);
           $pdf->setFont("Arial", "B", 14);
           $pdf->MultiCell(0,15,
           //aplica_utf8('38800')
           $total06 + $totalmg + $totalml + $totaldis +$total713 + $totaltbc+ $totalanc
           ,1,'C');


           $pdf->setFont("Arial", "", 8);
           $fila = $pdf->getY();
           $pdf->setXY(10,$fila-7);
           $pdf->MultiCell(15,7,$total06,1,'C');
           $pdf->setXY(25,$fila - 7);
           $pdf->MultiCell(15,7,$totalmg,1,'C');
           $pdf->setXY(40,$fila - 7);
           $pdf->MultiCell(15,7,$totalml,1,'C');
           $pdf->setXY(55,$fila - 7);
           $pdf->MultiCell(15,7,$totaldis,1,'C');
           $pdf->setXY(70,$fila - 7);
           $pdf->MultiCell(18,7,$total06 + $totalmg + $totalml + $totaldis,1,'C');

           $pdf->setXY(88,$fila - 7);
           $pdf->MultiCell(18,7,$total713,1,'C');
           $pdf->setXY(106,$fila - 7);
           $pdf->MultiCell(20,7,$totaltbc,1,'C');
           $pdf->setXY(126,$fila - 7);
           $pdf->MultiCell(20,7,$totalanc,1,'C');
           $pdf->setXY(146,$fila - 7);
           $pdf->MultiCell(22,7,$total713 + $totaltbc+ $totalanc,1,'C');
           $pdf->Cell(78,5,'DIRECCION DEL CENTRO DE ACOPIO DE LA CENTRAL',1,0,'C');
           $pdf->Cell(80,5,'HOJUELA DE CEREALES ENRIQUECIDA AZUCARADA',1,0,'C');
           $pdf->Cell(0,5,'ENTREGA NETA',1,1,'C');

           $fila = $pdf->getY();
           $pdf->setXY(10,$fila);
           $pdf->MultiCell(78,5,$direccioncentro,1,'C');
           $pdf->setXY(88,$fila);
           $pdf->MultiCell(27,5,'SOLICITADO',1,'C');
           $pdf->setXY(115,$fila);
           $pdf->MultiCell(27,5,'RETENCION',1,'C');
           $pdf->setXY(142,$fila);
           $pdf->MultiCell(26,5,'DEVOLUCION',1,'C');

           $pdf->setXY(168,$fila);
           $pdf->setFont('Arial','B',8);
           $pdf->MultiCell(15,5,'Saco80',1,'C');
           $pdf->setXY(183,$fila);
           $pdf->MultiCell(0,5,'Bolsa500g',1,'C');

           $pdf->setFont('Arial','',9);
           $fila = $pdf->getY();
           $pdf->setXY(88,$fila);
           $pdf->MultiCell(27,8,$row->totalcereal,1,'C');
           $pdf->setXY(115,$fila);
           $pdf->MultiCell(27,8,0,1,'C');
           $pdf->setXY(142,$fila);
           $pdf->MultiCell(26,8,0,1,'C');
           $pdf->setXY(168,$fila);
           $pdf->MultiCell(15,8,$row->cerealsaco  ,1,'C');
           $pdf->setXY(183,$fila);
           $pdf->MultiCell(0,8,$row->cerealunidad,1,'C'); 

           $pdf->Ln(15);
           $pdf->cell(65,4,'__________________________',0,0,'C');
           $pdf->cell(70,4,'__________________________',0,0,'C');
           $pdf->cell(0 ,4,'__________________________',0,1,'C');

           $pdf->cell(65,4,'JefeProg. Vaso de leche',0,0,'C');
           $pdf->cell(70,4,'Resp. Recojo',0,0,'C');
           $pdf->cell(0 ,4,'Resp. Entrega',0,1,'C');
           $pdf->Ln();
            $i = 2;
        }else{ 
           //********* Corte
            
           $pdf->Image('../../resources/images/logo.jpg',23 ,130,20,'JPG');
           $pdf->setFont("Arial", "", 8);
           $pdf->Ln(22);
           $pdf->Multicell(50, 3, "Sub-Gerencia de Programas Sociales Programa de Vaso de Leche", 0, "C");
           
           $pdf->setXY(150,140);
           $pdf->Multicell(50, 4, "GUIA DE ENTREGA", 1, "C");
           $pdf->setXY(150,$pdf->getY());
           $pdf->Multicell(20, 4, utf8_decode("N° -"), 1, "C");
           $pdf->setXY(170,$pdf->getY() - 4);
           $pdf->Multicell(30, 4, str_pad($g++,5,'0',STR_PAD_LEFT), 1, "C");
           $pdf->Ln();
           $pdf->Cell(166,5,'SEMANA :',0,0,'R');
           $pdf->Cell(0,5,$nsemana,1,1,'C');
           $pdf->Cell(166,5,'FECHA ENTREGA :',0,0,'R');
           $pdf->Cell(0,5,$fechaentrega,1,1,'C');
           $pdf->Ln();
           $pdf->setFont("Arial", "", 8);
           $pdf->Cell(80,5,$rscentral["data"]["central"],1,0,'C');
           $pdf->Cell(57,5,'PERIODO DE ABASTECIMIENTO',1,0,'C');
           $pdf->Cell(0,5,'Nota',1,1,'C');
           $pdf->Cell(23,5,'Coor. General:',1,0,'C');
           $pdf->Cell(57,5,$cordinadora,1,0,'C');
           $pdf->Cell(57,5,
            utf8_decode('1°pri:  del   ').date('d/m/Y').'   al   '.
            date('d/m/Y'),
           1,1,'L');
           $pdf->Cell(23,5,'D.N.I.',1,0,'C');
           $pdf->Cell(57,5,$cordinadora_dni,1,0,'C');
           $pdf->Cell(57,5,
            utf8_decode('2°pri:  del   ').date('d/m/Y').'   al   '.
            date('d/m/Y'),
           1,1,'L');
           $pdf->Cell(100,5,'DATOS DEL BENEFICIARIO','LTB',0,'C');
           $pdf->Cell(0,5,utf8_decode('LEY N° 24059 - 27470 - 27712'),'RTB',1,'C');

           $pdf->Cell(78,5,'Primera Prioridad  '.$primeraprioridad .'  dias',1,0,'C');
           $pdf->Cell(80,5,'Segunda Prioridad  '.$segundaprioridad .'  dias',1,0,'C');
           $pdf->Cell(0,5,aplica_utf8('Total'),1,1,'C');
           $fila = $pdf->getY();
           $pdf->MultiCell(15,4,aplica_utf8('Niños-0 a 6años'),1,'C');
           $pdf->setXY(25,$fila);
           $pdf->MultiCell(15,4,aplica_utf8('Madres Gest.'),1,'C');
           $pdf->setXY(40,$fila);
           $pdf->MultiCell(15,4,aplica_utf8('Madres Lact.'),1,'C');
           $pdf->setXY(55,$fila);
           $pdf->MultiCell(15,4,aplica_utf8('Discapacidad'),1,'C');
           $pdf->setXY(70,$fila);
           $pdf->MultiCell(18,8,aplica_utf8('Sub. Total'),1,'C');

           $pdf->setXY(88,$fila);
           $pdf->MultiCell(18,4,aplica_utf8('Niños 7 a 13 años'),1,'C');
           $pdf->setXY(106,$fila);
           $pdf->MultiCell(20,8,aplica_utf8('TBC'),1,'C');
           $pdf->setXY(126,$fila);
           $pdf->MultiCell(20,4,aplica_utf8('Ancianos/Otros'),1,'C');
           $pdf->setXY(146,$fila);
           $pdf->MultiCell(22,8,aplica_utf8('Sub. Total'),1,'C');
           $pdf->setXY(168,$fila);
           $pdf->setFont("Arial", "B", 14);
           $pdf->MultiCell(0,15,aplica_utf8('38800'),1,'C');


           $pdf->setFont("Arial", "", 8);
           $fila = $pdf->getY();
           $pdf->setXY(10,$fila-7);
           $pdf->MultiCell(15,7,$total06,1,'C');
           $pdf->setXY(25,$fila - 7);
           $pdf->MultiCell(15,7,$totalmg,1,'C');
           $pdf->setXY(40,$fila - 7);
           $pdf->MultiCell(15,7,$totalml,1,'C');
           $pdf->setXY(55,$fila - 7);
           $pdf->MultiCell(15,7,$totaldis,1,'C');
           $pdf->setXY(70,$fila - 7);
           $pdf->MultiCell(18,7,$total06 + $totalmg + $totalml + $totaldis,1,'C');

           $pdf->setXY(88,$fila - 7);
           $pdf->MultiCell(18,7,$total713,1,'C');
           $pdf->setXY(106,$fila - 7);
           $pdf->MultiCell(20,7,$totaltbc,1,'C');
           $pdf->setXY(126,$fila - 7);
           $pdf->MultiCell(20,7,$totalanc,1,'C');
           $pdf->setXY(146,$fila - 7);
           $pdf->MultiCell(22,7,$total713 + $totaltbc+ $totalanc,1,'C');
           $pdf->Cell(78,5,'DIRECCION DEL CENTRO DE ACOPIO DE LA CENTRAL',1,0,'C');
           $pdf->Cell(80,5,'HOJUELA DE CEREALES ENRIQUECIDA AZUCARADA',1,0,'C');
           $pdf->Cell(0,5,'ENTREGA NETA',1,1,'C');

           $fila = $pdf->getY();
           $pdf->setXY(10,$fila);
           $pdf->MultiCell(78,5,$direccioncentro,1,'C');
           $pdf->setXY(88,$fila);
           $pdf->MultiCell(27,5,'SOLICITADO',1,'C');
           $pdf->setXY(115,$fila);
           $pdf->MultiCell(27,5,'RETENCION',1,'C');
           $pdf->setXY(142,$fila);
           $pdf->MultiCell(26,5,'DEVOLUCION',1,'C');

           $pdf->setXY(168,$fila);
           $pdf->setFont('Arial','B',8);
           $pdf->MultiCell(15,5,'Saco80',1,'C');
           $pdf->setXY(183,$fila);
           $pdf->MultiCell(0,5,'Bolsa500g',1,'C');

           $pdf->setFont('Arial','',9);
           $fila = $pdf->getY();
           $pdf->setXY(88,$fila);
           $pdf->MultiCell(27,8,100,1,'C');
           $pdf->setXY(115,$fila);
           $pdf->MultiCell(27,8,100,1,'C');
           $pdf->setXY(142,$fila);
           $pdf->MultiCell(26,8,100,1,'C');
           $pdf->setXY(168,$fila);
           $pdf->MultiCell(15,8,500,1,'C');
           $pdf->setXY(183,$fila);
           $pdf->MultiCell(0,8,500,1,'C');

           $pdf->Ln(15);
           $pdf->cell(65,4,'__________________________',0,0,'C');
           $pdf->cell(70,4,'__________________________',0,0,'C');
           $pdf->cell(0 ,4,'__________________________',0,1,'C');

           $pdf->cell(65,4,'JefeProg. Vaso de leche',0,0,'C');
           $pdf->cell(70,4,'Resp. Recojo',0,0,'C');
           $pdf->cell(0 ,4,'Resp. Entrega',0,1,'C');
           $pdf->Ln();
           $i =1 ;
          }
          
        }


         $pdf->Output();


    }
    public function imprimirguialeche(){
        $centralid      = $this->input->get("id");
        $fechaentrega   = $this->input->get("fentrega");
        $nsemana        = $this->input->get("nsemana");
    
        $rscentral = $this->central->listaXId(array("centralid" => $centralid));

        $rs = $this->reportegenerarrequerimiento->generarRequerimiento(array("centralid" => $centralid));
        //$cordinadora=$rs["data"][0]->supervisor;
        //$cordinadora_dni=$rs["data"][0]->supervisordni;

        $primeraprioridad=0;
        $segundaprioridad=0;
        $totalbeneficiarios=0;
        $primeraprioridad=7;
        $segundaprioridad=3;
        $total06  = 0;
        $totalmg  = 0;
        $totalml  = 0;
        $totaldis = 0;
        $total713 = 0;
        $totaltbc = 0;
        $totalanc = 0;
        $direccioncentro='';
       
        $pdf = new FPDF("P", "mm", "A4");
        $pdf->SetAutoPageBreak(true, 70);
        $pdf->AliasNbPages();
        $pdf->SetMargins(10, 10, 10);
        $pdf->SetAutoPageBreak(true, 3); //7
        $i=1;
        $g=1;
        foreach ($rs["data"] as $row)
        {
           
           $total06  = $row->pptotalninos06;
           $totalmg  = $row->pptotalmg;
           $totalml  = $row->pptotalml;
           $totaldis = $row->pptotaldisca;
           $total713 = $row->sptotalninos713;
           $totaltbc = $row->sptotaltbc;
           $totalanc = $row->sptotalamayor;
           $cordinadora=$row->coordinador;
           $cordinadora_dni=$row->cordinadordni;
           $direccioncentro = $row->descripcion;

          /*
          [descripcion] => SECTOR 1 GRUPO 1
          [codigointerno] => 01AP002
          [pptotalninos06] => 26
          [pptotalmg] => 0
          [pptotalml] => 0
          [pptotaldisca] => 2
          [sptotalninos713] => 47
          [sptotaltbc] => 0
          [sptotalamayor] => 30
          [primeraprioridad] => 7
          [segundaprioridad] => 6
          [supervisor] => JEFERSON FARFAN
          [coordinador] => FIDELA POMA LUCIANO
          [direccion] =>
          [central] => CENTRAL 01
          [idcomite] => 1
          [cordinadordni] => 0000001
          [supervisordni] => AAA
          [numerosemana] => 16
          [pptotalleche] => 28
          [pptotalcereal] => 15
          [sptotalleche] => 77
          [sptotalcereal] => 36
          [totalleche] => 105
          [lechescaja] => 2
          [lecheunidad] => 9
          [totalcereal] => 51
          [cerealsaco] => 0
          [cerealunidad] => 51 )

           */
          //print_r($row);die();
       if($i==1){
          $pdf->AddPage();
          $y = $pdf->getY();
          $pdf->Image('../../resources/images/logo.jpg',$y + 15 ,5,20,'JPG');
          $pdf->setFont("Arial", "", 8);
          $pdf->Ln(10);
          $pdf->Multicell(50, 3, "Sub-Gerencia de Programas Sociales Programa de Vaso de Leche", 0, "C");
          
          $pdf->setXY(150,10);
          $pdf->Multicell(50, 4, "GUIA DE ENTREGA", 1, "C");
          $pdf->setXY(150,$pdf->getY());
          $pdf->Multicell(20, 4, utf8_decode("N° -"), 1, "C");
          $pdf->setXY(170,$pdf->getY() - 4);
          $pdf->Multicell(30, 4, str_pad($g++,5,'0',STR_PAD_LEFT), 1, "C");
          $pdf->Ln();
          $pdf->Cell(166,5,'SEMANA :',0,0,'R');
          $pdf->Cell(0,5,$nsemana,1,1,'C');
          $pdf->Cell(166,5,'FECHA ENTREGA :',0,0,'R');
          $pdf->Cell(0,5,$fechaentrega,1,1,'C');
          $pdf->Ln();
          $pdf->setFont("Arial", "", 8);
          $pdf->Cell(80,5,$rscentral["data"]["central"],1,0,'C');
          $pdf->Cell(57,5,'PERIODO DE ABASTECIMIENTO',1,0,'C');
          $pdf->Cell(0,5,'Nota',1,1,'C');
          $pdf->Cell(23,5,'Coor. General:',1,0,'C');
          $pdf->Cell(57,5,$cordinadora,1,0,'C');
          $pdf->Cell(57,5,
           utf8_decode('1°pri:  del   ').date('d/m/Y').'   al   '.
           date('d/m/Y'),
          1,1,'L');
          $pdf->Cell(23,5,'D.N.I.',1,0,'C');
          $pdf->Cell(57,5,$cordinadora_dni,1,0,'C');
          $pdf->Cell(57,5,
           utf8_decode('2°pri:  del   ').date('d/m/Y').'   al   '.
           date('d/m/Y'),
          1,1,'L');
          $pdf->Cell(100,5,'DATOS DEL BENEFICIARIO','LTB',0,'C');
          $pdf->Cell(0,5,utf8_decode('LEY N° 24059 - 27470 - 27712'),'RTB',1,'C');

          $pdf->Cell(78,5,'Primera Prioridad  '.$primeraprioridad .'  dias',1,0,'C');
          $pdf->Cell(80,5,'Segunda Prioridad  '.$segundaprioridad .'  dias',1,0,'C');
          $pdf->Cell(0,5,aplica_utf8('Total'),1,1,'C');
          $fila = $pdf->getY();
          $pdf->MultiCell(15,4,aplica_utf8('Niños-0 a 6años'),1,'C');
          $pdf->setXY(25,$fila);
          $pdf->MultiCell(15,4,aplica_utf8('Madres Gest.'),1,'C');
          $pdf->setXY(40,$fila);
          $pdf->MultiCell(15,4,aplica_utf8('Madres Lact.'),1,'C');
          $pdf->setXY(55,$fila);
          $pdf->MultiCell(15,4,aplica_utf8('Discapacidad'),1,'C');
          $pdf->setXY(70,$fila);
          $pdf->MultiCell(18,8,aplica_utf8('Sub. Total'),1,'C');

          $pdf->setXY(88,$fila);
          $pdf->MultiCell(18,4,aplica_utf8('Niños 7 a 13 años'),1,'C');
          $pdf->setXY(106,$fila);
          $pdf->MultiCell(20,8,aplica_utf8('TBC'),1,'C');
          $pdf->setXY(126,$fila);
          $pdf->MultiCell(20,4,aplica_utf8('Ancianos/Otros'),1,'C');
          $pdf->setXY(146,$fila);
          $pdf->MultiCell(22,8,aplica_utf8('Sub. Total'),1,'C');
          $pdf->setXY(168,$fila);
          $pdf->setFont("Arial", "B", 14);
          $pdf->MultiCell(0,15,
          //aplica_utf8('38800')
          $total06 + $totalmg + $totalml + $totaldis +$total713 + $totaltbc+ $totalanc
          ,1,'C');


          $pdf->setFont("Arial", "", 8);
          $fila = $pdf->getY();
          $pdf->setXY(10,$fila-7);
          $pdf->MultiCell(15,7,$total06,1,'C');
          $pdf->setXY(25,$fila - 7);
          $pdf->MultiCell(15,7,$totalmg,1,'C');
          $pdf->setXY(40,$fila - 7);
          $pdf->MultiCell(15,7,$totalml,1,'C');
          $pdf->setXY(55,$fila - 7);
          $pdf->MultiCell(15,7,$totaldis,1,'C');
          $pdf->setXY(70,$fila - 7);
          $pdf->MultiCell(18,7,$total06 + $totalmg + $totalml + $totaldis,1,'C');

          $pdf->setXY(88,$fila - 7);
          $pdf->MultiCell(18,7,$total713,1,'C');
          $pdf->setXY(106,$fila - 7);
          $pdf->MultiCell(20,7,$totaltbc,1,'C');
          $pdf->setXY(126,$fila - 7);
          $pdf->MultiCell(20,7,$totalanc,1,'C');
          $pdf->setXY(146,$fila - 7);
          $pdf->MultiCell(22,7,$total713 + $totaltbc+ $totalanc,1,'C');
          $pdf->Cell(78,5,'LECHE EVAPORADA ENTREGA',1,0,'C');
          $pdf->Cell(30,5,'ENTREGA NETA',1,0,'C');
          $pdf->Cell(0,5,'DIRECCION DEL CENTRO DE ACOPIO DE LA CENTRAL',1,1,'C');

          $fila = $pdf->getY();
          $pdf->setXY(10,$fila);
          $pdf->MultiCell(27,5,'SOLICITADO',1,'C');
          $pdf->setXY(37,$fila);
          $pdf->MultiCell(25,5,'RETENCION',1,'C');
          $pdf->setXY(62,$fila);
          $pdf->MultiCell(26,5,'DEVOLUCION',1,'C');

          $pdf->setXY(88,$fila);
          $pdf->setFont('Arial','B',8);
          $pdf->MultiCell(14,5,'Caja/48',1,'C');
          $pdf->setXY(102,$fila);
          $pdf->MultiCell(16,5,'Lata/410g',0,'C');
          $pdf->setFont('Arial','',8);
          $pdf->setXY(118,$fila);
          $pdf->MultiCell(0,5,$direccioncentro,1,'C');

          $pdf->setFont('Arial','',9);
          $fila = $pdf->getY();
          $pdf->setXY(10,$fila);
          $pdf->MultiCell(27,8,$row->totalleche,1,'C');
          $pdf->setXY(37,$fila);
          $pdf->MultiCell(25,8,0,1,'C');
          $pdf->setXY(62,$fila);
          $pdf->MultiCell(26,8,0,1,'C');
          $pdf->setXY(88,$fila);
          $pdf->MultiCell(14,8,$row->lechescaja  ,1,'C');
          $pdf->setXY(102,$fila);
          $pdf->MultiCell(16,8,$row->lecheunidad,1,'C'); 
          $pdf->setXY(118,$fila);
          $pdf->MultiCell(0,8,'',1,'C'); 

          $pdf->Ln(15);
          $pdf->cell(65,4,'__________________________',0,0,'C');
          $pdf->cell(70,4,'__________________________',0,0,'C');
          $pdf->cell(0 ,4,'__________________________',0,1,'C');

          $pdf->cell(65,4,'JefeProg. Vaso de leche',0,0,'C');
          $pdf->cell(70,4,'Resp. Recojo',0,0,'C');
          $pdf->cell(0 ,4,'Resp. Entrega',0,1,'C');
          $pdf->Ln();
           $i = 2;
       }else{ 
          //********* Corte
           
          $pdf->Image('../../resources/images/logo.jpg',23 ,130,20,'JPG');
          $pdf->setFont("Arial", "", 8);
          $pdf->Ln(22);
          $pdf->Multicell(50, 3, "Sub-Gerencia de Programas Sociales Programa de Vaso de Leche", 0, "C");
          
          $pdf->setXY(150,140);
          $pdf->Multicell(50, 4, "GUIA DE ENTREGA", 1, "C");
          $pdf->setXY(150,$pdf->getY());
          $pdf->Multicell(20, 4, utf8_decode("N° -"), 1, "C");
          $pdf->setXY(170,$pdf->getY() - 4);
          $pdf->Multicell(30, 4, str_pad($g++,5,'0',STR_PAD_LEFT), 1, "C");
          $pdf->Ln();
          $pdf->Cell(166,5,'SEMANA :',0,0,'R');
          $pdf->Cell(0,5,$nsemana,1,1,'C');
          $pdf->Cell(166,5,'FECHA ENTREGA :',0,0,'R');
          $pdf->Cell(0,5,$fechaentrega,1,1,'C');
          $pdf->Ln();
          $pdf->setFont("Arial", "", 8);
          $pdf->Cell(80,5,$rscentral["data"]["central"],1,0,'C');
          $pdf->Cell(57,5,'PERIODO DE ABASTECIMIENTO',1,0,'C');
          $pdf->Cell(0,5,'Nota',1,1,'C');
          $pdf->Cell(23,5,'Coor. General:',1,0,'C');
          $pdf->Cell(57,5,$cordinadora,1,0,'C');
          $pdf->Cell(57,5,
           utf8_decode('1°pri:  del   ').date('d/m/Y').'   al   '.
           date('d/m/Y'),
          1,1,'L');
          $pdf->Cell(23,5,'D.N.I.',1,0,'C');
          $pdf->Cell(57,5,$cordinadora_dni,1,0,'C');
          $pdf->Cell(57,5,
           utf8_decode('2°pri:  del   ').date('d/m/Y').'   al   '.
           date('d/m/Y'),
          1,1,'L');
          $pdf->Cell(100,5,'DATOS DEL BENEFICIARIO','LTB',0,'C');
          $pdf->Cell(0,5,utf8_decode('LEY N° 24059 - 27470 - 27712'),'RTB',1,'C');

          $pdf->Cell(78,5,'Primera Prioridad  '.$primeraprioridad .'  dias',1,0,'C');
          $pdf->Cell(80,5,'Segunda Prioridad  '.$segundaprioridad .'  dias',1,0,'C');
          $pdf->Cell(0,5,aplica_utf8('Total'),1,1,'C');
          $fila = $pdf->getY();
          $pdf->MultiCell(15,4,aplica_utf8('Niños-0 a 6años'),1,'C');
          $pdf->setXY(25,$fila);
          $pdf->MultiCell(15,4,aplica_utf8('Madres Gest.'),1,'C');
          $pdf->setXY(40,$fila);
          $pdf->MultiCell(15,4,aplica_utf8('Madres Lact.'),1,'C');
          $pdf->setXY(55,$fila);
          $pdf->MultiCell(15,4,aplica_utf8('Discapacidad'),1,'C');
          $pdf->setXY(70,$fila);
          $pdf->MultiCell(18,8,aplica_utf8('Sub. Total'),1,'C');

          $pdf->setXY(88,$fila);
          $pdf->MultiCell(18,4,aplica_utf8('Niños 7 a 13 años'),1,'C');
          $pdf->setXY(106,$fila);
          $pdf->MultiCell(20,8,aplica_utf8('TBC'),1,'C');
          $pdf->setXY(126,$fila);
          $pdf->MultiCell(20,4,aplica_utf8('Ancianos/Otros'),1,'C');
          $pdf->setXY(146,$fila);
          $pdf->MultiCell(22,8,aplica_utf8('Sub. Total'),1,'C');
          $pdf->setXY(168,$fila);
          $pdf->setFont("Arial", "B", 14);
          $pdf->MultiCell(0,15,aplica_utf8('38800'),1,'C');


          $pdf->setFont("Arial", "", 8);
          $fila = $pdf->getY();
          $pdf->setXY(10,$fila-7);
          $pdf->MultiCell(15,7,$total06,1,'C');
          $pdf->setXY(25,$fila - 7);
          $pdf->MultiCell(15,7,$totalmg,1,'C');
          $pdf->setXY(40,$fila - 7);
          $pdf->MultiCell(15,7,$totalml,1,'C');
          $pdf->setXY(55,$fila - 7);
          $pdf->MultiCell(15,7,$totaldis,1,'C');
          $pdf->setXY(70,$fila - 7);
          $pdf->MultiCell(18,7,$total06 + $totalmg + $totalml + $totaldis,1,'C');

          $pdf->setXY(88,$fila - 7);
          $pdf->MultiCell(18,7,$total713,1,'C');
          $pdf->setXY(106,$fila - 7);
          $pdf->MultiCell(20,7,$totaltbc,1,'C');
          $pdf->setXY(126,$fila - 7);
          $pdf->MultiCell(20,7,$totalanc,1,'C');
          $pdf->setXY(146,$fila - 7);
          $pdf->MultiCell(22,7,$total713 + $totaltbc+ $totalanc,1,'C');

          $pdf->Cell(78,5,'LECHE EVAPORADA ENTREGA',1,0,'C');
          $pdf->Cell(30,5,'ENTREGA NETA',1,0,'C');
          $pdf->Cell(0,5,'DIRECCION DEL CENTRO DE ACOPIO DE LA CENTRAL',1,1,'C');

          $fila = $pdf->getY();
          $pdf->setXY(10,$fila);
          $pdf->MultiCell(27,5,'SOLICITADO',1,'C');
          $pdf->setXY(37,$fila);
          $pdf->MultiCell(25,5,'RETENCION',1,'C');
          $pdf->setXY(62,$fila);
          $pdf->MultiCell(26,5,'DEVOLUCION',1,'C');

          $pdf->setXY(88,$fila);
          $pdf->setFont('Arial','B',8);
          $pdf->MultiCell(14,5,'Caja/48',1,'C');
          $pdf->setXY(102,$fila);
          $pdf->MultiCell(16,5,'Lata/410g',0,'C');
          $pdf->setFont('Arial','',8);
          $pdf->setXY(118,$fila);
          $pdf->MultiCell(0,5,$direccioncentro,1,'C');

          $pdf->setFont('Arial','',9);
          $fila = $pdf->getY();
          $pdf->setXY(10,$fila);
          $pdf->MultiCell(27,8,$row->totalleche,1,'C');
          $pdf->setXY(37,$fila);
          $pdf->MultiCell(25,8,0,1,'C');
          $pdf->setXY(62,$fila);
          $pdf->MultiCell(26,8,0,1,'C');
          $pdf->setXY(88,$fila);
          $pdf->MultiCell(14,8,$row->lechescaja  ,1,'C');
          $pdf->setXY(102,$fila);
          $pdf->MultiCell(16,8,$row->lecheunidad,1,'C'); 
          $pdf->setXY(118,$fila);
          $pdf->MultiCell(0,8,'',1,'C'); 

          $pdf->Ln(15);
          $pdf->cell(65,4,'__________________________',0,0,'C');
          $pdf->cell(70,4,'__________________________',0,0,'C');
          $pdf->cell(0 ,4,'__________________________',0,1,'C');

          $pdf->cell(65,4,'JefeProg. Vaso de leche',0,0,'C');
          $pdf->cell(70,4,'Resp. Recojo',0,0,'C');
          $pdf->cell(0 ,4,'Resp. Entrega',0,1,'C');
          $pdf->Ln();
          $i =1 ;
         }
         
       }


        $pdf->Output();


   }
    public function imprimir()
    {

        $centralid = $this->input->get("id");
        $rscentral = $this->central->listaXId(array("centralid" => $centralid));
        $rs = $this->reportegenerarrequerimiento->generarRequerimiento(array("centralid" => $centralid));
        $cordinadora=$rs["data"][0]->supervisor;
        $cordinadora_dni=$rs["data"][0]->dn+
        
        
        
        
        
        
        
        
        
        
        
        +
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        isuper;
        $fpdf = new FPDF("L", "mm", "A4");
        $fpdf->SetAutoPageBreak(true, 70);
        $fpdf->AddPage();
        $fpdf->AliasNbPages();
        $fpdf->SetMargins(4, 5, 4);
        $fpdf->SetAutoPageBreak(true, 16); //7
        $fpdf->setFont("Arial", "B", 10.5);
        $fpdf->Image('../../resources/images/logo.jpg',5,5,20,'JPG');
        $fpdf->cell(177, 5, "FORMATO UNICO DE DISTRIBUCION", 0, 0, "C");
        $fpdf->setFont("Arial", "B", 7);
        $fpdf->cell(52, 2.5, "CORDINADORA DE CENTRAL", 1, 0, "C");
        $fpdf->cell(20, 2.5, "DNI", 1, 0, "C");
        $fpdf->cell(0, 2.5, "FIRMA", 1, 1, "C");
        $fpdf->setFont("Arial", "B", 10.5);
        $fpdf->cell(183, 10, "DEL RECURSO ALIMENTICIO", 0, 0, "C");
        $fpdf->setFont("Arial", "", 6);
        $fpdf->cell(52, 4, $cordinadora, 1, 0, "C");
        $fpdf->cell(20, 4, $cordinadora_dni, 1, 0, "C");
        $fpdf->cell(0, 4, '', 1, 1, "C");

        /*$fpdf->ln();
        $fpdf->setFont("Arial", "B", 7);
        $fpdf->cell(50, 7, 'aa', 0, 1, "L", FALSE);*/
        $fpdf->ln(5);

         $item = 0;

         $grupo      = $rs["data"][0]->descripcion;
         $primera_prioridad=$rs["data"][0]->primeraprioridad;
         $segunda_prioridad=$rs["data"][0]->segundaprioridad;
         $tottal0_6 = 0;
         $tottalmges = 0;
         $tottalmlac = 0;
         $tottaldisca = 0;
         $totalgrupo1 = 0;
         $totallechegrupo1 = 0;
         $totalhojuelagrupo1 = 0;

         $total7_13 = 0;
         $totaltbc = 0;
         $totalancianos = 0;
         $totalgrupo2 = 0;
         $totallechegrupo2 = 0;
         $totalhojuelagrupo2 = 0;


         $totalbene = 0;
         $totalleche = 0;
         $totalcajaleche = 0;
         $totalunidadleche = 0;
         $totalcereal = 0;
         $totalsacoscereal = 0;
         $totalunidadcereal = 0;

         /* Totales generales */
          $gtottal0_6   = 0;
          $gtottalmges  = 0;
          $gtottalmlac  = 0;
          $gtottaldisca = 0;
          $gtotalgrupo1 = 0;
          $gtotallechegrupo1 = 0;
          $gtotalhojuelagrupo1 = 0;

          $gtotal7_13          = 0;
          $gtotaltbc           = 0;
          $gtotalancianos      = 0;
          $gtotalgrupo2        = 0;
          $gtotallechegrupo2   = 0;
          $gtotalhojuelagrupo2 = 0;

          $gtotalbene          = 0;
          $gtotalleche         = 0;
          $gtotalcajaleche     = 0;
          $gtotalunidadleche   = 0;

          $gtotalcereal        = 0;
          $gtotalsacoscereal   = 0;
          $gtotalunidadcereal  = 0;


       // print_r($rs['data']);die();

        foreach ($rs["data"] as $row)
        {
          if($item == 0)
          {
            $fpdf->setFont("Arial", "", 7);
            $fpdf->cell(80,4,$row->descripcion, 'B', 0, "L", FALSE);
            $fpdf->cell(0,4, $row->central, 0, 1, "R", FALSE);
            $fpdf->setFont("Arial", "", 5);
            $fpdf->cell(14,4, ' ', 'L', 0, "C", FALSE);
            $fpdf->cell(15,4, ' ', 'L', 0, "C", FALSE);
            $fpdf->cell(63,4, 'PRIMERA PRIORIDAD - DIAS DE ATENCION  : '. $primera_prioridad, 1, 0, "C", FALSE);
            $fpdf->cell(54, 4, 'SEGUNDA PRIORIDAD - DIAS DE ATENCION  : '. $segunda_prioridad, 1, 0, "C", FALSE);
            $fpdf->cell(67.5, 4, 'TOTAL GENERAL', 1, 0, "C", FALSE);
            $fpdf->cell(50, 4, '', 1, 0, "", FALSE);
            $fpdf->cell(24, 4, '', 'LRT', 1, "C", FALSE);
            $fpdf->setFont("Arial", "", 5);
            $fpdf->cell(14,4, 'Codigo Sistema', 'L', 0, "C");
            $fpdf->cell(15,4, 'Nombre Comite', 'L', 0, "C");
            $fpdf->setFont("Arial", "B", 5);
            $fpdf->cell(45, 4, 'BENEFICIARIOS', 1, 0, "C", FALSE);
            $fpdf->cell(18, 4, 'INSUMOS', 1, 0, "C", FALSE);
            $fpdf->cell(36, 4, 'BENEFICIARIOS', 1, 0, "C", FALSE);
            $fpdf->cell(18, 4, 'INSUMOS', 1, 0, "C", FALSE);
            $fpdf->cell(11, 4, 'TOTAL', 1, 0, "C", FALSE);
            $fpdf->cell(27.5, 4, 'Leche Evaporada', 1, 0, "C", FALSE);
            $fpdf->cell(29, 4, 'Hojuela Cereal Enrq. Azur', 1, 0, "C", FALSE);
            $fpdf->cell(35, 4, 'Coordinadora Resp.', 1, 0, "C", FALSE);
            $fpdf->cell(15, 4, 'DNI', 1, 0, "C", FALSE);
            $fpdf->cell(24, 4, 'Firma', 'LR', 1, "C", FALSE);

            $fpdf->cell(14,5, ' ', 'BL', 0,'C', FALSE);
            $fpdf->cell(15,5, ' ', 'BL', 0, "C", FALSE);
            $fpdf->cell(9, 5,  utf8_decode('0-6 años'), 1, 0, "C", FALSE);
            $fpdf->cell(9, 5, 'M-Gest', 1, 0, "C", FALSE);
            $fpdf->cell(9, 5, 'M-LACT', 1, 0, "C", FALSE);
            $fpdf->cell(9, 5, 'Discap.', 1, 0, "C", FALSE);
            $fpdf->cell(9, 5, 'TOTAL', 1, 0, "C", FALSE);
            $fpdf->cell(9, 5, 'LecheUni', 1, 0, "C", FALSE);
            $fpdf->cell(9, 5, 'Hojuela', 1, 0, "C", FALSE);
            $fpdf->cell(9, 5, utf8_decode('7-13 años'), 1, 0, "C", FALSE);
            $fpdf->cell(9, 5, 'Tbc', 1, 0, "C", FALSE);
            $fpdf->cell(9, 5, 'Ancianos', 1, 0, "C", FALSE);
            $fpdf->cell(9, 5, 'TOTAL', 1, 0, "C", FALSE);
            $fpdf->cell(9, 5, 'LecheUni', 1, 0, "C", FALSE);
            $fpdf->cell(9, 5, 'Hojuela', 1, 0, "C", FALSE);
            $fpdf->cell(11, 5, 'Beneficarios', 1, 0, "C", FALSE);
            $fpdf->cell(9.5, 5, 'Tot. leche', 1, 0, "C", FALSE);
            $fpdf->cell(9, 5, 'Cajas/47', 1, 0, "C", FALSE);
            $fpdf->cell(9, 5, 'Und/Lata', 1, 0, "C", FALSE);
            $fpdf->cell(11, 5, 'Tot. Hojuela', 1, 0, "C", FALSE);
            $fpdf->cell(9, 5, 'Sacos/70', 1, 0, "C", FALSE);
            $fpdf->cell(9, 5, 'Und/Bolsa', 1, 0, "C", FALSE);
            $fpdf->cell(50, 5, ' ', 'LR', 0, "C", FALSE);
            $fpdf->cell(24, 5, ' ', 'LR', 1, "C", FALSE);
            $item = 1;

          } //FIN PRIMER IF

          if($grupo !=$row->descripcion)
          {
              // SUMATORIA DE GRUPOS

              $fpdf->setFont("Arial", "", 8);
              $fpdf->cell(14,4, ' ', 1, 0, "C", FALSE);
              $fpdf->cell(15,4, ' ', 1, 0, "C", FALSE);
              $fpdf->cell(9,4,    $tottal0_6, 1, 0, "C", FALSE);
              $fpdf->cell(9, 4, $tottalmges, 1, 0, "C", FALSE);
              $fpdf->cell(9 , 4, $tottalmlac, 1, 0, "C", FALSE);
              $fpdf->cell(9 , 4, $tottaldisca, 1, 0, "C", FALSE);
              $fpdf->cell(9 ,4,   $totalgrupo1, 1, 0, "C", FALSE);
              $fpdf->cell(9 , 4, $totallechegrupo1, 1, 0, "C", FALSE);
        	    $fpdf->cell(9 , 4, $totalhojuelagrupo1, 1, 0, "C", FALSE);
        	    $fpdf->cell(9 , 4, $total7_13, 1, 0, "C", FALSE);
              $fpdf->cell(9 , 4, $totaltbc, 1, 0,"C", FALSE);
        	    $fpdf->cell(9 , 4, $totalancianos, 1, 0, "C", FALSE);
        	    $fpdf->cell(9 , 4, $totalgrupo2, 1, 0, "C", FALSE);
        	    $fpdf->cell(9 , 4, $totallechegrupo2, 1, 0, "C", FALSE);
        	    $fpdf->cell(9 , 4, $totalhojuelagrupo2, 1, 0, "C", FALSE);

        	    $fpdf->cell(11, 4, $totalbene, 1, 0, "C", FALSE);
        	    $fpdf->cell(9.5, 4, $totalleche, 1, 0, "C", FALSE);
        	    $fpdf->cell(9, 4, $totalcajaleche, 1, 0, "C", FALSE);
        	    $fpdf->cell(9, 4, $totalunidadleche, 1, 0, "C", FALSE);
              $fpdf->cell(11, 4, $totalcereal, 1, 0, "C", FALSE);
        	    $fpdf->cell(9, 4, $totalsacoscereal, 1, 0, "C", FALSE);
        	    $fpdf->cell(9, 4, $totalunidadcereal, 1, 1, "C", FALSE);

              $fpdf->setFont("Arial", "", 7);
              $fpdf->cell(80,4,$row->descripcion, 'B', 0, "L", FALSE);
              $fpdf->cell(0,4, $row->central, 0, 1, "R", FALSE);
                $fpdf->setFont("Arial", "", 5);
              $fpdf->cell(14,4, ' ', 'L', 0, "C", FALSE);
              $fpdf->cell(15,4, ' ', 'L', 0, "C", FALSE);
              $fpdf->cell(63,4, 'PRIMERA PRIORIDAD - DIAS DE ATENCION  :  '. $primera_prioridad, 1, 0, "C", FALSE);
              $fpdf->cell(54, 4, 'SEGUNDA PRIORIDAD - DIAS DE ATENCION : '. $segunda_prioridad, 1, 0, "C", FALSE);
              $fpdf->cell(67.5, 4, 'TOTAL GENERAL', 1, 0, "C", FALSE);
              $fpdf->cell(50, 4, '', 1, 0, "", FALSE);
              $fpdf->cell(24, 4, '', 'LRT', 1, "C", FALSE);
              $fpdf->setFont("Arial", "", 5);
              $fpdf->cell(14,4, 'Codigo Sistema', 'L', 0, "C");
              $fpdf->cell(15,4, 'Nombre Comite', 'L', 0, "C");
              $fpdf->setFont("Arial", "B", 5);
              $fpdf->cell(45, 4, 'BENEFICIARIOS', 1, 0, "C", FALSE);
              $fpdf->cell(18, 4, 'INSUMOS', 1, 0, "C", FALSE);
              $fpdf->cell(36, 4, 'BENEFICIARIOS', 1, 0, "C", FALSE);
              $fpdf->cell(18, 4, 'INSUMOS', 1, 0, "C", FALSE);
              $fpdf->cell(11, 4, 'TOTAL', 1, 0, "C", FALSE);
              $fpdf->cell(27.5, 4, 'Leche Evaporada', 1, 0, "C", FALSE);
              $fpdf->cell(29, 4, 'Hojuela Cereal Enrq. Azur', 1, 0, "C", FALSE);
              $fpdf->cell(35, 4, 'Coordinadora Resp.', 1, 0, "C", FALSE);
              $fpdf->cell(15, 4, 'DNI', 1, 0, "C", FALSE);
              $fpdf->cell(24, 4, 'Firma', 'LR', 1, "C", FALSE);

              $fpdf->cell(14,5, ' ', 'BL', 0,'C', FALSE);
              $fpdf->cell(15,5, ' ', 'BL', 0, "C", FALSE);
              $fpdf->cell(9, 5,  utf8_decode('0-6 años'), 1, 0, "C", FALSE);
              $fpdf->cell(9, 5, 'M-Gest', 1, 0, "C", FALSE);
              $fpdf->cell(9, 5, 'M-LACT', 1, 0, "C", FALSE);
              $fpdf->cell(9, 5, 'Discap.', 1, 0, "C", FALSE);
              $fpdf->cell(9, 5, 'TOTAL', 1, 0, "C", FALSE);
              $fpdf->cell(9, 5, 'LecheUni', 1, 0, "C", FALSE);
              $fpdf->cell(9, 5, 'Hojuela', 1, 0, "C", FALSE);
              $fpdf->cell(9, 5, utf8_decode('7-13 años'), 1, 0, "C", FALSE);
              $fpdf->cell(9, 5, 'Tbc', 1, 0, "C", FALSE);
              $fpdf->cell(9, 5, 'Ancianos', 1, 0, "C", FALSE);
              $fpdf->cell(9, 5, 'TOTAL', 1, 0, "C", FALSE);
              $fpdf->cell(9, 5, 'LecheUni', 1, 0, "C", FALSE);
              $fpdf->cell(9, 5, 'Hojuela', 1, 0, "C", FALSE);
              $fpdf->cell(11, 5, 'Beneficarios', 1, 0, "C", FALSE);
              $fpdf->cell(9.5, 5, 'Tot. leche', 1, 0, "C", FALSE);
              $fpdf->cell(9, 5, 'Cajas/47', 1, 0, "C", FALSE);
              $fpdf->cell(9, 5, 'Und/Lata', 1, 0, "C", FALSE);
              $fpdf->cell(11, 5, 'Tot. Hojuela', 1, 0, "C", FALSE);
              $fpdf->cell(9, 5, 'Sacos/70', 1, 0, "C", FALSE);
              $fpdf->cell(9, 5, 'Und/Bolsa', 1, 0, "C", FALSE);
              $fpdf->cell(50, 5, ' ', 'LR', 0, "C", FALSE);
              $fpdf->cell(24, 5, ' ', 'LR', 1, "C", FALSE);

              $tottal0_6    = 0;
              $tottalmges  = 0;
              $tottalmlac  = 0;
              $tottaldisca = 0;
              $totalgrupo1 = 0;
              $totallechegrupo1 = 0;
              $totalhojuelagrupo1 = 0;

              $total7_13 = 0;
              $totaltbc = 0;
              $totalancianos = 0;
              $totalgrupo2 = 0;
              $totallechegrupo2 = 0;
              $totalhojuelagrupo2 = 0;

              $totalbene = 0;
              $totalleche = 0;
              $totalcajaleche = 0;
              $totalunidadleche = 0;
              $totalcereal = 0;
              $totalsacoscereal = 0;
              $totalunidadcereal = 0;

          }//FIN IF

          $grupo =$row->descripcion;


          $tottal0_6   += $row->pptotalninos06;
          $tottalmges  += $row->pptotalmg;
          $tottalmlac  += $row->pptotalml;
          $tottaldisca += $row->pptotaldisca;
          $totalgrupo1 += $row->pptotalninos06 + $row->pptotalmg + $row->pptotalml + $row->pptotaldisca;
          $totallechegrupo1 += $row->pptotalleche;
          $totalhojuelagrupo1 += $row->pptotalcereal;

          $total7_13 =  $row->sptotalninos713;
          $totaltbc = $row->sptotaltbc;
          $totalancianos = $row->sptotalamayor;
          $totalgrupo2 = $row->sptotalninos713 +  $row->sptotaltbc +  $row->sptotalamayor;
          $totallechegrupo2 = $row->sptotalleche;
          $totalhojuelagrupo2 = $row->sptotalcereal;


          $totalbene  += $row->pptotalninos06 + $row->pptotalmg + $row->pptotalml + $row->pptotaldisca + $row->sptotalninos713 +  $row->sptotaltbc +  $row->sptotalamayor;
          $totalleche += $row->totalleche;
          $totalcajaleche += $row->lechescaja;
          $totalunidadleche += $row->lecheunidad;

          $totalcereal  +=   $row->totalcereal;
          $totalsacoscereal += $row->cerealsaco;
          $totalunidadcereal += $row->cerealunidad;



          $gtottal0_6   += $row->pptotalninos06 ;
          $gtottalmges  +=  $row->pptotalmg;
          $gtottalmlac  += $row->pptotalml;
          $gtottaldisca += $row->pptotaldisca;
          $gtotalgrupo1 += $row->pptotalninos06 + $row->pptotalmg + $row->pptotalml + $row->pptotaldisca;
          $gtotallechegrupo1   += $row->sptotalleche;
          $gtotalhojuelagrupo1 += $row->sptotalcereal;

          $gtotal7_13          += $row->sptotalninos713;
          $gtotaltbc           += $row->sptotaltbc;
          $gtotalancianos      += $row->sptotalamayor;
          $gtotalgrupo2        += $row->sptotalninos713 +  $row->sptotaltbc +  $row->sptotalamayor;
          $gtotallechegrupo2   += $row->sptotalleche;
          $gtotalhojuelagrupo2 += $row->sptotalcereal;

          $gtotalbene          += $row->pptotalninos06 + $row->pptotalmg + $row->pptotalml + $row->pptotaldisca + $row->sptotalninos713 +  $row->sptotaltbc +  $row->sptotalamayor;;
          $gtotalleche         += $row->totalleche;
          $gtotalcajaleche     += $row->lechescaja;
          $gtotalunidadleche   += $row->lecheunidad;

          $gtotalcereal        += $row->totalcereal;
          $gtotalsacoscereal   += $row->cerealsaco;
          $gtotalunidadcereal  += $row->cerealunidad;


          $fpdf->setFont("Arial", "", 8);
          $fpdf->cell(14, 7, $row->idcomite, 1, 0, "C", FALSE);
          $fpdf->cell(15,7, $row->codigointerno, 1, 0, "C", FALSE);
          $fpdf->cell(9, 7, $row->pptotalninos06, 1, 0, "C", FALSE);
          $fpdf->cell(9, 7, $row->pptotalmg, 1, 0, "C", FALSE);
          $fpdf->cell(9, 7, $row->pptotalml, 1, 0, "C", FALSE);
          $fpdf->cell(9, 7, $row->pptotaldisca, 1, 0, "C", FALSE);
          $fpdf->cell(9, 7, $row->pptotalninos06 + $row->pptotalmg + $row->pptotalml + $row->pptotaldisca
            , 1, 0, "C", FALSE);
          $fpdf->cell(9, 7, $row->pptotalleche, 1, 0, "C", FALSE);
          $fpdf->cell(9, 7, $row->pptotalcereal, 1, 0, "C", FALSE);
      	    /* Segunda prioridad */
          $fpdf->cell(9, 7, $row->sptotalninos713, 1, 0, "C", FALSE);
          $fpdf->cell(9, 7, $row->sptotaltbc, 1, 0, "C", FALSE);
          $fpdf->cell(9, 7, $row->sptotalamayor, 1, 0, "C", FALSE);
          $fpdf->cell(9, 7, $row->sptotalninos713 +  $row->sptotaltbc +  $row->sptotalamayor, 1, 0, "C", FALSE);

          $fpdf->cell(9, 7, $row->sptotalleche, 1, 0, "C", FALSE);
          $fpdf->cell(9, 7, $row->sptotalcereal, 1, 0, "C", FALSE);

           $fpdf->cell(11, 7,
      	  $row->pptotalninos06 + $row->pptotalmg + $row->pptotalml + $row->pptotaldisca + $row->sptotalninos713 +  $row->sptotaltbc +  $row->sptotalamayor
                  , 1, 0, "C", FALSE);
      	    //Totales de leche
      	    $fpdf->cell(9.5, 7, $row->totalleche, 1, 0, "C", FALSE);
      	    $fpdf->cell(9, 7, $row->lechescaja, 1, 0, "C", FALSE);
      	    $fpdf->cell(9, 7, $row->lecheunidad, 1, 0, "C", FALSE);

            //Tatales cereales

            $fpdf->cell(11, 7, $row->totalcereal, 1, 0, "C", FALSE);
      	    $fpdf->cell(9, 7, $row->cerealsaco, 1, 0, "C", FALSE);
      	    $fpdf->cell(9, 7, $row->cerealunidad, 1, 0, "C", FALSE);
            $fpdf->setFont("Arial", "", 5.2);
      	    $fpdf->cell(35, 7, utf8_decode($row->coordinador), 1, 0, "L", FALSE);
            $fpdf->cell(15, 7,$row->coordinadordni, 1, 0, "C", FALSE);
      	    $fpdf->cell(24, 7, ' ', 1, 1, "L", FALSE);
        }

        //Ultimo Total

              $fpdf->setFont("Arial", "", 8);
              $fpdf->cell(14,4, ' ', 1, 0, "C", FALSE);
              $fpdf->cell(15,4, ' ', 1, 0, "C", FALSE);
              $fpdf->cell(9,4,    $tottal0_6, 1, 0, "C", FALSE);
              $fpdf->cell(9, 4, $tottalmges, 1, 0, "C", FALSE);
              $fpdf->cell(9 , 4, $tottalmlac, 1, 0, "C", FALSE);
              $fpdf->cell(9 , 4, $tottaldisca, 1, 0, "C", FALSE);
              $fpdf->cell(9 ,4,   $totalgrupo1, 1, 0, "C", FALSE);
              $fpdf->cell(9 , 4, $totallechegrupo1, 1, 0, "C", FALSE);
        	  $fpdf->cell(9 , 4, $totalhojuelagrupo1, 1, 0, "C", FALSE);
        	  $fpdf->cell(9 , 4, $total7_13, 1, 0, "C", FALSE);
              $fpdf->cell(9 , 4, $totaltbc, 1, 0,"C", FALSE);
        	  $fpdf->cell(9 , 4, $totalancianos, 1, 0, "C", FALSE);
        	  $fpdf->cell(9 , 4, $totalgrupo2, 1, 0, "C", FALSE);
        	  $fpdf->cell(9 , 4, $totallechegrupo2, 1, 0, "C", FALSE);
        	  $fpdf->cell(9 , 4, $totalhojuelagrupo2, 1, 0, "C", FALSE);

        	  $fpdf->cell(11, 4, $totalbene, 1, 0, "C", FALSE);
        	  $fpdf->cell(9.5, 4, $totalleche, 1, 0, "C", FALSE);
        	  $fpdf->cell(9, 4, $totalcajaleche, 1, 0, "C", FALSE);
        	  $fpdf->cell(9, 4, $totalunidadleche, 1, 0, "C", FALSE);
              $fpdf->cell(11, 4, $totalcereal, 1, 0, "C", FALSE);
        	  $fpdf->cell(9, 4, $totalsacoscereal, 1, 0, "C", FALSE);
        	  $fpdf->cell(9, 4, $totalunidadcereal, 1, 1, "C", FALSE);


        //Totales generales de toda la central

        $fpdf->Ln(1);
        $fpdf->setFont("Arial", "", 8);
        $fpdf->cell(14, 7, '', 1, 0, "C", FALSE);
        $fpdf->cell(15,7, '', 1, 0, "C", FALSE);
        $fpdf->cell(9, 7, $gtottal0_6, 1, 0, "C", FALSE);
        $fpdf->cell(9, 7, $gtottalmges, 1, 0, "C", FALSE);
        $fpdf->cell(9, 7, $gtottalmlac, 1, 0, "C", FALSE);
        $fpdf->cell(9, 7, $gtottaldisca, 1, 0, "C", FALSE);
        $fpdf->cell(9, 7, $gtotalgrupo1, 1, 0, "C", FALSE);
        $fpdf->cell(9, 7, $gtotallechegrupo1, 1, 0, "C", FALSE);
        $fpdf->cell(9, 7, $gtotalhojuelagrupo1, 1, 0, "C", FALSE);

        $fpdf->cell(9, 7, $gtotal7_13, 1, 0, "C", FALSE);
        $fpdf->cell(9, 7, $gtotaltbc, 1, 0, "C", FALSE);
        $fpdf->cell(9, 7, $gtotalancianos, 1, 0, "C", FALSE);
        $fpdf->cell(9, 7, $gtotalgrupo2, 1, 0, "C", FALSE);

        $fpdf->cell(9, 7, $gtotallechegrupo2, 1, 0, "C", FALSE);
        $fpdf->cell(9, 7, $gtotalhojuelagrupo2, 1, 0, "C", FALSE);

         $fpdf->cell(11, 7,$gtotalbene, 1, 0, "C", FALSE);

         $fpdf->cell(9.5, 7,$gtotalleche, 1, 0, "C", FALSE);
         $fpdf->cell(9, 7, $gtotalcajaleche, 1, 0, "C", FALSE);
         $fpdf->cell(9, 7, $gtotalunidadleche, 1, 0, "C", FALSE);

         $fpdf->cell(11, 7,$gtotalcereal, 1, 0, "C", FALSE);
         $fpdf->cell(9, 7, $gtotalsacoscereal, 1, 0, "C", FALSE);
         $fpdf->cell(9, 7, $gtotalunidadcereal, 1, 1, "C", FALSE);



        $fpdf->Output();
    }



    public function imprimirresumen()
    {

        $anio   = $this->input->get("anio");
        $mes    = $this->input->get("mes");
        $semana = $this->input->get("semana");
        $rs     = $this->central->listarResumenHistorico(
            array(
                $anio,
                $mes,
                $semana
            )
        );


        $fpdf = new FPDF("L", "mm", "A4");
        $fpdf->AddPage();
        $fpdf->AliasNbPages();
        $fpdf->SetMargins(4, 5, 4);
        $fpdf->SetAutoPageBreak(true, 5); //7
        $fpdf->setFont("Arial", "B", 10.5);
       // $fpdf->Image('../resources/images/logo.jpg',5,5,20,'JPG');
        $fpdf->cell(0, 5, utf8_decode("RESUMEN DE DISTRIBUCIÓN"), 0, 0, "C");
        $fpdf->ln(8);

        $col1=49;
        $col2=61.5;
        $col3=73.5;
        $col4=85.5;
        $col5=97.5;
        $col6=110.5;

        $col7=122.5;
        $col8=134.5;
        $col9=147;

        $col10=159;
        $col11=173;
        $col12=186;
        $col13=199;

        $col14=212;
        $col15=225;
        $col16=237;
        $col17=247;
        $col18=257;
        $col19=268.5;
        $col20=279.5;

         $fpdf->setX(49);
         $fpdf->setFont("Arial", "B", 8);
         $fpdf->cell(85.5,6,utf8_decode('PRIMERA PRIORIDAD - DIAS DE ATENCION : 99'),1,0,'J');
         $fpdf->cell(77.5,6,utf8_decode('SEGUNDA PRIORIDAD - DIAS DE ATENCION : 99'),1,0,'J');
         $fpdf->cell(78.5,6,utf8_decode('TOTAL GENERAL'),1,1,'C');
         $fpdf->setFont("arial", "", 8);

            $fila = $fpdf->getY();
            $fpdf->MultiCell(45, 8, 'CENTRAL', 1, "L", FALSE);
            $fpdf->setXY($col1,$fila);
            $fpdf->MultiCell(12.5, 4, utf8_decode('0-6 años'), 1, "C", FALSE);
            $fpdf->setXY($col2,$fila);
            $fpdf->MultiCell(12, 8, 'M-Gest', 1, "C", FALSE);
            $fpdf->setXY($col3,$fila);
            $fpdf->MultiCell(12, 8, 'M-Lact', 1, "C", FALSE);
            $fpdf->setXY($col4,$fila);
            $fpdf->MultiCell(12, 8, 'Disca.', 1,  "C", FALSE);
            $fpdf->setXY($col5,$fila);
            $fpdf->MultiCell(13, 8, 'Total', 1,  "C", FALSE);
            $fpdf->setXY($col6,$fila);
            $fpdf->MultiCell(12, 4, 'Leche Und.', 1,  "C", FALSE);
            $fpdf->setXY($col7,$fila);
            $fpdf->MultiCell(12, 4, 'Hojuela bolsa', 1, "C", FALSE);

            $fpdf->setXY($col8,$fila);
            $fpdf->MultiCell(12.5, 4, utf8_decode('7-13 años'), 1, "C", FALSE);
            $fpdf->setXY($col9,$fila);
            $fpdf->MultiCell(12, 8, 'Tbc', 1,  "C", FALSE);
            $fpdf->setXY($col10,$fila);
            $fpdf->MultiCell(14, 8, 'Ancianos', 1,  "C", FALSE);
            $fpdf->setXY($col11,$fila);
            $fpdf->MultiCell(13, 8, 'Total', 1,  "C", FALSE);
            $fpdf->setXY($col12,$fila);
            $fpdf->MultiCell(13, 4, 'Leche Und.', 1,  "C", FALSE);
            $fpdf->setXY($col13,$fila);
            $fpdf->MultiCell(13, 4, 'Hojuela bolsa', 1,  "C", FALSE);

            $fpdf->setXY($col14,$fila);
            $fpdf->MultiCell(13, 4, 'Beneficiarios', 1,  "C", FALSE);
            $fpdf->setXY($col15,$fila);
            $fpdf->MultiCell(12, 4, 'Total leche', 1,  "C", FALSE);
            $fpdf->setXY($col16,$fila);
            $fpdf->MultiCell(10, 4, 'Cajas/48', 1,  "C", FALSE);

            $fpdf->setXY($col17,$fila);
            $fpdf->MultiCell(10, 4, 'Und/Lata', 1,  "C", FALSE);
            $fpdf->setXY($col18,$fila);
            $fpdf->MultiCell(11.5, 4, 'Total hojuela', 1,  "C", FALSE);
            $fpdf->setXY($col19,$fila);
            $fpdf->MultiCell(11, 4, 'Sacos/80', 1,  "C", FALSE);
            $fpdf->setXY($col20,$fila);
            $fpdf->MultiCell(11, 4, 'Und/Bolsa', 1,  "C", FALSE);

            $item = 1;

        $tot1=0;
        $tot2=0;
        $tot3=0;
        $tot4=0;
        $tot5=0;
        $tot6=0;
        $tot7=0;
        $tot8=0;
        $tot9=0;
        $tot10=0;
        $tot11=0;
        $tot12=0;
        $tot13=0;
        $tot14=0;
        $tot15=0;
        $tot16=0;
        $tot17=0;
        $tot18=0;
        $tot19=0;
        $tot20=0;


       $fpdf->setFont("arial", "", 9.5);
        foreach ($rs["data"] as $row)
        {

            $tot1 += $row->pptotalmg;
            $tot2 += $row->pptotalml;
            $tot3 += $row->pptotaldisca;
            $tot4 += $row->pptotal;
            $tot5 += $row->pptotalleche;
            $tot6 += $row->pptotalcereal;
            $tot7 +=$row->sptotalninos713;
            $tot8 +=$row->sptotaltbc;
            $tot9 +=$row->sptotalamayor;
            $tot10 +=$row->sptotal;
            $tot11 +=$row->sptotalleche;
            $tot12 +=$row->sptotalcereal;
            $tot13 +=$row->totalbeneficiarios;
            $tot14 +=$row->totalleche;
            $tot15 +=$row->lechescaja;
            $tot16 +=$row->lecheunidad;
            $tot17 +=$row->totalcereal;
            $tot18 +=$row->cerealsaco;
            $tot19 +=$row->cerealunidad;
            $tot20 +=$row->pptotalninos06;


            $fpdf->Cell(45,5,utf8_decode($row->central),1,0,'J');
            $fpdf->Cell(12.5,5,utf8_decode($row->pptotalninos06),1,0,'C');
            $fpdf->Cell(12,5,utf8_decode($row->pptotalmg),1,0,'C');
            $fpdf->Cell(12,5,utf8_decode($row->pptotalml),1,0,'C');
            $fpdf->Cell(12,5,utf8_decode($row->pptotaldisca),1,0,'C');
            $fpdf->Cell(13,5,utf8_decode($row->pptotal),1,0,'C');
            $fpdf->Cell(12,5,utf8_decode($row->pptotalleche),1,0,'C');
            $fpdf->Cell(12,5,utf8_decode($row->pptotalcereal),1,0,'C');
            $fpdf->Cell(12.5,5,utf8_decode($row->sptotalninos713),1,0,'C');
            $fpdf->Cell(12,5,utf8_decode($row->sptotaltbc),1,0,'C');
            $fpdf->Cell(14,5,utf8_decode($row->sptotalamayor),1,0,'C');
            $fpdf->Cell(13,5,utf8_decode($row->sptotal),1,0,'C');
            $fpdf->Cell(13,5,utf8_decode($row->sptotalleche),1,0,'C');
            $fpdf->Cell(13,5,utf8_decode($row->sptotalcereal),1,0,'C');
            $fpdf->Cell(13,5,utf8_decode($row->totalbeneficiarios),1,0,'C');
            $fpdf->Cell(12,5,utf8_decode($row->totalleche),1,0,'C');
            $fpdf->Cell(10,5,utf8_decode($row->lechescaja),1,0,'C');
            $fpdf->Cell(10,5,utf8_decode($row->lecheunidad),1,0,'C');
            $fpdf->Cell(11.5,5,utf8_decode($row->totalcereal),1,0,'C');
            $fpdf->Cell(11,5,utf8_decode($row->cerealsaco),1,0,'C');
            $fpdf->Cell(11,5,utf8_decode($row->cerealunidad),1,1,'C');

        }
        $fpdf->setFont("arial", "B", 9.5);
        $fpdf->Cell(45,5,utf8_decode('Totales'),1,0,'J');
        $fpdf->setFont("arial", "", 9.5);
        $fpdf->Cell(12.5,5,$tot20,1,0,'C');
        $fpdf->Cell(12,5,$tot1,1,0,'C');
        $fpdf->Cell(12,5,$tot2,1,0,'C');
        $fpdf->Cell(12,5,$tot3,1,0,'C');
        $fpdf->Cell(13,5,$tot4,1,0,'C');
        $fpdf->Cell(12,5,$tot5,1,0,'C');
        $fpdf->Cell(12,5,$tot6,1,0,'C');
        $fpdf->Cell(12.5,5,$tot7,1,0,'C');
        $fpdf->Cell(12,5,$tot8,1,0,'C');
        $fpdf->Cell(14,5,$tot9,1,0,'C');
        $fpdf->Cell(13,5,$tot10,1,0,'C');
        $fpdf->Cell(13,5,$tot11,1,0,'C');
        $fpdf->Cell(13,5,$tot12,1,0,'C');
        $fpdf->Cell(13,5,$tot13,1,0,'C');
        $fpdf->Cell(12,5,$tot14,1,0,'C');
        $fpdf->Cell(10,5,$tot15,1,0,'C');
        $fpdf->Cell(10,5,$tot16,1,0,'C');
        $fpdf->Cell(11.5,5,$tot17,1,0,'C');
        $fpdf->Cell(11,5,$tot18,1,0,'C');
        $fpdf->Cell(11,5,$tot19,1,1,'C');

        $fpdf->Output();
    }

}
