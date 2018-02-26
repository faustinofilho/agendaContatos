$(function() {

	getHome();

	$(document).on("click", "a#home", function(){ getHome(); });	

	// Controlle de usuarios
	$(document).on("click", "a#contato_list", function(){ getContatoList(this); });	
	$(document).on("click", "a#create_contato_form", function(){ getCreateContatoForm(this); });	
	$(document).on("click", "button#add_contato", function(){ addContato(this); });

	$(document).on("click", "a.delete_confirm", function(){ deleteConfirmationContato(this); });
	$(document).on("click", "button.delete", function(){ deleteContato(this); });
	$(document).on("dblclick", "td.edit", function(){ makeEditableContato(this); });
	$(document).on("blur", "input#editbox", function(){ removeEditableContato(this) });

});

function getHome()
{
	var home = '<div id="piechart"></div>';

			google.charts.load('current', {'packages':['corechart']});
			google.charts.setOnLoadCallback(drawChart);
			
			var arrayDados1 = [];
			var arrayDados2 = [];
			var arrayDados3 = [];
			var arrayDados4 = [];
			
			$.post('Controller.php',
				{
					action: 'get_home'				
				},
				function(data, textStatus) {
					$.each( data, function( index, dados){   
						arrayDados1.push = ['Com e-mail', parseInt(dados.comEmail)];
						arrayDados2.push = ['Sem e-mail', parseInt(dados.semEmail)];
						arrayDados3.push = ['Que possuem sites', parseInt(dados.comSite)];
						arrayDados4.push = ['Que não possuem sites', parseInt(dados.semSite)];
					});					
				}, 
				"json"		
			);
			
			function drawChart() {

				var data = google.visualization.arrayToDataTable([
					['Task', 'Hours per Day'],
					arrayDados1.push,
					arrayDados2.push,
					arrayDados3.push,
					arrayDados4.push
				]);
				
				
				var options = {'title':'Contatos', 'width':1050, 'height':600};
				
				var chart = new google.visualization.PieChart(document.getElementById('piechart'));
				chart.draw(data, options);
			}


	$('div#content').html(home);
}

// -----------------------------------------------------------

function deleteContato(element) {	
	
	var Contato = new Object();
	Contato.id = $("#delete_confirm_modal input#contato_id").val();
	
	var contatoJson = JSON.stringify(Contato);
	
	$.post('Controller.php',
		{
			action: 'delete_contato',
			contato: contatoJson
		},
		function(data, textStatus) {

			$("#deletado").show();

			getContatoList(element);

			$("#delete_confirm_modal").modal("hide");
		}, 
		"json"		
	);	
}

function getContatoList(element) {
	
	$('#indicator').show();
	
	$.post('Controller.php',
		{
			action: 'get_contatos'				
		},
		function(data, textStatus) {
			renderContatoList(data);
			$('#indicator').hide();
		}, 
		"json"		
	);
}

function renderContatoList(jsonData) {
	
	var table = '<br><table class="table table-striped" width="600" cellpadding="5" class="table table-hover table-bordered"><thead><tr><th scope="col">ID</th><th scope="col">Nome</th><th scope="col">Email</th><th scope="col">Celular</th><th scope="col">Telefone</th><th scope="col">Site</th><th scope="col"></th></tr></thead><tbody>';

	$.each( jsonData, function( index, contato){    
		table += '<tr>';
		table += '<td>'+contato.id+'</td>';
		table += '<td class="edit" field="nome" contato_id="'+contato.id+'">'+contato.nome+'</td>';
		table += '<td class="edit" field="email" contato_id="'+contato.id+'">'+contato.email+'</td>';
		table += '<td class="edit" field="celular" contato_id="'+contato.id+'">'+contato.celular+'</td>';
		table += '<td class="edit" field="telefone" contato_id="'+contato.id+'">'+contato.telefone+'</td>';
		table += '<td class="edit" field="site" contato_id="'+contato.id+'">'+contato.site+'</td>';
		table += '<td><a href="javascript:void(0);" contato_id="'+contato.id+'" class="delete_confirm btn btn-danger" data-toggle="modal" data-target="#delete_confirm_modal">Deletar</a></td>';
		table += '</tr>';
    });

	table += '</tbody></table>';
	
	$('div#content').html(table);
}

