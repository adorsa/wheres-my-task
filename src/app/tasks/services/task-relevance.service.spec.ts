import { TestBed } from '@angular/core/testing';

import { TaskRelevanceService } from './task-relevance.service';
import { Task } from '../../core/models/task';
import { TaskStatus } from '../../core/models/task-status';
import { UserLocation } from '../../core/models/user-location';

describe('TaskRelevanceService', () => {
  let service: TaskRelevanceService;

  beforeEach(() => {
    service = new  TaskRelevanceService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('sets a time-based task as relevant when current time is within its time frame', () => {
    const now = new Date('2026-01-01T10:00:00Z');
    const task: Task = {
      id: '1',
      title: 'Test task',
      status: TaskStatus.Active,
      createdAt: new Date(),
      timeConstraint: {
        start: new Date('2026-01-01T09:00:00Z'),
        end: new Date('2026-01-01T11:00:00Z')
      }
    };

    const result = service.evaluate([task], now);

    expect(result.length).toBe(1);
    expect(result[0].task).toBe(task);
  });

  it('marks a time-based task as overdue when current time is after the time frame', () => {
    const now = new Date('2026-01-01T12:00:00Z');

    const task: Task = {
      id: '1',
      title: 'Overdue task',
      status: TaskStatus.Active,
      createdAt: new Date(),
      timeConstraint: {
        start: new Date('2026-01-01T09:00:00Z'),
        end: new Date('2026-01-01T11:00:00Z')
      }
    };

    const result = service.evaluate([task], now);

    expect(result.length).toBe(1);
    expect(result[0].task).toBe(task);
    expect(result[0].isOverdue).toBeTrue();
  });

  it('marks a time-based task as relevant when current time is close to the time frame', () => {
    const now = new Date('2026-01-01T08:50:00Z');

    const task: Task = {
      id: '1',
      title: 'Upcoming task',
      status: TaskStatus.Active,
      createdAt: new Date(),
      timeConstraint: {
        start: new Date('2026-01-01T09:00:00Z'),
        end: new Date('2026-01-01T11:00:00Z')
      }
    };

    const result = service.evaluate([task], now);

    expect(result.length).toBeGreaterThan(0);
    expect(result[0].task).toBe(task);
  });

  it('marks a time-based task as not relevant when current time is far from the time frame', () => {
    const now = new Date('2026-01-01T07:00:00Z');

    const task: Task = {
      id: '1',
      title: 'Distant task',
      status: TaskStatus.Active,
      createdAt: new Date(),
      timeConstraint: {
        start: new Date('2026-01-01T09:00:00Z'),
        end: new Date('2026-01-01T11:00:00Z')
      }
    };

    const result = service.evaluate([task], now);

    expect(result.length).toBe(0);
  });

  it('marks a location-based task as relevant when current location is close to the task location', () => {
    const now = new Date();
    const location: UserLocation = {latitude: 0, longitude: 0};

    const task: Task = {
      id: '1',
      title: 'Near task',
      status: TaskStatus.Active,
      createdAt: new Date(),
      locationConstraint: {
        latitude: 0.00001,
        longitude: 0
      }
    };

    const result = service.evaluate([task], now, location);

    expect(result.length).toBe(1);
    expect(result[0].relevanceScore).toBeGreaterThan(0);
  });

  it('marks a location-based task as not relevant when current location is far to the task location', () => {
    const now = new Date();
    const location: UserLocation = {latitude: 0, longitude: 0};

    const task: Task = {
      id: '1',
      title: 'Far task',
      status: TaskStatus.Active,
      createdAt: new Date(),
      locationConstraint: {
        latitude: 5,
        longitude: 0
      }
    };

    const result = service.evaluate([task], now, location);

    expect(result.length).toBe(1);
    expect(result[0].relevanceScore).toBeGreaterThan(0);
  });
});
