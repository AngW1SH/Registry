// package: api
// file: api.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";
import * as google_protobuf_timestamp_pb from "google-protobuf/google/protobuf/timestamp_pb";
import * as google_protobuf_duration_pb from "google-protobuf/google/protobuf/duration_pb";

export class TaskStartInfo extends jspb.Message { 
    getMetric(): string;
    setMetric(value: string): TaskStartInfo;

    hasUpdatedAt(): boolean;
    clearUpdatedAt(): void;
    getUpdatedAt(): google_protobuf_timestamp_pb.Timestamp | undefined;
    setUpdatedAt(value?: google_protobuf_timestamp_pb.Timestamp): TaskStartInfo;

    hasUpdateRate(): boolean;
    clearUpdateRate(): void;
    getUpdateRate(): google_protobuf_duration_pb.Duration | undefined;
    setUpdateRate(value?: google_protobuf_duration_pb.Duration): TaskStartInfo;
    getWeight(): number;
    setWeight(value: number): TaskStartInfo;
    clearDataList(): void;
    getDataList(): Array<string>;
    setDataList(value: Array<string>): TaskStartInfo;
    addData(value: string, index?: number): string;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): TaskStartInfo.AsObject;
    static toObject(includeInstance: boolean, msg: TaskStartInfo): TaskStartInfo.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: TaskStartInfo, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): TaskStartInfo;
    static deserializeBinaryFromReader(message: TaskStartInfo, reader: jspb.BinaryReader): TaskStartInfo;
}

export namespace TaskStartInfo {
    export type AsObject = {
        metric: string,
        updatedAt?: google_protobuf_timestamp_pb.Timestamp.AsObject,
        updateRate?: google_protobuf_duration_pb.Duration.AsObject,
        weight: number,
        dataList: Array<string>,
    }
}

export class TaskInfo extends jspb.Message { 
    getId(): string;
    setId(value: string): TaskInfo;
    getMetric(): string;
    setMetric(value: string): TaskInfo;

    hasUpdatedAt(): boolean;
    clearUpdatedAt(): void;
    getUpdatedAt(): google_protobuf_timestamp_pb.Timestamp | undefined;
    setUpdatedAt(value?: google_protobuf_timestamp_pb.Timestamp): TaskInfo;

    hasUpdateRate(): boolean;
    clearUpdateRate(): void;
    getUpdateRate(): google_protobuf_duration_pb.Duration | undefined;
    setUpdateRate(value?: google_protobuf_duration_pb.Duration): TaskInfo;
    getWeight(): number;
    setWeight(value: number): TaskInfo;
    clearDataList(): void;
    getDataList(): Array<string>;
    setDataList(value: Array<string>): TaskInfo;
    addData(value: string, index?: number): string;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): TaskInfo.AsObject;
    static toObject(includeInstance: boolean, msg: TaskInfo): TaskInfo.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: TaskInfo, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): TaskInfo;
    static deserializeBinaryFromReader(message: TaskInfo, reader: jspb.BinaryReader): TaskInfo;
}

export namespace TaskInfo {
    export type AsObject = {
        id: string,
        metric: string,
        updatedAt?: google_protobuf_timestamp_pb.Timestamp.AsObject,
        updateRate?: google_protobuf_duration_pb.Duration.AsObject,
        weight: number,
        dataList: Array<string>,
    }
}

export class TaskStartRequest extends jspb.Message { 

    hasTask(): boolean;
    clearTask(): void;
    getTask(): TaskStartInfo | undefined;
    setTask(value?: TaskStartInfo): TaskStartRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): TaskStartRequest.AsObject;
    static toObject(includeInstance: boolean, msg: TaskStartRequest): TaskStartRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: TaskStartRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): TaskStartRequest;
    static deserializeBinaryFromReader(message: TaskStartRequest, reader: jspb.BinaryReader): TaskStartRequest;
}

export namespace TaskStartRequest {
    export type AsObject = {
        task?: TaskStartInfo.AsObject,
    }
}

export class TaskStartResponse extends jspb.Message { 

    hasTask(): boolean;
    clearTask(): void;
    getTask(): TaskInfo | undefined;
    setTask(value?: TaskInfo): TaskStartResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): TaskStartResponse.AsObject;
    static toObject(includeInstance: boolean, msg: TaskStartResponse): TaskStartResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: TaskStartResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): TaskStartResponse;
    static deserializeBinaryFromReader(message: TaskStartResponse, reader: jspb.BinaryReader): TaskStartResponse;
}

export namespace TaskStartResponse {
    export type AsObject = {
        task?: TaskInfo.AsObject,
    }
}

export class TaskStopRequest extends jspb.Message { 
    getId(): string;
    setId(value: string): TaskStopRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): TaskStopRequest.AsObject;
    static toObject(includeInstance: boolean, msg: TaskStopRequest): TaskStopRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: TaskStopRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): TaskStopRequest;
    static deserializeBinaryFromReader(message: TaskStopRequest, reader: jspb.BinaryReader): TaskStopRequest;
}

export namespace TaskStopRequest {
    export type AsObject = {
        id: string,
    }
}

export class TaskStopResponse extends jspb.Message { 

    hasTask(): boolean;
    clearTask(): void;
    getTask(): TaskInfo | undefined;
    setTask(value?: TaskInfo): TaskStopResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): TaskStopResponse.AsObject;
    static toObject(includeInstance: boolean, msg: TaskStopResponse): TaskStopResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: TaskStopResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): TaskStopResponse;
    static deserializeBinaryFromReader(message: TaskStopResponse, reader: jspb.BinaryReader): TaskStopResponse;
}

export namespace TaskStopResponse {
    export type AsObject = {
        task?: TaskInfo.AsObject,
    }
}
