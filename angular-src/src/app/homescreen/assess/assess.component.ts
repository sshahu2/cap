import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from "@angular/router";
import { DomainServiceService } from '../domain-service.service';
import { BooksService } from "./../../services/books.service";

@Component({
  selector: 'app-assess',
  templateUrl: './assess.component.html',
  styleUrls: ['./assess.component.css']
})
export class AssessComponent implements OnInit {
    
  Books: any[];
  Tit="Delete";
  constructor(private _booksService: BooksService) { }
  filterString="";
  ngOnInit() {
      this.authService.getprofile().subscribe(profilem=>{
      this.userm=profilem.userm;
  
  
       this.Books = JSON.parse(localStorage.getItem('Books'));
    let score:any;
    let flag=1;;
    for(let i=0;i<Books.length;i++)
    {
       score=0;
       
      for(let j=0;j<Books[i].domain.length;j++)
      {
        if(Books[i].domain[j].dom_score==="Subdomain not complete")
        {
          flag=0;
          score="Assessment not complete";
        break;}
        score+=Books[i].domain[j].dom_score;
      }
      if(flag==0)
      {Books[i].score=score;
      console.log("score hai"+score);}
      else
      {Books[i].score=score/Books[i].domain.length;
      console.log("score hai"+score);}
    }
    localStorage.setItem('Books', JSON.stringify(Books));
    return Books;
  }
},
  err=>{
      console.log(err);
      return false;
    }
    
    
    );
  }