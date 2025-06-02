


const authConfig = {
    providers: [
      {
        domain: process.env.CLERK_ISSUE_URL,
        applicationID: "convex",
      },
    ]
  };

  export default authConfig;