import axios from "axios";

class HttpService {
    baseUrl: string | undefined;
    fetchingService: any;
    apiVersion: string;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    constructor(baseUrl = "http://localhost:5000", _fetchingService = axios, apiVersion = "api") {
        this.baseUrl = baseUrl;
        this.fetchingService = axios;
        this.apiVersion = apiVersion;
    }

    private getFullApiUrl(url: string) {
        return `${this.baseUrl}/${this.apiVersion}/${url}`;
    }

    private withAuthRequest(config: { headers?: object, url: string }): any {
        return config.headers = {
            ...config.headers
        };
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    private extractUrlAndDataFromConfig({ data, url, ...configWithoutDataAndUrl }: any): any {
        return configWithoutDataAndUrl;
    }

    get(config: { headers?: object, url: string }, withAuth = true): any {
        withAuth && this.withAuthRequest(config);

        return this.fetchingService.get(
            this.getFullApiUrl(config.url),
            this.extractUrlAndDataFromConfig(config)
        );
    }

    post(config: { headers?: object, url: string; data: any; }, withAuth = true): any {
        withAuth && this.withAuthRequest(config);

        return this.fetchingService.post(
            this.getFullApiUrl(config.url), 
            config.data, this.extractUrlAndDataFromConfig(config)
        );
    }

    put(config: { headers?: object, url: string; data: any; }, withAuth = true): any {
        withAuth && this.withAuthRequest(config);

        return this.fetchingService.put(
            this.getFullApiUrl(config.url), 
            config.data, 
            this.extractUrlAndDataFromConfig(config)
        );
    }

    delete(config: { headers?: object, url: string; data: any; }, withAuth = true): any {
        withAuth && this.withAuthRequest(config);
        
        return this.fetchingService.delete(
            this.getFullApiUrl(config.url), {
                ...this.extractUrlAndDataFromConfig(config),
                data: config.data 
            }
        );
    }
}

export default HttpService;