export class Config {
    private ip: string;
    private port:string; 

    constructor() {
        this.ip = '192.168.1.19';
        this.port = "3000";
    }

    
    public  getIp() : string {
        return `http://${this.ip}:`;
    }

    
    public  getPort() : string {
        return this.port;
    }

    
    public set setIp(ip : string) {
        this.ip = ip;
    }

    
    public set setPort(port : string) {
        this.port = port;
    }

    
    public  getUrl() : string {
        return `http://${this.ip}:${this.port}`;
    }
    
    
    
    
    
}