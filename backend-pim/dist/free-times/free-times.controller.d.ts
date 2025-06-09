import { FreeTimeService } from './free-times.service';
export declare class FreeTimeController {
    private readonly freeTimeService;
    constructor(freeTimeService: FreeTimeService);
    addFreeTime(body: {
        userId: string;
        freeSlots: {
            start: string;
            end: string;
        }[];
    }): Promise<{
        message: string;
    }>;
    getFreeTime(userId: string): Promise<import("./entities/free-time.entity").FreeTime[]>;
}
