export class Common {
    static async emailGenerator(): Promise<string> {
        const randomString = Math.random().toString(36).substring(2, 15);
        return `${randomString}@example.com`;  
    }

    static async passwordGenerator(): Promise<string> {
        const randomString = Math.random().toString(36).substring(2, 15);
        return `Pass@${randomString}`;  
    }
}