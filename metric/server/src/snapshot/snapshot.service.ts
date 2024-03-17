import { Inject, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Snapshot } from './snapshot.entity';
import { ClientGrpc } from '@nestjs/microservices';

interface SnapshotServiceGRPC {
  list: (data: { group: string }) => Observable<Snapshot[]>;
}

@Injectable()
export class SnapshotService {
  private snapshotServiceGRPC: SnapshotServiceGRPC;

  constructor(@Inject('SNAPSHOT_SERVICE') private client: ClientGrpc) {}

  onModuleInit() {
    this.snapshotServiceGRPC =
      this.client.getService<SnapshotServiceGRPC>('SnapshotService');
  }

  list(group: string) {
    return this.snapshotServiceGRPC.list({ group });
  }
}