function addContato(element) {	
	
	$('#indicator').show();
	
	var Contato = new Object();

	Contato.nome = $('input#nome').val();
	Contato.email = $('input#email').val();
	Contato.celular = $('input#celular').val();
	Contato.telefone = $('input#telefone').val();
	Contato.site = $('input#site').val();
	
	$('input#nome').removeClass('is-invalid');
	$('input#email').removeClass('is-invalid');
	$('input#celular').removeClass('is-invalid');
	$('input#telefone').removeClass('is-invalid');
	$('input#site').removeClass('is-invalid');



	if(Contato.nome == ''){
		$( "input#nome" ).addClass( "is-invalid" );
	}else if (Contato.celular == ''){
		$( "input#celular" ).addClass( "is-invalid" );
	} else {
		var contatoJson = JSON.stringify(Contato);
	
		$.post('Controller.php',
			{
				action: 'add_contato',
				contato: contatoJson
			},
			function(data, textStatus) {
				getContatoList(element);
				$('#indicator').hide();
			}, 
			"json"		
		);
	}
	
}

function getCreateContatoForm(element) {
	
	var form = '<br><div class="col-lg-6"><div class="form-group">';
		form +=	'<label for="">Nome</label>';
		form +=	'<input type="text" id="nome" name="nome" value="" class="form-control" />';
		form += '<div class="invalid-feedback">';
		form += 'O nome é obrigatório.';
		form += '</div>';		
		form +=	'</div>';
				
		form +=	'<div class="form-group">';
		form +=	'<label for="">Celular </label>';
		form +=	'<input type="text" id="celular" name="celular" value="" onkeyup="mascara( this, mtel );" maxlength="15" class="form-control" required/>';
		form += '<div class="invalid-feedback">';
		form += 'O celular obrigatório.';
		form += '</div>';
		form +=	'</div>';
				
		form +=	'<div class="form-group">';
		form +=	'<label for="">Telefone </label>';
		form +=	'<input type="text" id="telefone" name="telefone" onkeyup="mascara( this, mtel );" maxlength="15" value="" class="form-control" required/>';
		form +=	'</div>';	


		form +=	'<div class="form-group">';
		form +=	'<label for="">E-mail </label>';
		form +=	'<input type="email" id="email" onblur="ValidaEmail();" name="email" value="" class="form-control" />';
		form += '<div class="invalid-feedback">';
		form += 'E-mail inválido.';
		form += '</div>';
		form +=	'</div>';

		form +=	'<div class="form-group">';
		form +=	'<label for="">Site </label>';
		form +=	'<input type="text" id="site" name="site" value="" class="form-control" required/>';
		form +=	'</div>';
								
		form +=	'<div class="form-group">';
		form +=	'<div class="">';		
		form +=	'<button type="button" id="add_contato" class="btn btn-primary"><i class="icon-ok icon-white"></i> Cadastrar</button>';
		form +=	'</div>';
		form +=	'</div>';
		form +=	'</div>';
		
		$('div#content').html(form);
}

function makeEditableContato(element) { 
	$(element).html('<input id="editbox" size="'+  $(element).text().length +'" type="text" value="'+ $(element).text() +'">');  
	$('#editbox').focus();
	$(element).addClass('current'); 
}

function removeEditableContato(element) { 
	
	$('#indicator').show();
	
	var Contato = new Object();
	Contato.id = $('.current').attr('contato_id');		
	Contato.field = $('.current').attr('field');
	Contato.newvalue = $(element).val();
	
	var contatoJson = JSON.stringify(Contato);
	
	$.post('Controller.php',
		{
			action: 'update_field_data_contato',			
			contato: contatoJson
		},
		function(data, textStatus) {

			$("#atualizar").show();

			$('td.current').html($(element).val());
			$('.current').removeClass('current');
			$('#indicator').hide();			
		}, 
		"json"		
	);	
}


function deleteConfirmationContato(element) {	
	$("#delete_confirm_modal").modal("show");
	$("#delete_confirm_modal input#contato_id").val($(element).attr('contato_id'));
}




// Mascara para os telefones
function mascara(o,f){
    v_obj=o
    v_fun=f
    setTimeout("execmascara()",1)
}
function execmascara(){
    v_obj.value=v_fun(v_obj.value)
}
function mtel(v){
    v=v.replace(/\D/g,"");             //Remove tudo o que não é dígito
    v=v.replace(/^(\d{2})(\d)/g,"($1) $2"); //Coloca parênteses em volta dos dois primeiros dígitos
    v=v.replace(/(\d)(\d{4})$/,"$1-$2");    //Coloca hífen entre o quarto e o quinto dígitos
    return v;
}


function ValidaEmail()
{
  var obj = $('input#email').val();
  if ((obj.length != 0) && ((obj.indexOf("@") < 1) || (obj.indexOf('.') < 7)))
  {
	$( "input#email" ).addClass( "is-invalid" );
	return false;
  }
}