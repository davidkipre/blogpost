import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Blogpost } from './models/blogpost';

@Injectable({
  providedIn: 'root'
})

export class BlogpostService {
  baseUrl = 'http://localhost:3000/api/v1/blog-posts';//url de notre backend sur lequel on fait les requetes GET DELETE POST...
  
  //creation du Subject
  private blogpostCreated = new Subject<string>() //gerer la creation d'un blogpost
  
  uploadedImage = ''; //gerer l'image

  //declaré private httpClient: HttpClient dans le constructor on parle de injection de dependance 
  constructor(private httpClient: HttpClient) { }
  
  //creer un nouveau post avec 'post' variable s'abonnant a Blogpost le schema 
  createBlogpost(post: Blogpost) {
    return this.httpClient.post<Blogpost>(this.baseUrl, post)
  }
  uploadImage(formData: FormData) {
    return this.httpClient.post<any>(`${this.baseUrl}/images`, formData); //gestion de l'image
  }


//attribue un id a notre subject créé
  dispatchBlogpostCreated(id: string) {
    this.blogpostCreated.next(id);
  }

   //retourne notre subject en tant que Observable
   handleBlogpostCreated() {
    return this.blogpostCreated.asObservable();
  }

  //recuperer tous les blogpost et Blogpost correspond au schema créé dans le fichier blogpost.ts
     getBlogposts(): Observable<Blogpost[]> {
      return this.httpClient.get<Blogpost[]>(`${this.baseUrl}/`); //requete directe sur blog-post du fichier index
}

getBlogPostById(id: string): Observable<Blogpost> {
  return this.httpClient.get<Blogpost>(`${this.baseUrl}/${id}`); //recuperer et afficher blogpost specifique
}

//mettre a jour ou editer un blogpost par son Id
updateBlogpost(id: string, blogpost: Blogpost) {
  return this.httpClient.put(`${this.baseUrl}/${id}`, blogpost);
}

//supprimer un blogpost avec son ID
deleteSingleBlogpost(id: string) {
  return this.httpClient.delete(`${this.baseUrl}/${id}`)
}
//supprime plusieurs blogposts selectionnés
deleteBlogposts(ids: string[]) {
  const allIds = ids.join(',');
  return this.httpClient.delete(`${this.baseUrl}/?ids=${allIds}`);
}

}
