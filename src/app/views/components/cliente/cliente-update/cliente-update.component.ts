import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-cliente-update',
  templateUrl: './cliente-update.component.html',
  styleUrls: ['./cliente-update.component.css']
})
export class ClienteUpdateComponent implements OnInit {

  id_cli = ''
  cliente: Cliente = {
    id: '',
    nome: '',
    cpf: '',
    telefone:''
  }
  nome = new FormControl('',[Validators.minLength(5)])
  cpf = new FormControl('',[Validators.minLength(11)])
  telefone = new FormControl('',[Validators.minLength(11)])
  constructor(private router:Router,private service:ClienteService,private route:ActivatedRoute ) { }

  ngOnInit(): void {
    //chamando o metodo findbyid da service
  this.id_cli = this.route.snapshot.paramMap.get('id')!
  this.findById(); //pegando o id e trazendo as info de tecnico para quando for fazer o update esta tudo lá
  }
  update():void{
  this.service.update(this.cliente).subscribe(resposta =>{
    this.router.navigate(['clientes'])
    this.service.message('Cliente atualizado com sucesso!')
  }, err => { //tratamento de exceção do CPF,ele faz uma verificação para ver se acha a mensagem já... se achrar ele mostar o erro
    if(err.error.error.match('já cadastrado')) {
      this.service.message(err.error.error)

    } else if(err.error.errors[0].message === "número do registro de contribuinte individual brasileiro (CPF) inválido") {
      this.service.message("CPF Inválido!")
    }
  })
  }
  findById():void{
    this.service.findById(this.id_cli).subscribe(resposta =>{
    this.cliente = resposta;
    })
  }
  cancela(): void {
    this.router.navigate(['tecnicos'])
  }
  errorValidName(){
    if(this.nome.invalid){
      return 'O nome deve ter entre 5 e 60 caracteres!';
    }
    return false;
    }
    errorValidCpf(){
      if(this.cpf.invalid){
        return 'O cpf deve ter entre 11 e 15 números!';
      }
      return false;
      }
      errorValidTelefone(){
        if(this.telefone.invalid){
          return 'O Telefone deve ter entre 11 e 18 números!';
        }
        return false;
        }
}
