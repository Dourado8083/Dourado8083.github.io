import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Tecnico } from 'src/app/models/tecnico';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-tecnico-delete',
  templateUrl: './tecnico-delete.component.html',
  styleUrls: ['./tecnico-delete.component.css']
})
export class TecnicoDeleteComponent implements OnInit {

  id_tec = ''
  tecnico: Tecnico = {
    id: '',
    nome: '',
    cpf: '',
    telefone:''
  }
  
  constructor(private router:Router,private service:TecnicoService,private route:ActivatedRoute ) { }

  ngOnInit(): void {
    //chamando o metodo findbyid da service
  this.id_tec = this.route.snapshot.paramMap.get('id')!
  this.findById(); //pegando o id e trazendo as info de tecnico para quando for fazer o update esta tudo lá
  }
  findById():void{
    this.service.findById(this.id_tec).subscribe(resposta =>{
    this.tecnico = resposta;
    })
  }
  cancela(): void {
    this.router.navigate(['tecnicos'])
  }
delete():void{
  this.service.delete(this.id_tec).subscribe(resposta=>{
    this.router.navigate(['tecnicos']) 
    this.service.message('Técnico deletado com sucesso!')
  },err =>{
 if(err.error.error.match('possui Ordens de Serviço')) {
   this.service.message(err.error.error);
 }
  })
}
}



