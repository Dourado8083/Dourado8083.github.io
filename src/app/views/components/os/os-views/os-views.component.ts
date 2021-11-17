import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OS } from 'src/app/models/os';
import { oservice } from 'src/app/services/os.service';

@Component({
  selector: 'app-os-views',
  templateUrl: './os-views.component.html',
  styleUrls: ['./os-views.component.css']
})
export class OsViewsComponent implements OnInit {

os: OS = {
  tecnico:'',
  cliente:'',
  status:'',
  prioridade:'',
  observacoes:''
}
  constructor(private route:ActivatedRoute,private service:oservice,private router:Router) { }

  ngOnInit(): void {
    this.os.id = this.route.snapshot.paramMap.get('id');
    this.findById();
  }
findById():void{
  this.service.findById(this.os.id).subscribe(resposta =>{
    this.os = resposta;
  })
}
voltar():void{
this.router.navigate(['os'])
}
}
