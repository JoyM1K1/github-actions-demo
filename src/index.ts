import * as core from '@actions/core';
import * as github from '@actions/github';

async function run() {
  const token = core.getInput('github_token');
  const octokit = github.getOctokit(token);
  const context = github.context;
  console.log('context', context);
  try {
    const commitsRespnose = await octokit.rest.repos.compareCommits({
      ...context.repo,
      // biome-ignore lint/complexity/useLiteralKeys: <explanation>
      base: context.payload['before'],
      // biome-ignore lint/complexity/useLiteralKeys: <explanation>
      head: context.payload['after'],
    });
    console.log('commitsRespnose', commitsRespnose);
  } catch (error) {
    console.log('error', error);
  }
  try {
    const commitsRespnose = await octokit.rest.repos.compareCommits({
      ...context.repo,
      base: 'a7717097a54dc03d06a91b024457ee4fb221f008',
      head: context.ref,
    });
    console.log('commitsRespnose2', commitsRespnose);
  } catch (error) {
    console.log('error', error);
  }
  try {
    const releasesResponse = await octokit.rest.repos.listReleases({
      ...context.repo,
      per_page: 10,
    });
    console.log('releasesResponse', releasesResponse);
  } catch (error) {
    console.log('error', error);
  }
  try {
    const tagsResponse = await octokit.rest.repos.listTags({
      ...context.repo,
      per_page: 100,
    });
    console.log('tagsResponse', tagsResponse);
  } catch (error) {
    console.log('error', error);
  }
}

if (import.meta.vitest) {
  const { describe, it, expect, vi } = import.meta.vitest;
  describe('run', () => {
    it.each(
      Array.from({ length: 10 }, (_, i) => ({
        github_token: `test_token${i}`,
      })),
    )('success', (arg) => {
      // biome-ignore lint/complexity/useLiteralKeys: <explanation>
      process.env['INPUT_GITHUB_TOKEN'] = arg.github_token;
      const mockGetInput = vi
        .spyOn(core, 'getInput')
        .mockImplementation(() => arg.github_token);
      const mockGetOctokit = vi
        .spyOn(github, 'getOctokit')
        .mockImplementation(() => {
          return {
            rest: {
              meta: {
                get: vi.fn().mockResolvedValue({ data: {} }),
              },
            },
          } as unknown as ReturnType<typeof github.getOctokit>;
        });
      run();
      expect(mockGetInput).toHaveBeenCalledWith('github_token');
      expect(mockGetOctokit).toHaveBeenCalledWith(arg.github_token);
      mockGetInput.mockRestore();
      mockGetOctokit.mockRestore();
    });
  });
} else {
  run();
}
