import { Inject, Injectable } from '@nestjs/common';
import { Observable, firstValueFrom } from 'rxjs';
import { Snapshot, SnapshotGRPC } from './snapshot.entity';
import { ClientGrpc } from '@nestjs/microservices';
import { fromGRPC } from './utils/fromGRPC';
import { MetricGateway } from 'src/metric-gateway/gateway';
import { randomUUID } from 'crypto';

interface SnapshotServiceGRPC {
  list: (data: { Group: string }) => Observable<{ Snapshots: SnapshotGRPC[] }>;
  stream: (data: { id: string }) => Observable<{ snapshot: SnapshotGRPC }>;
}

@Injectable()
export class SnapshotService {
  private snapshotServiceGRPC: SnapshotServiceGRPC;

  constructor(
    @Inject('SNAPSHOT_SERVICE') private client: ClientGrpc,
    private metricGateway: MetricGateway,
  ) {}

  onModuleInit() {
    this.snapshotServiceGRPC =
      this.client.getService<SnapshotServiceGRPC>('SnapshotService');

    this.stream(randomUUID());
  }

  async list(group: string): Promise<Snapshot[]> {
    const result = await firstValueFrom(
      this.snapshotServiceGRPC.list({ Group: group }),
    );

    if (!result || !result.Snapshots) {
      return [];
    }

    return result.Snapshots.map((snapshot) => fromGRPC(snapshot));
  }

  async stream(id: string) {
    const result = this.snapshotServiceGRPC.stream({ id });

    result.subscribe((snapshot) => {
      this.metricGateway.send(fromGRPC(snapshot.snapshot));
    });
  }
}
