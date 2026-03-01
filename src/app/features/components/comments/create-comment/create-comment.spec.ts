/// <reference types="vitest" />

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateComment } from './create-comment';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { CommentService } from '../../../../core/services/comment-service';
import { of } from 'rxjs';
import { AddComment } from '../../store/comment/comment.action';
import { Comment } from '../../store/comment/comment.model';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

class MockStore {
  dispatch = vi.fn();
  select = vi.fn().mockReturnValue(of([]));
}

class MockRouter {
  navigate = vi.fn();
}

class MockCommentService {}

describe('CreateComment', () => {
  let component: CreateComment;
  let fixture: ComponentFixture<CreateComment>;
  let store: MockStore;
  let router: MockRouter;

  const mockUser = {
    id: 1,
    username: 'testuser',
    image: { png: 'assets/avatars/testuser.png' }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CreateComment,
        FormsModule,
        CommonModule,
        MatIconModule,
        RouterModule
      ],
      providers: [
        { provide: Store, useClass: MockStore },
        { provide: Router, useClass: MockRouter },
        { provide: CommentService, useClass: MockCommentService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateComment);
    component = fixture.componentInstance;
    store = TestBed.inject(Store) as unknown as MockStore;
    router = TestBed.inject(Router) as unknown as MockRouter;

    // Mock localStorage
    localStorage.setItem('currentUser', JSON.stringify(mockUser));

    // Mock the store select to return the user
    store.select = vi.fn().mockImplementation((selector) => {
      if (selector.toString().includes('currentUser')) {
        return of(mockUser);
      }
      return of([]);
    });

    fixture.detectChanges();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should redirect to login if no user in localStorage on init', () => {
    localStorage.clear();
    const newFixture = TestBed.createComponent(CreateComment);
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('getUserImage() returns correct image path for known username', () => {
    expect(component.getUserImage('yoda')).toBe('assets/avatars/yoda.png');
    expect(component.getUserImage('vader')).toBe('assets/avatars/vader.png');
  });

  it('getUserImage() returns default image for unknown username', () => {
    expect(component.getUserImage('unknown')).toBe('assets/avatars/default.png');
    expect(component.getUserImage('')).toBe('assets/avatars/default.png');
  });

  it('addComment() should not dispatch if text is empty', () => {
    component.commentText = '';
    component.addComment();
    expect(store.dispatch).not.toHaveBeenCalled();
  });

  it('addComment() should not dispatch if text is only whitespace', () => {
    component.commentText = '   ';
    component.addComment();
    expect(store.dispatch).not.toHaveBeenCalled();
  });

  it('addComment() should redirect to login if no stored user', () => {
    localStorage.clear();
    component.commentText = 'test comment';
    component.addComment();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('addComment() should dispatch AddComment action with new comment', () => {
    component.commentText = 'hello world';
    component.addComment();
    expect(store.dispatch).toHaveBeenCalledWith(expect.any(AddComment));
  });

  it('addComment() should clear text after dispatch', () => {
    component.commentText = 'test comment';
    component.addComment();
    expect(component.commentText).toBe('');
  });

  it('autoGrow() should set textarea height to scrollHeight', () => {
    const textarea = document.createElement('textarea');
    textarea.style.height = '10px';
    textarea.value = 'line1\nline2\nline3';

    Object.defineProperty(textarea, 'scrollHeight', { get: () => 150 });

    component.autoGrow(textarea);

    expect(textarea.style.height).not.toBe('10px');
    expect(textarea.style.height).toBeTruthy();
  });

  it('autoGrow() should set minimum height of 120px', () => {
    const textarea = document.createElement('textarea');
    Object.defineProperty(textarea, 'scrollHeight', { get: () => 50 });

    component.autoGrow(textarea);

    const height = parseInt(textarea.style.height);
    expect(height).toBeGreaterThanOrEqual(120);
  });
});