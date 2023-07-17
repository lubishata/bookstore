const source: any = {
};

export type Bundle = "bg-localization" | "en-localization";

type Resources = {
    // [x: string]: string | Resources | ((s: any) => string);
    [x: string]: any;
}

type regiserParams = {
    bundle: Bundle;
    resources: Resources
};

export const register = ({ bundle = "bg-localization", resources = {} }: regiserParams) => {
    source[bundle] = resources;
};

export const translate = (context: string, str: string,): Resources['resourceName'] => {
    console.log(source);
    if (context && str && source[context]) {
        const ns = str.split(".");
        if (ns.length > 1) {
            return ns.reduce((resource, prop) => {
                if (resource[prop]) {
                    return resource[prop];
                }
                return str;
            }, source[context]);
        }
        return source[context][str] || str;
    }
    return str;
};


