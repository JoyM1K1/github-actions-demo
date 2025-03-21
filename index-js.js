const core = require('@actions/core');
const github = require('@actions/github');

function run() {
    const token = core.getInput('github_token');
    const octokit = github.getOctokit(token);
    const context = github.context;
    console.log('context', context);
    octokit.rest.meta.get().then(({ data }) => {
        console.log(data);
    });
}

run();
