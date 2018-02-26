<?php 

class Conexao
{
    public $dbh;
	public $host = "172.17.0.2";
    public $user = "root";
    public $pass = "123456";
    public $db	 = "agenda_telefonica";

	public function __construct()	{	
		$this->dbh = new PDO(
            "mysql:host=".$this->host.";
            dbname=".$this->db,
            $this->user,
            $this->pass
        );		
    }
    
}

