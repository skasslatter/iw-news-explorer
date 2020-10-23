import { Pipe} from '@angular/core';

@Pipe({
  name: 'limitTo'
})
export class TruncatePipe {
  transform(value: string, limit: number = 10) : string {
    if (!value) {
      return ''
    }
    return value.length > limit ? value.substring(0, limit) + '...' : value;
  }
}
