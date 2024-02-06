// package: api
// file: api.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "grpc";
import * as api_pb from "./api_pb";
import * as google_protobuf_timestamp_pb from "google-protobuf/google/protobuf/timestamp_pb";
import * as google_protobuf_duration_pb from "google-protobuf/google/protobuf/duration_pb";

interface ITaskServiceService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    start: ITaskServiceService_IStart;
    stop: ITaskServiceService_IStop;
}

interface ITaskServiceService_IStart extends grpc.MethodDefinition<api_pb.TaskStartRequest, api_pb.TaskStartResponse> {
    path: "/api.TaskService/Start";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<api_pb.TaskStartRequest>;
    requestDeserialize: grpc.deserialize<api_pb.TaskStartRequest>;
    responseSerialize: grpc.serialize<api_pb.TaskStartResponse>;
    responseDeserialize: grpc.deserialize<api_pb.TaskStartResponse>;
}
interface ITaskServiceService_IStop extends grpc.MethodDefinition<api_pb.TaskStopRequest, api_pb.TaskStopResponse> {
    path: "/api.TaskService/Stop";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<api_pb.TaskStopRequest>;
    requestDeserialize: grpc.deserialize<api_pb.TaskStopRequest>;
    responseSerialize: grpc.serialize<api_pb.TaskStopResponse>;
    responseDeserialize: grpc.deserialize<api_pb.TaskStopResponse>;
}

export const TaskServiceService: ITaskServiceService;

export interface ITaskServiceServer {
    start: grpc.handleUnaryCall<api_pb.TaskStartRequest, api_pb.TaskStartResponse>;
    stop: grpc.handleUnaryCall<api_pb.TaskStopRequest, api_pb.TaskStopResponse>;
}

export interface ITaskServiceClient {
    start(request: api_pb.TaskStartRequest, callback: (error: grpc.ServiceError | null, response: api_pb.TaskStartResponse) => void): grpc.ClientUnaryCall;
    start(request: api_pb.TaskStartRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: api_pb.TaskStartResponse) => void): grpc.ClientUnaryCall;
    start(request: api_pb.TaskStartRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: api_pb.TaskStartResponse) => void): grpc.ClientUnaryCall;
    stop(request: api_pb.TaskStopRequest, callback: (error: grpc.ServiceError | null, response: api_pb.TaskStopResponse) => void): grpc.ClientUnaryCall;
    stop(request: api_pb.TaskStopRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: api_pb.TaskStopResponse) => void): grpc.ClientUnaryCall;
    stop(request: api_pb.TaskStopRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: api_pb.TaskStopResponse) => void): grpc.ClientUnaryCall;
}

export class TaskServiceClient extends grpc.Client implements ITaskServiceClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
    public start(request: api_pb.TaskStartRequest, callback: (error: grpc.ServiceError | null, response: api_pb.TaskStartResponse) => void): grpc.ClientUnaryCall;
    public start(request: api_pb.TaskStartRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: api_pb.TaskStartResponse) => void): grpc.ClientUnaryCall;
    public start(request: api_pb.TaskStartRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: api_pb.TaskStartResponse) => void): grpc.ClientUnaryCall;
    public stop(request: api_pb.TaskStopRequest, callback: (error: grpc.ServiceError | null, response: api_pb.TaskStopResponse) => void): grpc.ClientUnaryCall;
    public stop(request: api_pb.TaskStopRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: api_pb.TaskStopResponse) => void): grpc.ClientUnaryCall;
    public stop(request: api_pb.TaskStopRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: api_pb.TaskStopResponse) => void): grpc.ClientUnaryCall;
}
