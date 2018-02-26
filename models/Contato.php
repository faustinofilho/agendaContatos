<?php

class Contato extends Conexao 
{
	
	public function getContatos()
	{				
		$sth = $this->dbh->prepare("SELECT * FROM contatos");
		$sth->execute();
		return json_encode($sth->fetchAll());
	}

	public function getHome()
	{				
		$sth = $this->dbh->prepare("select
		(select count(email) from contatos where email != '') as comEmail,
		(select count(email) from contatos where email = '') as semEmail,
		(select count(site) from contatos where email != '') as comSite,
		(select count(site) from contatos where email = '') as semSite
		 from contatos;");
		$sth->execute();
		return json_encode($sth->fetchAll());
	}
	
	public function add($contato)
	{	
		$sth = $this->dbh->prepare("INSERT INTO contatos (nome, email, celular, telefone, site) VALUES (?, ?, ?, ?, ?)");

		$dados = array(
					"{$contato->nome}",
					"{$contato->email}",
					"{$contato->celular}", 
					"{$contato->telefone}",
					"{$contato->site}"
				);

		$sth->execute($dados);	

		return json_encode($this->dbh->lastInsertId());
	}
	
	public function delete($contato)
	{				
		$sth = $this->dbh->prepare("DELETE FROM contatos WHERE id=?");
		$sth->execute(array($contato->id));
		return json_encode(1);
	}
	
	public function updateValue($contato)
	{		
		$sth = $this->dbh->prepare("UPDATE contatos SET ". $contato->field ."=? WHERE id=?");
		$sth->execute(array($contato->newvalue, $contato->id));				
		return json_encode(1);	
	}
	
}
?>