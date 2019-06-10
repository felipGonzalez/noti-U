export class Config {
    private ip: string;
    private port:string; 

    private static config: Config;

    constructor() {
        this.ip = '127.0.0.1';
        this.port = "3000";
    }

    public static getInstance():Config {
      if( this.config === undefined ) {
            this.config = new Config();
        }
        return this.config;
    }

    
    public  getIp() : string {
        return this.ip;
    }

    
    public  getPort() : string {
        return this.port;
    }

    
    public  setIp(ip : string) {
        this.ip = ip;
    }

    
    public  setPort(port : string) {
        this.port = port;
    }

    
    public  getUrl() : string {
        return `http://${this.ip}:${this.port}`;
    }
    
    
    
    
    
}