<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
 date_default_timezone_set('America/Los_Angeles');

 if(!function_exists('invierte_date'))
{
    //formateamos la fecha y la hora, función de cesarcancino.com
	function invierte_date($fecha)
	{

		$arreglo= explode("/", $fecha);
		return $arreglo[2]."/".$arreglo[1]."/".$arreglo[0];

	}
}
if(!function_exists("aplica_utf8"))
{
    function aplica_utf8($data)
    {
      return utf8_decode($data);
      //  return strtoupper(utf8_encode($data));
    }
}

if(!function_exists("numero_semana"))
{
    function numero_semana(){
        return date("W", strtotime(date('Y-m-d')));
    }
}
