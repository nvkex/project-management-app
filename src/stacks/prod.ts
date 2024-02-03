import { Config, NextjsSite, type StackContext } from "sst/constructs";

export function API({ stack }: StackContext) {
    const DATABASE_URL = new Config.Secret(stack, "DATABASE_URL");
    const NODE_ENV = new Config.Secret(stack, "NODE_ENV");
    const NEXTAUTH_SECRET = new Config.Secret(stack, "NEXTAUTH_SECRET");
    const NEXTAUTH_URL = new Config.Secret(stack, "NEXTAUTH_URL");
    const GITHUB_CLIENT_ID = new Config.Secret(stack, "GITHUB_CLIENT_ID");
    const GITHUB_CLIENT_SECRET = new Config.Secret(stack, "GITHUB_CLIENT_SECRET");
    const site = new NextjsSite(stack, "pma", {
        bind: [DATABASE_URL, NODE_ENV, NEXTAUTH_SECRET, NEXTAUTH_URL, GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET]
    });

    stack.addOutputs({
        SiteUrl: site.url,
    });
}