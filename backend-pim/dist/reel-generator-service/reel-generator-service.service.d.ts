export declare class ReelGeneratorService {
    generateVideo(eventId: string): Promise<string>;
    addMusicToReel(videoPath: string, musicPath: string, finalPath: string): Promise<string>;
}
