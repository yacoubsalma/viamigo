import { FreeTime } from './entities/free-time.entity';
import { Model } from 'mongoose';
export declare class FreeTimeService {
    private freeTimeModel;
    constructor(freeTimeModel: Model<FreeTime>);
    createFreeTime(userId: string, start: string, end: string): Promise<FreeTime>;
    getFreeTimeByUser(userId: string): Promise<FreeTime[]>;
    deleteFreeTimesByUser(userId: string): Promise<void>;
}
