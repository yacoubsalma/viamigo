import { Model } from 'mongoose';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { Chat } from './entities/chat.entity';
export declare class ChatService {
    private chatModel;
    constructor(chatModel: Model<Chat>);
    create(createChatDto: CreateChatDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateChatDto: UpdateChatDto): string;
    remove(id: number): string;
    deleteChatsByUser(userId: string): Promise<void>;
}
