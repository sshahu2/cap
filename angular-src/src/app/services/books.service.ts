import { Injectable} from '@angular/core';
import { Init } from "./initial-Books";
//import { Injectable } from '@angular/core';
import {Http,Headers} from '@angular/http';
import'rxjs/add/operator/map';

@Injectable()
export class BooksService extends Init {
  constructor(private http:Http) {
    super();
    console.log("Initializing Books service ...");
    this.load();
  }

  getBookCount() {
    let Books = JSON.parse(localStorage.getItem('Books'));
    return Books.length;
    //count of array of assessment objects 
  }
  getQuestionCount(id:any,id_id:any,id_id_id:any) {
    let Books = JSON.parse(localStorage.getItem('Books'));
    return Books[id-1].domain[id_id-1].subdomain[id_id_id-1].question.length;
    //number of questions in subdomain
  }
  

  getBooks() {
    //array of assessment objects
    let headers=new Headers();
   
   

headers.append('Content-Type','application/json');
return this.http.get('http://localhost:3000/auth/books',{headers:headers}).map(res=>res.json());
 
  }
  getScore(id:any) {
    //domain score
    let Books = JSON.parse(localStorage.getItem('Books'));
    let score:number[]=[];
    for(let i=0;i<Books[id-1].domain.length;i++)
    {
      score[i]=Books[id-1].domain[i].dom_score;
    }
    console.log("abey score="+score);
    return score;
  }
   getSubdomain(id:any,id_id:any) {
     //array of subdomains
    let Books = JSON.parse(localStorage.getItem('Books'));
    let subdom:any[]=[];

    for(let i=0;i<Books[id-1].domain[id_id-1].subdomain.length;i++)
    {
      console.log(Books[id-1].domain[id_id-1].subdomain[i]);
      subdom[i]=Books[id-1].domain[id_id-1].subdomain[i];
    }
    
    return subdom;
  }
  getdomain(id:any) {
    //array of domains
    let Books = JSON.parse(localStorage.getItem('Books'));
    let dom:any[]=[];
    let flag:any;
    let score:any;
    
    for(let i=0;i<Books[id-1].domain.length;i++)
    {
      dom[i]=Books[id-1].domain[i];
      
    }
    console.log("bahar hai");
    for(let i=0;i<Books[id-1].domain.length;i++)
    {
      console.log("andar aa gaya");
      score=0;
      flag=1;
      for(let j=0;j<Books[id-1].domain[i].subdomain.length;j++)
      {
        
        if(Books[id-1].domain[i].subdomain[j].sub_score==0)
        {
          flag=0;
          score="Subdomain not complete";
          console.log("flag=0");
          break;
        }
        console.log("out");
        score+=Books[id-1].domain[i].subdomain[j].sub_score;
        console.log(score);
      }
      console.log("bahaar aa gaya");
      if(flag==0)
       {
         console.log("flag");
        Books[id-1].domain[i].dom_score=score;
        console.log(score);
        }
      else
      {
         console.log("chalo niklo");
        Books[id-1].domain[i].dom_score=score/Books[id-1].domain[i].subdomain.length;
       
      }

    }
    
    localStorage.setItem('Books', JSON.stringify(Books));
    return dom;
  }
  getdomainTitle(id:any) {
    //domain title
    let Books = JSON.parse(localStorage.getItem('Books'));
    let dom:any[]=[];
    let flag:any;
    let score:any;
    
    for(let i=0;i<Books[id-1].domain.length;i++)
    {
      dom[i]=Books[id-1].domain[i].title;
      
    }
    console.log("bahar hai");
   
    
    return dom;
  }
  

  getBook(id: any) {
    //single assessment object
    console.log("Hiiiiiiii");
    let Books = JSON.parse(localStorage.getItem('Books'));
    let book:any = null;
    for (let i = 0; i < Books.length; i++) {
      if (Books[i].id == id) {
        book = Books[i];
        break;
      }
    }
    //console.log(book);
    return book;
  }
  getQuestion(id:any,id_id: any,id_id_id:any) {
    //array of questions
    let Books = JSON.parse(localStorage.getItem('Books'));
    console.log("teesri aankh");
    //let question:any = null;
    let question:any[]=[];
   /* for (let i in Books.subdomain) {
   // x += "<h1>" + Books.subdomain[i].name + "</h1>";
    for (let j in Books.subdomain[i].question) {

        question+= Books.subdomain[i].question[j];
    }
}*/
console.log("Hiiiiiii");
    for(let i=0;i<Books[id-1].domain[id_id-1].subdomain[id_id_id-1].question.length;i++)
    {
      //console.log(i);
        question[i]=Books[id-1].domain[id_id-1].subdomain[id_id_id-1].question[i];
    }
    return question;
  }

  addBook(newBook: any) {
    let Books = JSON.parse(localStorage.getItem('Books'));
    Books.push(newBook);
    localStorage.setItem('Books', JSON.stringify(Books));
  }

  updateBook(updatedBook: any) {
    let Books = JSON.parse(localStorage.getItem('Books'));
    for (let i = 0; i < Books.length; i++) {
      if (Books[i].id == updatedBook.id) {
        Books[i] = updatedBook;
      }
    }
    localStorage.setItem('Books', JSON.stringify(Books));
  }
  updateScore(score: any,id_id:any,id:any,id_id_id:any) {
    //subdomain score is obtained
   let Books = JSON.parse(localStorage.getItem('Books'));
    let book = Books[id-1];
    
    console.log(book);
        let question=book.domain[id_id-1].subdomain[id_id_id-1];
        console.log(question);
        question.sub_score=score;
        console.log(question.sub_score);
        
    localStorage.setItem('Books', JSON.stringify(Books));
  }
 

  deleteBook(id: any) {
    let Books = JSON.parse(localStorage.getItem('Books'));
    for (let i = 0; i < Books.length; i++) {
      if (Books[i].id == id) {
        Books.splice(i, 1);
      }
       
    }
    localStorage.setItem('Books', JSON.stringify(Books));
  }
}
