import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { CoursesService } from '../../courses/courses.service';

@Injectable()
export class AuthorGuard implements CanActivate {
  constructor(private courseService: CoursesService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { id, type, user } = request.params;

    let entity;

    switch (type) {
      case 'transactions':
        entity = 'test';
        break;
      case 'course':
        entity = await this.courseService.findOne(id);
        break;
      default:
        break;
    }

    return entity && user && entity.user.id === user.id;
  }
}
