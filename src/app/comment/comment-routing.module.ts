import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommentComponent } from './comment.component';
import { CommentGuard } from './guard/comment.guard';

const routes: Routes = [
  {
    path: '',
    component: CommentComponent,
    resolve: { comments: CommentGuard }, // so we are saying that the data we return here must be resolved before we route to this page
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommentRoutingModule {}
