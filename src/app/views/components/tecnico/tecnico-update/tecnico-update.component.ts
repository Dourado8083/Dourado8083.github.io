import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Tecnico } from 'src/app/models/tecnico';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-tecnico-update',
  templateUrl: './tecnico-update.component.html',
  styleUrls: ['./tecnico-update.component.css']
})
export class TecnicoUpdateComponent implements OnInit {
  id_tec = ''
  tecnico: Tecnico = {
    id: '',
    nome: '',
    cpf: '',
    telefone:''
  }
  nome = new FormControl('',[Validators.minLength(5)])
  cpf = new FormControl('',[Validators.minLength(11)])
  telefone = new FormControl('',[Validators.minLength(11)])
  constructor(private router:Router,private service:TecnicoService,private route:ActivatedRoute ) { }

  ngOnInit(): void {
    //chamando o metodo findbyid da service
  this.id_tec = this.route.snapshot.paramMap.get('id')!
  this.findById(); //pegando o id e trazendo as info de tecnico para quando for fazer o update esta tudo lá
  }
  update():void{
  this.service.update(this.tecnico).subscribe(resposta =>{
    this.router.navigate(['tecnicos'])
    this.service.message('Técnico atualizado com sucesso!')
  }, err => { //tratamento de exceção do CPF,ele faz uma verificação para ver se acha a mensagem já... se achrar ele mostar o erro
    if(err.error.error.match('já cadastrado')) {
      this.service.message(err.error.error)

    } else if(err.error.errors[0].message === "número do registro de contribuinte individual brasileiro (CPF) inválido") {
      this.service.message("CPF Inválido!")
    }
  })
  }
  findById():void{
    this.service.findById(this.id_tec).subscribe(resposta =>{
    this.tecnico = resposta;
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
