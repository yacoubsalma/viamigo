import { AnalyseIaService } from './analyse-ia.service';
export declare class AnalyseIaController {
    private readonly analyseService;
    constructor(analyseService: AnalyseIaService);
    log(body: {
        userId: string;
        type: string;
        value: string;
    }): Promise<{
        success: boolean;
    }>;
    runAnalysis(userId: string): Promise<{
        success: boolean;
        preferences: string[];
    }>;
}
