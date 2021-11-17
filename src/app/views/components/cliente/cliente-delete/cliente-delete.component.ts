import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-cliente-delete',
  templateUrl: './cliente-delete.component.html',
  styleUrls: ['./cliente-delete.component.css']
})
export class ClienteDeleteComponent implements OnInit {
  id_cli = ''
  cliente: Cliente = {
    id: '',
    nome: '',
    cpf: '',
    telefone:''
  }
  constructor(private router:Router,private service:ClienteService,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.id_cli = this.route.snapshot.paramMap.get('id')!
    this.findById();
  }
  findById():void{
    this.service.findById(this.id_cli).subscribe(resposta =>{
    this.cliente = resposta;
    })
  }
  cancela(): void {
    this.router.navigate(['clientes'])
  }
  delete():void{
    this.service.delete(this.id_cli).subscribe(resposta=>{
      this.router.navigate(['clientes']) 
      this.service.message('Cliente deletado com sucesso!')
    },err =>{
   if(err.error.error.match('possui Ordens de Serviço')) {
     this.service.message(err.error.error);
   }
    })
  }
}
