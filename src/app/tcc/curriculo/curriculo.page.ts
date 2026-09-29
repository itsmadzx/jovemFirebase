import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray
} from '@angular/forms';

@Component({
  selector: 'app-curriculo',
  templateUrl: './curriculo.page.html',
  styleUrls: ['./curriculo.page.scss'],
  standalone: false
})
export class CurriculoPage implements OnInit {

  curriculoForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {

    this.curriculoForm = this.fb.group({ //formulario do curriculo, com todos os campos que o user vai preencher
      nome: [''],

      email: [''],

      telefone: [''],

      objetivo: [''],

      resumo: [''],

      formacoes: this.fb.array([]),

      experiencias: this.fb.array([]),

      cursos: this.fb.array([]),

      habilidades: [''],

      idiomas: this.fb.array([])

    });

  }

//getters
  get formacoes(): FormArray {

    return this.curriculoForm.get('formacoes') as FormArray;

  }

  get experiencias(): FormArray {

    return this.curriculoForm.get('experiencias') as FormArray;

  }

  get cursos(): FormArray {

    return this.curriculoForm.get('cursos') as FormArray;

  }

  get idiomas(): FormArray {

    return this.curriculoForm.get('idiomas') as FormArray;

  }


  
  //formaçao
  adicionarFormacao(): void {
    const formacao = this.fb.group({
      curso: [''],
      instituicao: [''],
      status: ['']

    });

    this.formacoes.push(formacao);

  }

  removerFormacao(index: number): void {
    this.formacoes.removeAt(index);
  }


  
  //experiencia
  adicionarExperiencia(): void {
    const experiencia = this.fb.group({
      cargo: [''],
      empresa: [''],
      descricao: ['']
    });

    this.experiencias.push(experiencia);

  }
  removerExperiencia(index: number): void {

    this.experiencias.removeAt(index);

  }


  
  //cursos
  adicionarCurso(): void {

    const curso = this.fb.group({

      nome: [''],

      instituicao: [''],

      cargaHoraria: ['']

    });

    this.cursos.push(curso);

  }

  removerCurso(index: number): void {

    this.cursos.removeAt(index);

  }


  //idiomas 
  adicionarIdioma(): void {

    const idioma = this.fb.group({

      idioma: [''],

      nivel: ['']

    });

    this.idiomas.push(idioma);

  }
  removerIdioma(index: number): void {

    this.idiomas.removeAt(index);

  }
  salvarCurriculo(): void { //salvar, função executada quando o user clica em salvar

    const dadosCurriculo = this.curriculoForm.value;

    console.log('Currículo:', dadosCurriculo);
  }
}