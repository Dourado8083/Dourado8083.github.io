import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/models/cliente';
import { OS } from 'src/app/models/os';
import { Tecnico } from 'src/app/models/tecnico';
import { ClienteService } from 'src/app/services/cliente.service';
import { oservice } from 'src/app/services/os.service';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-os-create',
  templateUrl: './os-create.component.html',
  styleUrls: ['./os-create.component.css']
})
export class OsCreateComponent implements OnInit {

  os: OS = {
    tecnico: '',
    cliente: '',
    observacoes:'',
    status: '',
    prioridade: ''
  }

  tecnicos: Tecnico[] = []
  clientes: Cliente[] = []
  constructor(private tecnicoService: TecnicoService, private clienteServce: ClienteService,private service:oservice,private router:Router) { }

  ngOnInit(): void {
    this.listarTecnicos();
    this.listarCliente();
  }
  create():void{
    this.service.create(this.os).subscribe(resposta =>{
      this.service.message("Ordem de Serviço criada com sucesso!");
      this.router.navigate(['os'])
    })
  }
  cancela():void{
    this.router.navigate(['os'])
  }
  listarTecnicos(): void {
    this.tecnicoService.findAll().subscribe(resposta => {
      this.tecnicos = resposta;
    })
  }
  listarCliente(): void {
    this.clienteServce.findAll().subscribe(resposta => {
      this.clientes = resposta;
    })
  }
}
