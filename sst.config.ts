import { type SSTConfig } from "sst";
import { API } from "~/stacks/prod";

export default {
  config(_input) {
    return {
      name: "project-management-app",
      region: "us-east-1",
    };
  },
  stacks(app) {
    app.stack(API);
  },
} satisfies SSTConfig;
