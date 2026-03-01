/// <reference types="vitest" />
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommentList } from './comment-list';
import { CommonModule } from '@angular/common';
import { CommentCardComponent } from '../comment-card/comment-card';
import { Comment } from '../../store/comment/comment.model';
import { beforeEach, describe, expect, it, vi } from 'vitest';

describe('CommentList', () => {
  let component: CommentList;
  let fixture: ComponentFixture<CommentList>;

  const dummyComment: Comment = {
    id: 1,
    content: 'test comment',
    createdAt: new Date().toISOString(),
    score: 5,
    user: { username: 'testuser', image: { png: 'avatar.png' } },
    replies: []
  };

  const dummyComment2: Comment = {
    id: 2,
    content: 'another comment',
    createdAt: new Date().toISOString(),
    score: 3,
    user: { username: 'otheruser', image: { png: 'avatar2.png' } },
    replies: []
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommentList, CommonModule, CommentCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CommentList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with empty comments array', () => {
    expect(component.comments).toEqual([]);
  });

  it('should accept comments input', () => {
    component.comments = [dummyComment, dummyComment2];
    fixture.detectChanges();
    expect(component.comments.length).toBe(2);
    expect(component.comments[0].content).toBe('test comment');
  });

  it('openReplyModal() sets replyingComment', () => {
    expect(component.replyingComment).toBeNull();
    component.openReplyModal(dummyComment);
    expect(component.replyingComment).toEqual(dummyComment);
  });

  it('onReplyClick() emits replyRequest with comment', () => {
    const emitSpy = vi.spyOn(component.replyRequest, 'emit');
    component.onReplyClick(dummyComment);
    expect(emitSpy).toHaveBeenCalledWith(dummyComment);
  });

  it('deleteRequest EventEmitter is defined', () => {
    expect(component.deleteRequest).toBeDefined();
  });

  it('replyRequest EventEmitter is defined', () => {
    expect(component.replyRequest).toBeDefined();
  });
});