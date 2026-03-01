import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommentCardComponent } from './comment-card';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Store } from '@ngxs/store';
import { of } from 'rxjs';
import { Comment } from '../../store/comment/comment.model';
import { EditComment } from '../../store/comment/comment.action';
import { beforeEach, describe, expect, it, vi } from 'vitest';

class MockStore {
  dispatch = vi.fn();
  select = vi.fn().mockReturnValue(of(null));
  selectSnapshot = vi.fn().mockReturnValue({ comments: [] });
}

describe('CommentCardComponent – saveComment only', () => {
  let component: CommentCardComponent;
  let fixture: ComponentFixture<CommentCardComponent>;
  let store: MockStore;

  const dummy: Comment = {
    id: 1,
    content: 'foo',
    createdAt: '',
    score: 0,
    user: { username: 'u', image: { png: '' } },
    replies: []
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommentCardComponent, FormsModule, CommonModule],
      providers: [{ provide: Store, useClass: MockStore }],
    }).compileComponents();

    fixture = TestBed.createComponent(CommentCardComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store) as unknown as MockStore;

    component.comment = { ...dummy };
    fixture.detectChanges(); // runs ngOnInit
  });

  it('alerts when text unchanged', () => {
    vi.spyOn(window, 'alert');
    component.originalComment = 'same';
    component.editInputText = 'same';
    component.comment.content = 'same';

    component.saveComment(dummy.id);

    expect(window.alert).toHaveBeenCalledWith('You did not make any changes');
    expect(store.dispatch).not.toHaveBeenCalled();
  });

  it('dispatches EditComment when text changed', () => {
    component.originalComment = 'old';
    component.editInputText = 'new text';
    component.comment.content = 'old';

    component.saveComment(dummy.id);

    expect(store.dispatch).toHaveBeenCalledWith(expect.any(EditComment));
    expect(component.isEdit).toBe(false);
    expect(component.editInputText).toBe('');
  });
});