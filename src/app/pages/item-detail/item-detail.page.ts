import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { DataService, Item } from '../../services/data.service';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.page.html',
  styleUrls: ['./item-detail.page.scss'],
  standalone: false,
})
export class ItemDetailPage implements OnInit {

  //declara uma propriedade 'item' do tipo Item, inicializado com valores vazios
  //será usada para vincular os dados do formulário (nome e descrição)
  item: Item = {
    name: '',
    description: ''
  };

  //declara 'itemId' que pode ser uma string ou null. Armazenará o ID do item se estivermos editando
  itemId: string | null = null;
  //uma flag booleana para verificar se estamos criando um novo item (true) ou editando um existente (false)
  isNewItem = true; 

  constructor(private route: ActivatedRoute,private dataService: DataService,private router: Router,
              private loadingController: LoadingController, private toastController: ToastController) { }

  ngOnInit() {
    this.itemId = this.route.snapshot.paramMap.get('id');
  //verifica se um ID de item foi encontrado na URL.
  if (this.itemId) {
    //se um ID existe, significa que estamos editando um item existente
    this.isNewItem = false;
    //chama o método para carregar os dados do item
    this.loadItem();
    }
  }

  async loadItem() {
  //cria um controle de carregamento (loading spinner) com uma mensagem
  const loading = await this.loadingController.create({
    message: 'Carregando item...'
  });

  //apresenta o loading spinner na tela
  await loading.present();

  //chama o método getItem do DataService para obter o item pelo ID
  //o '!' (non-null assertion operator) informa ao TypeScript que itemId não será null aqui
  this.dataService.getItem(this.itemId!).subscribe(res => {
    //dispensa o loading spinner assim que a resposta for recebida
    loading.dismiss();

    //verifica se o item foi encontrado
    if (res) {
      //se encontrado, atribui os dados retornados à propriedade 'item' do componente
      this.item = res;
    } else {
      //se o item não for encontrado, exibe um toast de erro
      this.presentToast('Item não encontrado!', 'danger');

      //redireciona o usuário de volta para a página inicial
      this.router.navigateByUrl('/home');
    }
  }, err => { //trata erros na requisição
    //dispensa o loading spinner em caso de erro
    loading.dismiss();

    //exibe um toast de erro genérico
    this.presentToast('Erro ao carregar item.', 'danger');

    //redireciona o usuário de volta para a página inicial
    this.router.navigateByUrl('/home');
  });
}

async saveItem() {
  //cria um controle de carregamento (loading spinner) com uma mensagem
  const loading = await this.loadingController.create({
    message: 'Salvando item...'
  });

  //apresenta o loading spinner na tela
  await loading.present();

  //verifica se a flag 'isNewItem' é verdadeira, indicando que é um novo item
  if (this.isNewItem) {
    //se for um novo item, chama o método 'addItem' do DataService
    this.dataService.addItem(this.item).then(() => {
      //dispensa o loading spinner após o sucesso
      loading.dismiss();

      //exibe um toast de sucesso
      this.presentToast('Item adicionado com sucesso!', 'success');

      //redireciona o usuário para a página inicial
      this.router.navigateByUrl('/home');
    }, err => { //trata erros ao adicionar
      //dispensa o loading spinner em caso de erro
      loading.dismiss();

      //exibe um toast de erro
      this.presentToast('Erro ao adicionar item.', 'danger');
    });
  } else { //se 'isNewItem' for falsa, estamos atualizando um item existente
    //chama o método 'updateItem' do DataService
    this.dataService.updateItem(this.item).then(() => {
      //dispensa o loading spinner após o sucesso
      loading.dismiss();

      //exibe um toast de sucesso
      this.presentToast('Item atualizado com sucesso!', 'success');

      //redireciona o usuário para a página inicial
      this.router.navigateByUrl('/home');
    }, err => { // Trata erros ao atualizar.
      //dispensa o loading spinner em caso de erro
      loading.dismiss();

      //exibe um toast de erro
      this.presentToast('Erro ao atualizar item.', 'danger');
    });
  }
}

async presentToast(message: string, color: string = 'primary') {
  //cria um controle de toast com a mensagem, duração e cor
  const toast = await this.toastController.create({
    message: message,
    duration: 2000, //o toast desaparecerá após 2 segundos
    color: color 
  });

  //apresenta o toast na tela
  toast.present();
}

}