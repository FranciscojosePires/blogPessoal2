import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from '../model/Postagem';
import { Tema } from '../model/Tema';
import { User } from '../model/User';
import { AlertasService } from '../service/alertas.service';
import { AuthService } from '../service/auth.service';
import { PostagemService } from '../service/postagem.service';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  
  postagem:Postagem = new Postagem()
  tema: Tema = new Tema()
  user: User = new User()
  idUser = environment.id
  tituloPost: string

  key ='data'
  reverse = true
  
  listasPostagens: Postagem[]
  listaTemas: Tema[]
  idTema: number
  nomeTema:string

  constructor(
    private router: Router,
     private postagemService: PostagemService,
     private temaService: TemaService,
     private authService:AuthService,
     private alertas: AlertasService
     
     ) { }
     
  ngOnInit(){
    window.scroll(0,0)
    if (environment.token == ''){
      alert('Sua seção expirou, faça o login novamente')
      this.router.navigate(['/entra'])
    }
    this.getAllTema()
    this.getAllPostagens()
    }

  getAllTema(){
    this.temaService.getAllTema().subscribe((resp: Tema[])=>{
        this.listaTemas = resp
  })
}

findByIdTema(){
  this.temaService.getByIdTema(this.idTema).subscribe((resp:Tema)=>{
    this.tema= resp
  })
}

getAllPostagens(){
  this.postagemService.getAllPostagens().subscribe((resp:Postagem [])=>{
    this.listasPostagens = resp
  })
}

finByIdUser(){
  this.authService.getByIdUser(this.idUser).subscribe((resp: User)=>{
    this.user=resp
  })
}

publicar(){
  this.tema.id=this.idTema
  this.postagem.tema=this.tema

  this.user.id= this.idUser
  this.postagem.usuario=this.user
  this.postagemService.postPostagem(this.postagem).subscribe((resp:Postagem)=>{
    this.postagem=resp
    this.alertas.showAlertSuccess('Postagem realizada com sucesso!')
    this.postagem =new Postagem()
    this.getAllPostagens()
  })

}

findByTituloPostagem(){
  if(this.tituloPost == ''){
    this.getAllPostagens()
  }else{
    this.postagemService.getBYTituloPostagem(this.tituloPost).subscribe((resp:Postagem[])=>{
      this.listasPostagens = resp
    })
  }
}


findByNomeTema(){
  if (this.nomeTema == '') {
    this.getAllTema()
  }else{
    this.temaService.getByNomeTema(this.nomeTema).subscribe((resp:Tema[])=>{
      this.listaTemas = resp
    })
   }
  }
}