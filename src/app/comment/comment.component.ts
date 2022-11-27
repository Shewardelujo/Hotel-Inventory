import { ActivatedRoute } from '@angular/router';
import { CommentService } from './comment.service';
import { Component, OnInit } from '@angular/core';
import { pluck } from 'rxjs';
import { Comments } from './comment';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent implements OnInit {
  comments$ = this.commentService.getComments();

  comment$ = this.activatedRoute.data.pipe(pluck('comments'));

  comments: Comments[] = [];

  constructor(
    private commentService: CommentService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // this.activatedRoute.data.subscribe((data) => {
    //   this.comments = data['comments'];
    // });
  }
}
