<?php

function __autoload($className){
	include_once("models/$className.php");	
}

include_once ('config/Conexao.php');
$conexao=new Conexao();

$contato = new Contato();

if(!isset($_POST['action'])) {
	print json_encode(0);
	return;
}

switch($_POST['action']) {
	case 'get_home':
		print $contato->getHome();		
	break;

	case 'get_contatos':
		print $contato->getContatos();		
	break;

	case 'add_contato':
		$cont = new stdClass;
		$cont = json_decode($_POST['contato']);
		print $contato->add($cont);		
	break;

	case 'delete_contato':
		$cont = new stdClass;
		$cont = json_decode($_POST['contato']);
		print $contato->delete($cont);		
	break;

	case 'update_field_data_contato':
		$cont = new stdClass;
		$cont = json_decode($_POST['contato']);
		print $contato->updateValue($cont);				
	break;
}

exit();