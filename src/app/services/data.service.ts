import { Injectable } from '@angular/core';

//importações do SDK Modular do Firestore
import {
    Firestore,
    collection,
    doc,
    collectionData,
    docData,
    addDoc,
    updateDoc,
    deleteDoc,
    query,
    orderBy
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

//interface para o nosso item
export interface Item {
    id?: string;
    name: string;
    description: string;
    createdAt?: number;
}

@Injectable({
    providedIn: 'root'
})

export class DataService{
    constructor(private firestore: Firestore){
    }

    //retorna todos os itens
    getItems(): Observable<Item[]> {
        //cria uma referência para a coleção 'items'
        const itemsCollectionRef = collection(this.firestore, 'items');
        //cria uam query para ordenar por 'createdAt' em ordem decrescente
        const q = query(itemsCollectionRef, orderBy('createdAt', 'desc'));
        //retorna os dados da coleção como um Observable, incluindo o ID do documento
        return collectionData(q, { idField: 'id'}) as Observable<Item[]>;
    }

    //retorna um item especifico pelo ID
    getItem(id: string): Observable<Item | undefined> {
        //cria uma referência para o documento específico
        const itemDocRef = doc(this.firestore, `item/${id}`);
        //retorna os dados do documento como um Observable, incluindo o ID do documento
        return docData(itemDocRef, { idField: 'id' }) as Observable<Item | undefined>;
    }

    //adiciona um novo item
    addItem(item: Item){
        const itemsCollectionRef = collection(this.firestore, 'items');
        //adiciona um novo documento á coleção
        return addDoc(itemsCollectionRef, { ...item, createdAt: Date.now() });
    }

    //atualiza um item existente
    updateItem(item: Item){
        //cria uma referência para o documento específico
        const itemDocRef = doc(this.firestore, `items/${item.id}`);
        //atualiza o documento
        return updateDoc(itemDocRef, {name: item.name, description: item.description });
    }

    //deleta um item pelo ID
    deleteItem(id: string){
        //cria uma referência para o documento específico
        const itemDocRef = doc(this.firestore, `items/${id}`);
        //deleta o documento
        return deleteDoc(itemDocRef);
    }
}

