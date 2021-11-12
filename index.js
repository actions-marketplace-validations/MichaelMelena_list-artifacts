const core = require("@actions/core");
const { Octokit } = require("@octokit/action");

const octokit = new Octokit();

const [owner, repo] = core.getInput("repository").split("/");

console.log(`owner: ${owner}`);
console.log(`repository: ${repo}`);

// most @actions toolkit packages have async methods
async function run() {
  try {
    // See https://docs.github.com/en/rest/reference/actions#artifacts
    const { data } = await octokit.request(
      "GET /repos/{owner}/{repo}/actions/artifacts",
      {
        owner,
        repo,
      }
    );
    core.setOutput("artifacts", data.artifacts);

    console.log(`artifacts for repository: ${repo}: `);
    console.log(data.artifacts);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
