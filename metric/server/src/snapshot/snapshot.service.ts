import { Inject, Injectable } from '@nestjs/common';
import { Observable, Observer, Subscription, firstValueFrom } from 'rxjs';
import { Snapshot, SnapshotGRPC } from './snapshot.entity';
import { ClientGrpc } from '@nestjs/microservices';
import { fromGRPC } from './utils/fromGRPC';
import { MetricGateway } from 'src/metric-gateway/gateway';
import { randomUUID } from 'crypto';
import { ResubscribeService } from 'src/resubscribe/resubscribe.service';

export interface SnapshotServiceGRPC {
  list: (data: { Group: string }) => Observable<{ Snapshots: SnapshotGRPC[] }>;
  stream: (data: { id: string }) => Observable<{ Snapshots: SnapshotGRPC[] }>;
}

@Injectable()
export class SnapshotService {
  private snapshotServiceGRPC: SnapshotServiceGRPC;

  constructor(
    @Inject('SNAPSHOT_SERVICE') private client: ClientGrpc,
    private metricGateway: MetricGateway,
    private resubscribeService: ResubscribeService,
  ) {}

  onModuleInit() {
    this.snapshotServiceGRPC =
      this.client.getService<SnapshotServiceGRPC>('SnapshotService');

    const observer: Observer<{ Snapshots: SnapshotGRPC[] }> = {
      next: (snapshots) => {
        if (snapshots.Snapshots)
          this.metricGateway.send(
            snapshots.Snapshots.map((snapshot) => fromGRPC(snapshot)),
          );
      },
      error: () => {
        console.log('Subscription error');
      },
      complete: () => {
        console.log('Subscription closed');
      },
    };

    this.resubscribeService.start(
      this.snapshotServiceGRPC.stream({ id: randomUUID() }),
      observer,
    );
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
}
