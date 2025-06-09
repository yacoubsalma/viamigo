export declare class AgoraService {
    private readonly appId;
    private readonly appCertificate;
    constructor();
    generateToken(channelName: string, uid: number, role: 'PUBLISHER' | 'SUBSCRIBER'): string;
}
