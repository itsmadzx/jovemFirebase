import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-curriculo',
  templateUrl: './curriculo.page.html',
  styleUrls: ['./curriculo.page.scss'],
  standalone: false
})
export class CurriculoPage implements OnInit {

  curriculoForm!: FormGroup;

  constructor(private fb: FormBuilder, private alertController: AlertController) {}

  ngOnInit() {
    this.curriculoForm = this.fb.group({
      nome: ['', [
        Validators.required,
        Validators.minLength(3)
      ]],

      email: ['', [
        Validators.required,
        Validators.email
      ]],

      telefone: ['', [
        Validators.required,
        Validators.pattern(/^\(\d{2}\)\s?\d{4,5}-\d{4}$/)
      ]],

      objetivo: [''],
      resumo: [''],

      formacoes: this.fb.array([]),

      experiencias: this.fb.array([]),

      cursos: this.fb.array([]),

      habilidades: [''],

      idiomas: this.fb.array([])
    });
  }

  // =========================
  // GETTERS
  // =========================

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

  // =========================
  // FORMAÇÃO
  // =========================

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

  // =========================
  // EXPERIÊNCIA
  // =========================

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

  // =========================
  // CURSOS
  // =========================

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

  // =========================
  // IDIOMAS
  // =========================

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

  // =========================
  // TELEFONE
  // =========================

  formatarTelefone(event: any): void {
    let valor = event.target.value || '';

    // Mantém somente números
    valor = valor.replace(/\D/g, '');

    // Limita a 11 números
    valor = valor.substring(0, 11);

    if (valor.length <= 10) {
      valor = valor.replace(
        /^(\d{2})(\d{4})(\d{0,4})/,
        '($1) $2-$3'
      );
    } else {
      valor = valor.replace(
        /^(\d{2})(\d{5})(\d{0,4})/,
        '($1) $2-$3'
      );
    }

    this.curriculoForm
      .get('telefone')
      ?.setValue(valor, { emitEvent: false });
  }

  // =========================
  // SALVAR
  // =========================
async salvarCurriculo(): Promise<void> {

  if (this.curriculoForm.invalid) {

    this.curriculoForm.markAllAsTouched();

    return;
  }

  const dadosCurriculo = this.curriculoForm.value;

  console.log('Currículo:', dadosCurriculo);

  const alert = await this.alertController.create({
    header: 'Currículo salvo!',
    message: 'Seu currículo foi salvo com sucesso.',
    buttons: ['OK']
  });

  await alert.present();
}
}