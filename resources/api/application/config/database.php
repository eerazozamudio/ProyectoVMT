<?php
defined('BASEPATH') OR exit('No direct script access allowed');

$active_group = 'default';
$query_builder = TRUE;

$db['default'] = array(
	'dsn'	=> '',
	'hostname' => '198.211.99.171',
	//'hostname' => '127.0.0.1',
	'username' => 'root',
	'password' => '64y4.634##$%', // Server Villa nuevo : 64y4.634##$%
	//'password' => '', // Server local : E64y4.634##
	'database' => 'dbvmt',
    /*'hostname' => 'globalsoftperu.com',
	'username' => 'globalso_empadr',
	'password' => '100%exito2017',
	'database' => 'globalso_empadr',*/
	
	'dbdriver' => 'mysqli',
	'dbprefix' => '',
	'pconnect' => FALSE,
	'db_debug' => (ENVIRONMENT !== 'production'),
	'cache_on' => FALSE,
	'cachedir' => '',
	'char_set' => 'utf8',
	'dbcollat' => 'utf8_general_ci',
	'swap_pre' => '',
	'encrypt' => FALSE,
	'compress' => FALSE,
	'stricton' => FALSE,
	'failover' => array(),
	'save_queries' => TRUE
);
